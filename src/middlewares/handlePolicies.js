
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