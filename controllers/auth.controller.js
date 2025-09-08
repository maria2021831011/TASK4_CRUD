const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const User = require("../models/user.model");

const issueToken = (user) =>
  jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "1h",
  });

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const existsEmail = await User.findByEmail(email);
    if (existsEmail) return res.status(400).json({ message: "Email already in use" });

    const existsUser = await User.findByUsername(username);
    if (existsUser) return res.status(400).json({ message: "Username already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const userId = await User.create({ username, email, password: hashed, role: role || "user" });

    res.status(201).json({ message: "User registered", userId });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = issueToken(user);
    res.json({ token });
  } catch (e) {
    next(e);
  }
};

/**
 * PASSWORD RESET (optional feature)
 * - requestPasswordReset: creates token (normally email-sent; here returns for demo)
 * - resetPassword: verify token + update password
 */
const randomToken = () => require("crypto").randomBytes(32).toString("hex");

exports.requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(200).json({ message: "If user exists, a reset token is issued" });

    const token = randomToken();
    const expiresMin = parseInt(process.env.RESET_TOKEN_EXPIRES_MIN || "30", 10);
    const [r] = await db.execute(
      "INSERT INTO password_resets (user_id, token, expires_at) VALUES (?,?, DATE_ADD(NOW(), INTERVAL ? MINUTE))",
      [user.user_id, token, expiresMin]
    );

    // বাস্তবে এই token ইমেইলে পাঠাবে। ডেমোতে response এ দিচ্ছি।
    res.json({ message: "Reset token generated", token });
  } catch (e) {
    next(e);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    const [rows] = await db.execute(
      "SELECT * FROM password_resets WHERE token=? AND used=0 AND expires_at > NOW()",
      [token]
    );
    const row = rows[0];
    if (!row) return res.status(400).json({ message: "Invalid or expired token" });

    const hashed = await bcrypt.hash(newPassword, 10);

    await db.execute("UPDATE users SET password=? WHERE user_id=?", [hashed, row.user_id]);
    await db.execute("UPDATE password_resets SET used=1 WHERE id=?", [row.id]);

    res.json({ message: "Password updated successfully" });
  } catch (e) {
    next(e);
  }
};
