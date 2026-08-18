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

// new

// create

// show

// edit

// update

// delete

// Export

module.exports = { index };
