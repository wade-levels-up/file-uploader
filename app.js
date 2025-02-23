require("dotenv").config();
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const bycrpyt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
// const checkAuth = require("./src/utils/ensureAuthenticated");

// Require Routes
const indexRouter = require("./src/routes/indexRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

// Routes

////  Public Routes
app.use("/", indexRouter);

////  Protected Routes

// Error handling

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.statusCode || 500)
    .render("pages/error", { title: "Error", error: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server live at http://localhost:${PORT}`));
