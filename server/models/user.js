const mongoose = require("mongoose");
const templateSchema = require("./template");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      return this.password.length >= 4;
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  templates: [templateSchema],
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

const User = mongoose.model("User", userSchema);

module.exports = User;
