const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentid: String,
  name: String,
  dob: String,
  mobile: String,
  email: String,
  idType: String,
  idNumber: String,
  course: String,
  languages: [String],
  address: String,
});

module.exports = mongoose.model("Student", studentSchema);
