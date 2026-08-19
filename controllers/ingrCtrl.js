const User = require("../models/users");
const Ingredients = require("../models/ingredients");
const Recipe = require("../models/recipes");

const index = async (req, res) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  const ingredients = await Ingredients.find();
  res.render("ingredients/index.ejs", { ingredients, user });
};

const newIngredient = async (req, res) => {
  res.render("ingredients/new.ejs");
};

const create = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const newIngredient = await Ingredients.create(req.body);
    await newIngredient.save();
    res.redirect(`/users/${userId}/ingredients`);
  } catch (err) {
    res.redirect(`/users/${userId}/ingredients/new`);
  }
};

const show = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const ingredient = await Ingredients.findById(req.params.ingrId);
  res.render("ingredients/show.ejs", { ingredient, user });
};

const edit = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const ingredient = await Ingredients.findById(req.params.ingrId);
  res.render("ingredients/edit.ejs", { ingredient, user });
};

const update = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const ingredient = await Ingredients.findById(req.params.ingrId);
    ingredient.set(req.body);
    await ingredient.save();
    res.redirect(`/users/${userId}/ingredients/${req.params.ingrId}`);
  } catch (err) {
    res.redirect(`/users/${userId}/ingredients/${req.params.ingrId}/edit`);
  }
};

const deleteIngredient = async (req, res) => {
  try {
    const userId = req.session.user._id;
    await Ingredients.findByIdAndDelete(req.params.ingrId);
    res.redirect(`/users/${userId}/ingredients`);
  } catch (err) {
    res.redirect(`/users/${userId}/ingredients/${req.params.ingrId}`);
  }
};

module.exports = {
  index,
  create,
  newIngredient,
  show,
  edit,
  update,
  deleteIngredient,
};
