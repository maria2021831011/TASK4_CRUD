
exports.notFound = (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
};

exports.errorHandler = (err, req, res, next) => {
  console.error(" ERROR:", err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
};
