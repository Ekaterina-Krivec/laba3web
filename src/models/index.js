const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  text: { type: String, require: true },
  isComplited: { type: Boolean, require: true, default: false },
  isRemoved: { type: Boolean, require: true, default: false },
});

module.exports = ToDoSchema;
