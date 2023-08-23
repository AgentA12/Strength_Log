const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  exerciseName: { type: String, unique: true, required: true, minLength: 1 },
  equipment: {
    type: String,
    enum: {
      values: ["barbell", "dumbbell", "cable", "machine", "bodyweight"],
      message: "Type is not supported",
    },
  },
  isUserCreated: Boolean,
});

const setSchema = mongoose.Schema({
  weight: Number,
  reps: { type: Number, min: [1, "You must enter at lease one rep"] },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = { Exercise, exerciseSchema, setSchema };
