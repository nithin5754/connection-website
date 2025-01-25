






const ErrorHandlingMiddleWare = (error, _req, res, next) => {
  if (error) {
    console.error(
      "Error Template:",
      `${error.comingFrom || "Unknown Source"}`,
      error
    );

    const statusCode = error.statusCode || 500;
    const errorMessage = error.serializeErrors?.() || {
      message: "An unexpected error occurred",
    };

    return res.status(statusCode).json(errorMessage);
  }

  next();
};

export default ErrorHandlingMiddleWare;
