const Task = require("../models/task.model");
const { VALID_STATUSES } = require("../utils/constants");
exports.createTask = async (req, res, next) => {
  try {
    const { title, description = "", status = "To Do" } = req.body;
    const userId = req.user.id;

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Use: ${VALID_STATUSES.join(", ")}` });
    }

    const taskId = await Task.create({ title, description, status, userId });
    res.status(201).json({ message: "Task created", taskId });
  } catch (e) {
    next(e);
  }
};


exports.getMyTasks = async (req, res, next) => {
  try {
    const { status, search, sortBy, order } = req.query;
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Use: ${VALID_STATUSES.join(", ")}` });
    }
    const tasks = await Task.findMine({ userId: req.user.id, status, search, sortBy, order });
    res.json({ count: tasks.length, tasks });
  } catch (e) {
    next(e);
  }
};


exports.getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    
    if (req.user.role !== "admin" && task.user_id !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(task);
  } catch (e) {
    next(e);
  }
};


exports.getAllTasksAdmin = async (req, res, next) => {
  try {
    const { status, search, sortBy, order } = req.query;
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Use: ${VALID_STATUSES.join(", ")}` });
    }
    const tasks = await Task.findAll({ status, search, sortBy, order });
    res.json({ count: tasks.length, tasks });
  } catch (e) {
    next(e);
  }
};


exports.updateTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const { title, description, status } = req.body;

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Use: ${VALID_STATUSES.join(", ")}` });
    }

    const affected = await Task.updateOwned({ taskId, userId: req.user.id, title, description, status });
    if (!affected) return res.status(403).json({ message: "Not allowed or task not found" });

    res.json({ message: "Task updated" });
  } catch (e) {
    next(e);
  }
};


exports.completeTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const affected = await Task.markCompleteOwned({ taskId, userId: req.user.id });
    if (!affected) return res.status(403).json({ message: "Not allowed or task not found" });
    res.json({ message: "Task marked as completed" });
  } catch (e) {
    next(e);
  }
};


exports.deleteTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const affected = await Task.deleteOwned({ taskId, userId: req.user.id });
    if (!affected) return res.status(403).json({ message: "Not allowed or task not found" });
    res.json({ message: "Task deleted" });
  } catch (e) {
    next(e);
  }
};
