const mongoose = require("mongoose");

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
  templates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Template" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
