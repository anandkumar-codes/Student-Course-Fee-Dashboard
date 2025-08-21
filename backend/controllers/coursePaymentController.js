const CoursePayment = require("../models/CoursePayment");

exports.addPayment = async (req, res) => {
  try {
    // Insert the document into MongoDB
    const savedPayment = await new CoursePayment(req.body).save();

    res.status(201).json(savedPayment); // respond with the saved document
  } catch (error) {
    console.error("❌ Error saving course payment:", error);
    res.status(500).json({ message: "Failed to save course payment" });
  }
};
