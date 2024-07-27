const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied. No token Provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.json({ message: "Invalid token." });
  }
}

module.exports = auth