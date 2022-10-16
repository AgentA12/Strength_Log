const mongoose = require("mongoose");

const templateSchema = mongoose.Schema(
  {
    templateName: { type: String, required: true, null: false },
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
  },

  {
    timeStamps: true,
  }
);

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
