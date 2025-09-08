const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");
const { validate } = require("../middleware/validate.middleware");
const { auth } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");
const { VALID_STATUSES, TASK_SORT_FIELDS } = require("../utils/constants");
const {
  createTask,
  getMyTasks,
  getTaskById,
  getAllTasksAdmin,
  updateTask,
  deleteTask,
  completeTask,
} = require("../controllers/task.controller");


router.post(
  "/",
  auth,
  [
    body("title").trim().isLength({ min: 1 }).withMessage("Title is required"),
    body("description").optional().isString(),
    body("status").optional().isIn(VALID_STATUSES).withMessage("Invalid status"),
  ],
  validate,
  createTask
);

router.get(
  "/",
  auth,
  [
    query("status").optional().isIn(VALID_STATUSES),
    query("search").optional().isString(),
    query("sortBy").optional().isIn(TASK_SORT_FIELDS),
    query("order").optional().isIn(["asc", "desc"]),
  ],
  validate,
  getMyTasks
);


router.get(
  "/all",
  auth,
  isAdmin,
  [
    query("status").optional().isIn(VALID_STATUSES),
    query("search").optional().isString(),
    query("sortBy").optional().isIn(TASK_SORT_FIELDS),
    query("order").optional().isIn(["asc", "desc"]),
  ],
  validate,
  getAllTasksAdmin
);


router.get(
  "/:id",
  auth,
  [param("id").isInt().withMessage("Task id must be numeric")],
  validate,
  getTaskById
);


router.put(
  "/:id",
  auth,
  [
    param("id").isInt().withMessage("Task id must be numeric"),
    body("title").trim().isLength({ min: 1 }).withMessage("Title is required"),
    body("description").optional().isString(),
    body("status").optional().isIn(VALID_STATUSES),
  ],
  validate,
  updateTask
);


router.patch(
  "/:id/complete",
  auth,
  [param("id").isInt().withMessage("Task id must be numeric")],
  validate,
  completeTask
);


router.delete(
  "/:id",
  auth,
  [param("id").isInt().withMessage("Task id must be numeric")],
  validate,
  deleteTask
);

module.exports = router;
