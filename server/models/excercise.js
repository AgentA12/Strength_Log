const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  name: String,
});

const Exercise = mongoose.model("exercise", exerciseSchema);

module.exports = Exercise;
