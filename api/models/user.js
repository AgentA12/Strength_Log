import mongoose from "mongoose";
import bcrypt from "bcrypt";

const setSchema = mongoose.Schema({
  weight: Number,
  reps: { type: Number, min: [1, "You must enter at lease one rep"] },
});

const completedExerciseSchema = mongoose.Schema(
  {
    exercise: { type: mongoose.Schema.ObjectId, ref: "Exercise" },
    sets: [setSchema],
    belongsTo: { type: mongoose.Schema.ObjectId, ref: "Template" },
    savedOn: Date,
  },
  { timestamps: true }
);

const completedWorkoutSchema = mongoose.Schema(
  {
    template: { type: mongoose.Schema.Types.ObjectId, ref: "Template" },
    exercises: [completedExerciseSchema],
    timeToComplete: { type: Date, default: null },
  },
  { timestamps: true }
);

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function () {
        return this.password.length >= 5;
      },
    },
    templates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Template" }],
    completedWorkouts: [completedWorkoutSchema],
    completedExercises: [completedExerciseSchema],
    totalRepsCompleted: { type: Number, default: 0 },
    totalSetsCompleted: { type: Number, default: 0 },
    totalWeight: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.getNumberOfWorkouts = async function () {
  return this.completedWorkouts.length;
};

const User = mongoose.model("User", userSchema);

export { User, setSchema };
