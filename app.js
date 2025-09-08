const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const adminRoutes = require("./routes/admin.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.json({ name: "Task Manager API", status: "OK", version: "2.0.0" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
