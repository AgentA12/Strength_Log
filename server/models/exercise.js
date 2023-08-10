const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  name: { type: String, unique: true },
  equipment: String,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = { Exercise, exerciseSchema };
