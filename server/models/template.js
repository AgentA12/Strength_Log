const mongoose = require("mongoose");
const { exerciseSchema } = require("./exercise");

const templateSchema = mongoose.Schema(
  {
    templateName: { type: String, required: true, null: false, trim: true },
    templateNotes: { type: String, trim: true },
    exercises: [exerciseSchema],
  },
  { timeStamps: true }
);

const Template = mongoose.model("Template", templateSchema);

module.exports = { Template, templateSchema };
