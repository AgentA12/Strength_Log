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

userSchema.methods.getProgress = function (templateID) {
  let r = this.progress.filter((progressObj) => {
    return progressObj.templateId.toString() === templateID;
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

const User = mongoose.model("User", userSchema);

module.exports = User;
