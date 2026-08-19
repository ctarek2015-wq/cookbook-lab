const User = require("../models/users");

// index

const index = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const pantry = user.pantry;

    res.render("pantry/index.ejs", { pantry, user });
  } catch (err) {
    console.log(err.message);
  }
};

// newFood

const newFood = async (req, res) => {
  try {
    res.render("pantry/new.ejs");
  } catch (err) {
    console.log(err.message);
  }
};

// create

const create = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    user.pantry.push(req.body);
    await user.save();
    res.redirect(`/users/${userId}/pantry`);
  } catch (err) {
    console.log(err.message);
  }
};

// show

const show = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const pantry = user.pantry.id(req.params.foodId);
    res.render("pantry/show.ejs", { pantry, user });
  } catch (err) {
    console.log(err.message);
  }
};

// edit

const edit = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const pantry = user.pantry.id(req.params.foodId);
    res.render("pantry/edit.ejs", { pantry, user });
  } catch (err) {
    console.log(err.message);
  }
};

// update

const update = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    const pantry = user.pantry.id(req.params.foodId);
    pantry.set(req.body);
    await user.save();
    res.redirect(`/users/${userId}/pantry/${req.params.foodId}`);
  } catch (err) {
    console.log(err.message);
  }
};

// delete

const deletePantry = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    user.pantry.pull(req.params.foodId);
    await user.save();
    res.redirect(`/users/${userId}/pantry`);
  } catch (err) {
    console.log(err.message);
  }
};

// Export

module.exports = { index, newFood, create, show, edit, update, deletePantry };
