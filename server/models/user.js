const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { exerciseSchema } = require("./exercise");

const progressSchema = mongoose.Schema(
  {
    templateName: String,
    templateId: { type: String },
    exercises: [exerciseSchema],
    timeToComplete: { type: String },
    dateCompleted: {
      type: String,
      default: () => new Date(),
    },
  },
  { timestamps: true }
);

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: () => Date.now() },
    templates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Template" }],
    progress: [progressSchema],
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

userSchema.methods.getProgress = function (templateId, sortType) {
  let result;
  if (!templateId) {
    r = this.progress;
    result = [...r];
  } else {
    let r = this.progress.filter(
      (progressObj) => progressObj.templateId.toString() === templateId
    );

  const result = [...r];

  result.forEach((resultObj, i) => {
    let total = resultObj.exercises.reduce(
      (accumulator, { weight, reps, sets }) => {
        return (accumulator += weight * reps * sets);
      },
      0
    );

    result[i].totalWeight = total;
  });

  if (sortType === "asc") {
    result.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
  } else {
    result.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  }

  return result;
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
    return { label: exercise.exerciseName, data: [] };
  });

  result.map((r) => {
    r.exercises.map((e) => {
      aryOfExercises.map((exercise) => {
        exercise.label === e.exerciseName ? exercise.data.push(e.weight) : null;
      });
    });
  });

  return { dataSets: aryOfExercises, labels: labels };
};

const User = mongoose.model("User", userSchema);

module.exports = User;
