require("dotenv").config();
require("./config/database");

const path = require("path");
const express = require("express");
const app = express();

// MIDDLEWARES

const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const morgan = require("morgan");
const port = process.env.PORT || 3000;
const isSignedIn = require("./middleware/isSignedIn");
const addUserToViews = require("./middleware/addUserToViews");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  }),
);
app.use(addUserToViews);
app.use(morgan("dev"));

// CONTROLLERS

const authCtrl = require("./controllers/auth");

// Public Routes

// Private Routes

app.use(isSignedIn);

// PORT

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
