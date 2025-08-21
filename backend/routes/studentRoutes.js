const express = require("express");
const router = express.Router();
const {registerStudent,getStudentById,updateStudent,deleteStudent,} = require("../controllers/studentController");

router.post("/", registerStudent);
router.get("/:studentid", getStudentById);
router.put("/:studentid", updateStudent);
router.delete("/:studentid", deleteStudent);

module.exports = router;
