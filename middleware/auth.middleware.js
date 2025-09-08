const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const header = req.header("Authorization");
  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ message: "No token provided" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
