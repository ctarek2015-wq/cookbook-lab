const mongoose = require("mongoose");

const ingrSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Ingredients = mongoose.model("Ingredients", ingrSchema);

module.exports = Ingredients;
