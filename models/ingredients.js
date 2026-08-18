const mongoose = require("mongoose");

const ingerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Inger = mongoose.model("Inger", ingerSchema);

module.exports = Inger;
