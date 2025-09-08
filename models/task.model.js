const db = require("../db");
const { TASK_SORT_FIELDS } = require("../utils/constants");

class Task {
  static async create({ title, description, status, userId }) {
    const [r] = await db.execute(
      "INSERT INTO tasks (title, description, status, user_id) VALUES (?,?,?,?)",
      [title, description || null, status, userId]
    );
    return r.insertId;
  }

  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM tasks WHERE task_id=?", [id]);
    return rows[0];
  }

  static async findMine({ userId, status, search, sortBy, order }) {
    let sql = "SELECT * FROM tasks WHERE user_id=?";
    const params = [userId];

    if (status) {
      sql += " AND status=?";
      params.push(status);
    }
    if (search) {
      sql += " AND (LOWER(title) LIKE ? OR LOWER(description) LIKE ?)";
      const like = `%${search.toLowerCase()}%`;
      params.push(like, like);
    }
    if (sortBy && TASK_SORT_FIELDS.includes(sortBy)) {
      const dir = (order || "asc").toLowerCase() === "desc" ? "DESC" : "ASC";
      sql += ` ORDER BY ${sortBy} ${dir}`;
    } else {
      sql += " ORDER BY created_at DESC";
    }
    const [rows] = await db.execute(sql, params);
    return rows;
  }

  static async findAll({ status, search, sortBy, order }) {
    let sql = "SELECT * FROM tasks WHERE 1=1";
    const params = [];

    if (status) {
      sql += " AND status=?";
      params.push(status);
    }
    if (search) {
      sql += " AND (LOWER(title) LIKE ? OR LOWER(description) LIKE ?)";
      const like = `%${search.toLowerCase()}%`;
      params.push(like, like);
    }
    if (sortBy && TASK_SORT_FIELDS.includes(sortBy)) {
      const dir = (order || "asc").toLowerCase() === "desc" ? "DESC" : "ASC";
      sql += ` ORDER BY ${sortBy} ${dir}`;
    } else {
      sql += " ORDER BY created_at DESC";
    }
    const [rows] = await db.execute(sql, params);
    return rows;
  }

  static async updateOwned({ taskId, userId, title, description, status }) {
    const [r] = await db.execute(
      "UPDATE tasks SET title=?, description=?, status=?, updated_at=NOW() WHERE task_id=? AND user_id=?",
      [title, description || null, status, taskId, userId]
    );
    return r.affectedRows;
  }

  static async markCompleteOwned({ taskId, userId }) {
    const [r] = await db.execute(
      "UPDATE tasks SET status='Completed', updated_at=NOW() WHERE task_id=? AND user_id=?",
      [taskId, userId]
    );
    return r.affectedRows;
  }

  static async deleteOwned({ taskId, userId }) {
    const [r] = await db.execute("DELETE FROM tasks WHERE task_id=? AND user_id=?", [
      taskId,
      userId,
    ]);
    return r.affectedRows;
  }
}

module.exports = Task;
