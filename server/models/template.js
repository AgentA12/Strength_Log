const mongoose = require("mongoose");
const exerciseSchema = require("./exercise");

const templateSchema = mongoose.Schema({
  templatename: String,
  exercises: [exerciseSchema],
});

module.exports = templateSchema;
