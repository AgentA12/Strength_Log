const mongoose = require("mongoose");
const exerciseSchema = require("./exercise");

const templateSchema = mongoose.Schema({
  templateName: String,
  exercises: [exerciseSchema],
});

module.exports = templateSchema;
