const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");
const db = require("../db"); 

router.get("/users", auth, isAdmin, async (req, res, next) => {
  try {
    const [users] = await db.execute("SELECT user_id, username, email, role, created_at FROM users");
    res.json({ count: users.length, users });
  } catch (e) {
    next(e);
  }
});


router.get("/tasks", auth, isAdmin, async (req, res, next) => {
  try {
    const [tasks] = await db.execute("SELECT * FROM tasks");
    res.json({ count: tasks.length, tasks });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
