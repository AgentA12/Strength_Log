const mongoose = require("mongoose");

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
        exerciseName: String,
        weight: { type: Number },
        sets: { type: Number, min: [1, "You must enter at lease one set"] },
        reps: {
          type: Number,
          min: [1, "You must enter at lease one repetition"],
        },
        isBodyWeight: Boolean,
      },
    ],
  },
  { timeStamps: true }
);

const Template = mongoose.model("Template", templateSchema);

module.exports = { templateSchema, Template };
