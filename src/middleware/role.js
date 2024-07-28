function role(req, res, next) {
  if (!req.user.isAdmin)
    return res.status(403).json({ message: "Access Denied" });
  next();
}

module.exports = role;
