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
      default: () => {
        return new Date().toLocaleDateString("en-us", {
          weekday: "long",
          month: "short",
          day: "numeric",
        });
      },
    },
  },
  { timestamps: true }
);

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: () => Date.now() },
  templates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Template" }],
  progress: [progressSchema],
});

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

userSchema.methods.getProgress = function (templateName) {
  let r = this.progress.filter((progressObj) => {
    return progressObj.templateName.toString() === templateName;
  });

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

  result.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

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
  let r = this.progress.filter((progressObj) => {
    return progressObj.templateId.toString() === templateID;
  });

  const result = [...r];

  result.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

  let labels = result.map((r) => r.dateCompleted);

  let exercises = result[0].exercises.map((exercise) => exercise.exerciseName);

  const data = result.map((r) => {
    let obj = {};

    obj.label = r.dateCompleted;

    obj.dataSet = {};

    obj.dataSet = r.exercises.map((exercise) => {
      let dataSetObject = {};
      dataSetObject.label = exercise.exerciseName;
      dataSetObject.data = exercise.weight;
      dataSetObject.borderColor = "#BB86FC";
      dataSetObject.backgroundColor = "#121212";
      return { ...dataSetObject };
    });

    return obj;
  });

  return data;
};

userSchema.methods.getTemplateModalProgress = function (templateId) {};

const User = mongoose.model("User", userSchema);

module.exports = User;
