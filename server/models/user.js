const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { setSchema } = require("./exercise");

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

userSchema.methods.getSortedProgress = function (templateID, sorted) {
  const progress = this.progress.filter((progressObj) => {
    return progressObj.templateId.toString() === templateID.toString();
  });

  let sortedProgress;

  if (sorted === "asc") {
    sortedProgress = progress.sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : 1
    );
  }

  if (sorted === "desc") {
    sortedProgress = progress.sort((a, b) =>
      a.createdAt < b.createdAt ? -1 : 1
    );
  }

  return sortedProgress;
};

userSchema.methods.ExerciseProgress = function (templateID) {
  let progressArr = this.progress.filter((progressObj) => {
    return progressObj.templateId.toString() === templateID;
  });

  const result = [...progressArr];

  result.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));

  const labels = result.map((progressObject) => {
    return progressObject.dateCompleted;
  });

  const aryOfExercises = result[0].exercises.map((exercise) => {
    return { label: exercise.name, data: [] };
  });

  result.map((r) => {
    r.exercises.map((e) => {
      aryOfExercises.map((exercise) => {
        exercise.label === e.name ? exercise.data.push(e.weight) : null;
      });
    });
  });

  return { dataSets: aryOfExercises, labels: labels };
};

const User = mongoose.model("User", userSchema);

module.exports = User;
