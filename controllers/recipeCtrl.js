const User = require("../models/users");
const Recipe = require("../models/recipes");
const Ingredients = require("../models/ingredients");

const index = async (req, res) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  const recipes = await Recipe.find({ owner: userId });
  res.render("recipes/index.ejs", { recipes, user });
};

const newRecipe = async (req, res) => {
  const ingredients = await Ingredients.find();
  res.render("recipes/new.ejs", { ingredients });
};

const create = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const newRecipe = await Recipe.create(req.body);
    newRecipe.owner = userId;
    newRecipe.ingredients = req.body.ingredients;
    await newRecipe.save();
    res.redirect(`/users/${userId}/recipes`);
  } catch (err) {
    res.redirect(`/users/${userId}/recipes/new`);
  }
};

const show = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const recipe = await Recipe.findById(req.params.recipeId).populate(
    "ingredients",
  );
  res.render("recipes/show.ejs", { recipe, user });
};

const edit = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const ingredients = await Ingredients.find();
  const recipe = await Recipe.findById(req.params.recipeId).populate();
  res.render("recipes/edit.ejs", { recipe, user, ingredients });
};

const update = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const recipe = await Recipe.findById(req.params.recipeId);
    recipe.set(req.body);
    await recipe.save();
    res.redirect(`/users/${userId}/recipes/${req.params.recipeId}`);
  } catch (err) {
    res.redirect(`/users/${userId}/recipes/${req.params.recipeId}/edit`);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const userId = req.session.user._id;
    await Recipe.findByIdAndDelete(req.params.recipeId);
    res.redirect(`/users/${userId}/recipes`);
  } catch (err) {
    res.redirect(`/users/${userId}/recipes/${req.params.recipeId}`);
  }
};

module.exports = { index, create, newRecipe, show, edit, update, deleteRecipe };
