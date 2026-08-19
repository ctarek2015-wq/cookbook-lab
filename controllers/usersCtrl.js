const User = require("../models/users");
const Recipe = require("../models/recipes");

// Index

const index = async (req, res) => {
  const users = await User.find();
  res.render("users/index.ejs", { users });
};

// Show

const show = async (req, res) => {
  const user = await User.findById(req.params.id);
  const recipes = await Recipe.find({ owner: req.params.id });
  res.render("users/show.ejs", { user, recipes });
};

// Export

module.exports = { index, show };
