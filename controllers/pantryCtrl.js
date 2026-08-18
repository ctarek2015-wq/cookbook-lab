const User = require("../models/users");

// index

const index = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
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
    const user = await User.findById(req.params.id);
    user.pantry.push(req.body);
    await user.save();
    res.redirect(`/users/${req.params.id}/pantry`);
  } catch (err) {
    console.log(err.message);
  }
};

// show

// edit

// update

// delete

// Export

module.exports = { index, newFood, create };
