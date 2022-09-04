const mongoose = require("mongoose");

const templateSchema = mongoose.Schema({
  templateName: String,
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
