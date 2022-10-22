const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const progressSchema = mongoose.Schema({
  template: [{ type: mongoose.Schema.Types.ObjectId, ref: "Template" }],
  timeToComplete: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

progressSchema.virtual("totalWeight").get(function() {
return "1000"
})

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
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

const User = mongoose.model("User", userSchema);

module.exports = User;
