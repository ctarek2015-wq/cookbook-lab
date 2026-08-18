const mongoose = require("mongoose");

// SUBSCHEMA

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// SCHEMA

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema],
});

// MODELS

const User = mongoose.model("User", userSchema);

// EXPORT

module.exports = User;
