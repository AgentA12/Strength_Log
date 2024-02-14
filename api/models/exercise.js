import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
  exerciseName: { type: String, unique: true, required: true, minLength: 1 },
  equipment: {
    type: String,
    enum: {
      values: [
        "barbell",
        "dumbbell",
        "cable",
        "machine",
        "bodyweight",
        "weight belt",
      ],
      message: "Type is not supported",
    },
  },
  isUserCreated: { type: Boolean, default: false },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export { Exercise };
