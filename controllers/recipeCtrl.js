const User = require("../models/users");
const Recipe = require("../models/recipes");

const index = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  const recipes = await Recipe.find({ owner: userId });
  res.render("recipes/index.ejs", { recipes, user });
};

const newRecipe = async (req, res) => {
  res.render("recipes/new.ejs");
};

const create = async (req, res) => {
  try {
    const userId = req.params.id;
    const newRecipe = await Recipe.create(req.body);
    newRecipe.owner = userId;
    await newRecipe.save();
    res.redirect(`/users/${userId}/recipes`);
  } catch (err) {
    console.log(err.message);
  }
};

const show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const recipe = await Recipe.findById(req.params.recipeId);
    res.render("recipes/show.ejs", { recipe, user });
  } catch (err) {
    console.log(err.message);
  }
};

const edit = async (req, res) => {
  const user = await User.findById(req.params.id);
  const recipe = await Recipe.findById(req.params.recipeId);
  res.render("recipes/edit.ejs", { recipe, user });
};

const update = async (req, res) => {
  try {
    const userId = req.params.id;
    const recipe = await Recipe.findById(req.params.recipeId);
    recipe.set(req.body);
    await recipe.save();
    res.redirect(`/users/${userId}/recipes/${req.params.recipeId}`);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const userId = req.params.id;
    await Recipe.findByIdAndDelete(req.params.recipeId);
    res.redirect(`/users/${userId}/recipes`);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { index, create, newRecipe, show, edit, update, deleteRecipe };
