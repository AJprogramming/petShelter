const mongoose = require("mongoose");
const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name..."],
      minLength: [3, "Name cannot have less than 3 characters"],
    },
    type: {
      type: String,
      required: [true, "Please enter dog type"],
      minLength: [3, "Pet type cannont be less than 3 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description about the dog"],
      minLength: [3, "Description cannot be less than 3 characters"],
    },
    skills1: { type: String },
    skills2: { type: String },
    skills3: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", PetSchema);
