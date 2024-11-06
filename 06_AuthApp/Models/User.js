const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    trim:true,
  },
  role: {
    type: String,
    enum: ["Admin", "Student", "Visitor"],
  },
});

module.exports = mongoose.model("User", userSchema);
