
export function isAdmin(req, res, next) {

  if (!req.user) return res.status(401).send({ error: "Unauthorized" })
  if (req.user.role != "admin") return res.status(403).send({ error: "You don't have permission to use this resource" })
  next()
}

export function isUser(req, res, next) {
  if (!req.user) return res.status(401).send({ error: "Unauthorized" });
  if (req.user.role != "user")
    return res
      .status(403)
      .send({ error: "You don't have permission to use this resource" });
  next();
}