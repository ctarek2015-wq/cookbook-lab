require("dotenv").config();
require("./config/database");

const path = require("path");
const express = require("express");
const app = express();

// MIDDLEWARES

const session = require("express-session");
const { MongoStore } = require("connect-mongo");
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

const authCtrl = require("./controllers/authCtrl");
const pantryCtrl = require("./controllers/pantryCtrl");
const usersCtrl = require("./controllers/usersCtrl");

// Public Routes

app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/pantry`);
  } else {
    res.render("index.ejs");
  }
});

app.get("/community", usersCtrl.index);

app.get("/auth/sign-up", authCtrl.signUp);
app.post("/auth/sign-up", authCtrl.register);

app.get("/auth/sign-in", authCtrl.signIn);
app.post("/auth/sign-in", authCtrl.login);

// Private Routes

app.use(isSignedIn);

app.get("/auth/sign-out", authCtrl.signOut);

app.get("/users/:id/pantry", pantryCtrl.index);
app.get("/users/:id/pantry/new", pantryCtrl.newFood);
app.post("/users/:id/pantry", pantryCtrl.create);
app.get("/users/:id/pantry/:foodId", pantryCtrl.show);
app.get("/users/:id/pantry/:foodId/edit", pantryCtrl.edit);
app.put("/users/:id/pantry/:foodId", pantryCtrl.update);
app.delete("/users/:id/pantry/:foodId/delete", pantryCtrl.deletePantry);

// PORT

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
