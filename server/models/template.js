const mongoose = require("mongoose");

const templateSchema = mongoose.Schema(
  {
    templateName: { type: String, required: true, null: false, trim: true },
    templateNotes: { type: String, trim: true },
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
  },
  {
    timeStamps: true,
  }
);

// templateSchema.pre("deleteOne", function (next) {
//   next();
// });

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
