const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  exerciseName: { type: String, required: true },
  type: {
    type: String,
  },
  sets: {
    type: Number,
    required: true,
    min: [1, "Must enter at lease one set"],
  },
  reps: {
    type: Number,
    required: true,
    min: [1, "Must enter at lease one rep"],
  },
  weight: { type: Number },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
