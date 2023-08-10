const mongoose = require("mongoose");
const { exerciseSchema } = require("./exercise");

const templateSchema = mongoose.Schema(
  {
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
        exercise: exerciseSchema,
        weight: { type: Number },
        sets: { type: Number, min: [1, "You must enter at lease one set"] },
        reps: {
          type: Number,
          min: [1, "You must enter at lease one repetition"],
        },
      },
    ],
  },
  { timeStamps: true }
);

const Template = mongoose.model("Template", templateSchema);

module.exports = { Template, templateSchema };
