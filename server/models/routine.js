const mongoose = require("mongoose");

const routineSchema = mongoose.Schema({
  routineName: { type: String, required: true, unique: true },
  templates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Template" }],
});

const Routine = mongoose.model("Routine", routineSchema);

module.exports = Routine;
