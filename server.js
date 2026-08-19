// REQUIRING
require("dotenv").config();
require("./config/database");

const path = require("path");
const express = require("express");
const app = express();
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const methodOverride = require("method-override");
const morgan = require("morgan");
const port = process.env.PORT || 3000;
const isSignedIn = require("./middlewares/isSignedIn");
const addUserToViews = require("./middlewares/addUserToViews");

// Routers
const pagesRouter = require("./routers/pagesRouter");
const authRouter = require("./routers/authRouter");
const pantryRouter = require("./routers/pantryRouter");
const usersRouter = require("./routers/usersRouter");
const ingrRouter = require("./routers/ingrRouter");
const recipeRouter = require("./routers/recipeRouter");

// MIDDLEWARES
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
app.use(morgan("dev"));
app.use(addUserToViews);

// Public Routes
app.use("", pagesRouter);
app.use("/auth", authRouter);

// Private Routes
app.use(isSignedIn);

app.use("/users/:id/pantry", pantryRouter);
app.use("/users/:id/recipes", recipeRouter);
app.use("/users/:id/ingredients", ingrRouter);
app.use("/users", usersRouter);

// PORT
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
