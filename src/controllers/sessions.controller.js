import { signedCookies } from "cookie-parser";
import { generateAToken } from "../utils/cryptography.js";
import UserDto from "../repositories/users.dto.js";
import { logger } from "../utils/logger.js";
import { restorePassService } from "../services/restorePassword.service.js";
import usersService from "../services/users.service.js";
import { CLIENT_URL } from "../config/env.config.js";
import { githubClientId, githubClientSecret } from "../config/auth.config.js";
import fetch from "node-fetch";
import User from "../entities/User.js";
import usersRepository from "../repositories/users.repository.js";

export async function userRegister(req, res, next) {
  try {
    const { first_name, last_name, role } = req.user;
    console.log(`req.user from psp ${req.user}`);
    const newUser = req.user;
    const userDTO = {
      name: first_name + " " + last_name,
      role,
    };
    res.status(201).send(userDTO);
  } catch (error) {
    if (error.message === "Already registered user") {
      res.status(400).json({ errorMsg: "Already Registered User" });
    } else {
      res.status(400).json({ errorMsg: "Unknown Error" });
    }
  }
}

export async function isAlreadyRegisteredUser(req, res, next) {
  console.log(`data from client: ${JSON.stringify(req.body)}`);
  const isRegistered = await usersService.findUserByCriteria({
    email: req.body.email,
  });

  if (isRegistered) {
    res["sendClientError"]("Already Registered User");
    return;
  }
  next();
}

export async function userLogin(req, res, next) {
  try {
    console.log(`req.user ${JSON.stringify(req.user)}`);
    if (!req.user) {
      return res
        .status(401)
        .send({ status: "error", error: "Invalid Credentials" });
    }
    res.cookie("jwt_authorization", generateAToken(req.user), {
      signed: true,
      httpOnly: true,
      // sameSite: "Strict",
      // domain: "127.0.0.1:5173",
    });
    const loggedUserDto = new UserDto(req.user);
    res.status(200).json({ loggedUserDto, CLIENT_URL });
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function userLogOut(req, res, next) {
  try {
    res.clearCookie("jwt_authorization", {
      signed: true,
      httpOnly: true,
    });
    res.redirect("/login");
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function currentSession(req, res, next) {
  try {
    if (!req.user) res.redirect("/login");
    const userFound = await usersService.getUserById(req.user._id)
    if (!userFound) {return res.status(403).json(`User Not Found`)}
    const currentUserDTO = new UserDto(userFound);
    console.log(`all is ok?`);
    res.json({ currentUserDTO, CLIENT_URL });
  } catch (error) {
    res.status(401).json({ errorMsg: error.message });
  }
}

export async function githubLogin(req, res, next) {
  const loggedUser = req.user;
  res.cookie("jwt_authorization", generateAToken(loggedUser), {
    signed: true,
    httpOnly: true,
  });
  res.json({ user: loggedUser });
  // res.redirect("http://127.0.0.1:5173/");
}

export async function githubCallback(req, res, next) {
  const loggedUser = req.user;
  console.log(loggedUser);
  res.json("User Logged Correctly");
}

export async function getGhToken(req, res, next) {
  console.log(req.query.code);

  const params = `?client_id=${githubClientId}&client_secret=${githubClientSecret}&code=${req.query.code}`;
  console.log(params);

  await fetch(`https://github.com/login/oauth/access_token${params}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to get access token");
      }
      return response.json();
    })
    .then((data) => {
      console.log(`data ${JSON.stringify(data)}`);

      if (data.access_token) {
        return res.json(data);
      } else {
        throw new Error("Access token not found in the response");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
}

export async function getGhUser(req, res, next) {
  req.get("Authorization");
  console.log(req.get("Authorization"));
  await fetch(`https://api.github.com/user`, {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  })
    .then((response) => {
      console.log(response);

      if (!response.ok) {
        throw new Error(`Failed to get user data`);
      }
      return response.json();
    })
    .then(async (data) => {
      console.log(data);
      //TO-DO: Clean the data from GH and send a user created by User class, save it in DB.
      let user = await usersService.findUserByCriteria({
        email: data.login,
      });

      if (!user) {
        let newUserFromGh = {
          first_name: data.name,
          email: data.login,
          profilePhoto: data.avatar_url,
          role: (String(data.type)).toLowerCase()
        };
        console.log(newUserFromGh);
        const newUser = await usersRepository.createNewUser(newUserFromGh);
        console.log(newUser);
        res.cookie("jwt_authorization", generateAToken(newUser), {
          signed: true,
          httpOnly: true,
        });
        res.json(newUser);
      }
      res.cookie("jwt_authorization", generateAToken(user), {
        signed: true,
        httpOnly: true,
      });
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ error: err.message });
    });
}

export async function confirmMailToRestorePassword(req, res, next) {
  try {
    logger.debug(JSON.stringify(req.body));
    const result = await restorePassService.initializeRecovery(req.body);
    logger.debug(result);
    res /* .cookie("jwt_authorization", generateATokenToRestorePass(user), {
      signed: true,
      httpOnly: true,
    }) */
      .send("Please Chek Your Email To Continue restoring your password.");
  } catch (error) {
    res["sendError"](error.message, 400);
  }
}

export async function newPassword(req, res, next) {
  try {
    logger.debug(JSON.stringify(req.body));
    const result = await restorePassService.finishRecovery(req.body);
    logger.debug(result);
    res /* .cookie("jwt_authorization", generateATokenToRestorePass(user), {
      signed: true,
      httpOnly: true,
    }) */["sendSuccess"]("Password succesfully restored");
  } catch (error) {
    res["sendError"](error.message, 400);
  }
}
