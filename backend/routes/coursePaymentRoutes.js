const express = require("express");
const router = express.Router();
const { addPayment } = require("../controllers/coursePaymentController");

router.post("/", addPayment);

module.exports = router;
