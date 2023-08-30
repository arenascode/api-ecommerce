import { signedCookies } from "cookie-parser";
import { generateAToken } from "../utils/cryptography.js";
import UserDto from "../repositories/users.dto.js";
import { logger } from "../utils/logger.js";
import { restorePassService } from "../services/restorePassword.service.js";

export async function userRegister(req, res, next) {
  try {
    const { first_name, last_name, role } = req.user;
    console.log(req.user);
    const newUser = req.user;
    const userDTO = {
      name: first_name + " " + last_name,
      role,
    };
    res.send(userDTO);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
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
    });
    const loggedUserDto = new UserDto(req.user)
    res.status(200).json(loggedUserDto);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function userLogOut(req, res, next) {
  try {
    res.clearCookie("jwt_authorization", {
      signed: true,
      httpOnly: true
    })
    res.redirect('/login')
  } catch (error) {
    res.status(400).json({errorMsg: error.message})
  }
}

export async function currentSession(req, res, next) {
  try {
    if (!req.user) res.redirect('/login')
    const currentUserDTO = new UserDto(req.user)
    console.log(`all is ok?`);
    res.json(currentUserDTO)
  } catch (error) {
    res.status(401).json({ errorMsg: error.message });
  }
}

export async function githubLogin(req, res, next) {
  const loggedUser = req.user
  res.cookie('jwt_authorization', generateAToken(loggedUser), {
    signed: true, 
    httpOnly: true
  })
  res.json({user: loggedUser})
}

export async function githubCallback(req, res, next) {
  const loggedUser = req.user;
  console.log(loggedUser);
  res.json("User Logged Correctly");
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
    logger.debug(JSON.stringify(req.body))
;
    const result = await restorePassService.finishRecovery(req.body);
    logger.debug(result)
    res /* .cookie("jwt_authorization", generateATokenToRestorePass(user), {
      signed: true,
      httpOnly: true,
    }) */
      ["sendSuccess"]('Password succesfully restored');
  } catch (error) {
    res["sendError"](error.message, 400);
  }
}