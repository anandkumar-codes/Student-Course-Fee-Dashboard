// models/CoursePayment.js
const mongoose = require("mongoose");

const CoursePaymentSchema = new mongoose.Schema({
  transactionId: { type: String, unique: true, required: true },
  studentid: String,
  name: String,
  course: String,
  amount: Number,
});

module.exports = mongoose.model("CoursePayment", CoursePaymentSchema);
