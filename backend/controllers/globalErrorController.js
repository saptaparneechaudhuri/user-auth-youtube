const AppError = require("../utils/appError");

const devError = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    errorStack: err.stack,
  });
};

const prodError = (res, err) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

const handleValidationError = (error) => {
  let allErrors = {};

  // store the errors as a key value pair
  Object.values(error.errors).forEach((item) => {
    return (allErrors[item.path] = item.message);
  });

  const message = JSON.stringify(allErrors);

  return new AppError(message, 400);
};

const handleDuplicateFieldsError = (error) => {
  let allErrors = {};

  Object.keys(error.keyValue).forEach((item) => {
    return (allErrors[
      item
    ] = `This value already exists. Please use another value`);
  });

  return new AppError(JSON.stringify(allErrors), 400);
};

const globalErrorController = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "developement") {
    devError(res, err);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.name = err.name;
    error.code = err.code;
    error.message = err.message;

    if (error.name === "ValidationError") {
      error = handleValidationError(err);
    }

    if (error.code === 11000) {
      error = handleDuplicateFieldsError(error);
    }
    prodError(res, error);
  }
};

module.exports = globalErrorController;
