import { logger } from "../utils/logger.js";

export function isAdmin(req, res, next) {

  if (!req.user) return res['sendAuthError']()
  if (req.user.role != "admin") return res['sendPermissionError']()
  next()
}

export function isUser(req, res, next) {
  if (!req.user) return res['sendAuthError']()
  if (req.user.role != "user")
    return res['sendPermissionError']();
  next();
}

export function isAdminOrPremiumRole(req, res, next) {

  if (!req.user) return res["sendAuthError"]();
  const role = req.user.role
  if (role == "admin" || role == "premium") {
    next();
  } else {
    return res["sendPermissionError"]();
  }
}
