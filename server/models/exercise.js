import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
  exerciseName: { type: String, unique: true, required: true, minLength: 1 },
  equipment: {
    type: String,
    enum: {
      values: ["barbell", "dumbbell", "cable", "machine", "bodyweight"],
      message: "Type is not supported",
    },
  },
  belongsToTemplate: [
    { type: mongoose.Schema.Types.ObjectId, model: "Template" },
  ],
  isUserCreated: { type: Boolean, default: false },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export { Exercise };
