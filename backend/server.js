const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

// utils
const AppError = require("./utils/appError");
const globalErrorController = require("./controllers/globalErrorController");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log("Database Connected");
});

app.use(express.json());

if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 5001;

// Routes for pug templates
app.get("/", (req, res) => {
  res.render("emailTemplate", {
    text: "Forgot password? Submit a new password and confirm password by clicking the button below",
    user: "Saptaparnee",
    url: "#",
  });
});

//Routes
const userRoutes = require("./routes/userRoutes");

app.use(`/api/v1/users`, userRoutes);

// for deployment, add the path to the build folder in frontend.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set  NODE_ENV to production"));
}

// handle unhandled routes
app.all("*", (req, res, next) => {
  // const err = new Error(`Can't find the route ${req.originalUrl}`);
  // err.statusCode = 404;
  // err.status = "fail";

  // next(err);

  next(new AppError(`Can't find the route ${req.originalUrl}`, 404));
});

// global error handler
app.use(globalErrorController);

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
