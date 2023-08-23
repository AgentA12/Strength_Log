const mongoose = require("mongoose");
const { setSchema } = require("./exercise");

const templateSchema = mongoose.Schema(
  {
    belongsTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    templateName: {
      type: String,
      required: function () {
        return this.templateName.length >= 1;
      },
      trim: true,
    },
    templateNotes: { type: String, trim: true },
    exercises: [
      {
        exercise: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
        sets: [setSchema],
      },
    ],
  },
  { timeStamps: true }
);

const Template = mongoose.model("Template", templateSchema);

module.exports = { templateSchema, Template };
