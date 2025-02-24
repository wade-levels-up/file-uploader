require("dotenv").config();
const path = require("node:path");
const express = require("express");

const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

const passport = require("./src/services/authService"); // Import the authService
const checkAuth = require("./src/middleware/ensureAuthenticated");

// Require Routes
const indexRouter = require("./src/routes/indexRouter");
const loginRouter = require("./src/routes/loginRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

// Setup session

app.use(
  session({
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

app.use(passport.session());

// Routes

////  Public Routes
app.use("/", indexRouter);
app.use("/login", loginRouter);

////  Middleware to ensure authentication for routes below
app.use(checkAuth.isAuth);

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
