const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], unique: true },
  pounds: { type: Number, min: [5, "Must be at lease five pounds"] },
  reps: { type: Number, min: [1, "Must be at lease one rep"] },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
