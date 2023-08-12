import { signedCookies } from "cookie-parser";
import { generateAToken } from "../utils/cryptography.js";

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
        .status(400)
        .send({ status: "error", error: "Invalid Credentials" });
    }
    res.cookie("jwt_authorization", generateAToken(req.user), {
      signed: true,
      httpOnly: true,
    });
    const {first_name, last_name, role } = req.user
    const userDTO = {
      name: first_name + " " + last_name,
      role,
    };
    res.status(201).json(userDTO);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}
