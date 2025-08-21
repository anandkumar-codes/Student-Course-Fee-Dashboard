const Student = require("../models/Student");

// Create Student
const registerStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// GET student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ studentid: req.params.studentid });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Error fetching student" });
  }
};

// UPDATE student
const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findOneAndUpdate(
      { studentid: req.params.studentid },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Student not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

// DELETE student
const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findOneAndDelete({ studentid: req.params.studentid });
    if (!deleted) return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

module.exports = {
  registerStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};

