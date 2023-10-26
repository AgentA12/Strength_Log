const mongoose = require("mongoose");

const completedExerciseSchema = mongoose.Schema(
  {
    exercise: { type: mongoose.Schema.ObjectId, ref: "Exercise" },
    sets: [setSchema],
    belongsTo: { type: mongoose.Schema.ObjectId, ref: "Template" },
    savedOn: Date,
  },
  { timestamps: true }
);

const WorkoutSchema = mongoose.Schema(
  {
    template: { type: mongoose.Schema.Types.ObjectId, ref: "Template" },
    exercises: [completedExerciseSchema],
    timeToComplete: { type: Date, default: null },
  },
  { timestamps: true }
);
