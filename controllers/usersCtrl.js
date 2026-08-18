const User = require("../models/users");

// Index

const index = async (req, res) => {
  const users = await User.find();
  res.render("community/index.ejs", { users });
};

// Export

module.exports = { index };
