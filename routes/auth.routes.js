const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { validate } = require("../middleware/validate.middleware");
const {
  register,
  login,
  requestPasswordReset,
  resetPassword,
} = require("../controllers/auth.controller");


router.post(
  "/register",
  [
    body("username").trim().isLength({ min: 3 }).withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
    body("role").optional().isIn(["admin", "user"]).withMessage("Invalid role"),
  ],
  validate,
  register
);


router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  validate,
  login
);

router.post("/request-password-reset", [body("email").isEmail()], validate, requestPasswordReset);

router.post(
  "/reset-password",
  [body("token").notEmpty(), body("newPassword").isLength({ min: 6 })],
  validate,
  resetPassword
);

module.exports = router;
