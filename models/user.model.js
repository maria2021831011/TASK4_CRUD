const db = require("../db");

class User {
  static async create({ username, email, password, role = "user" }) {
    const [r] = await db.execute(
      "INSERT INTO users (username, email, password, role) VALUES (?,?,?,?)",
      [username, email, password, role]
    );
    return r.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }

  static async findByUsername(username) {
    const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM users WHERE user_id = ?", [id]);
    return rows[0];
  }

  static async updatePassword(userId, hashed) {
    const [r] = await db.execute("UPDATE users SET password=? WHERE user_id=?", [hashed, userId]);
    return r.affectedRows;
  }
}

module.exports = User;
