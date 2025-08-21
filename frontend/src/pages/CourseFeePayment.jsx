import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import "./CourseFeePayment.css";

function CourseFeePayment() {
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [amount, setAmount] = useState(0);
  const [transactionId, setTransactionId] = useState("");

  // Course Fee Mapping
  const courseFees = {
    React: 1000,
    Node: 1200,
    Python: 1500,
    Java: 1700,
  };

  const fetchStudent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/students/${studentId}`);
      const data = res.data;
      setStudentData(data);
      setAmount(courseFees[data.course] || 0);
    } catch (error) {
      alert("❌ Student not found");
      console.error(error);
    }
  };

  const generateTransactionId = () => {
    return "TXN" + Date.now(); // Unique using timestamp
  };

  const handleSubmit = async () => {
    const txnId = generateTransactionId();
    setTransactionId(txnId);

    const paymentDetails = {
      transactionId: txnId,
      studentid: studentData.studentid,
      name: studentData.name,
      course: studentData.course,
      amount,
    };

    try {
      await axios.post("http://localhost:5000/api/payments", paymentDetails);
      await generatePDF(paymentDetails);
      alert("✅ Payment Recorded & PDF Generated");
      window.location.reload(); // refresh page
    } catch (err) {
      console.error("Error submitting fee:", err);
    }
  };

  const generatePDF = async (paymentDetails) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("🎓 Student Fee Payment Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Transaction ID: ${paymentDetails.transactionId}`, 20, 40);
    doc.text(`Student ID: ${paymentDetails.studentid}`, 20, 50);
    doc.text(`Name: ${paymentDetails.name}`, 20, 60);
    doc.text(`Course: ${paymentDetails.course}`, 20, 70);
    doc.text(`Amount Paid: ₹${paymentDetails.amount}`, 20, 80);

    // QR Code
    const qrText = `
Transaction ID: ${paymentDetails.transactionId}
Student ID: ${paymentDetails.studentid}
Name: ${paymentDetails.name}
Course: ${paymentDetails.course}
Amount Paid: ₹${paymentDetails.amount}
    `;

    const qrData = await QRCode.toDataURL(qrText);
    doc.addImage(qrData, "PNG", 140, 40, 50, 50);

    doc.save(`${paymentDetails.transactionId}_FeeReceipt.pdf`);
  };

  return (
    <div className="fee-container">
      <h2>💳 Course Fee Payment</h2>
      <div className="form-group">
        <label>Enter Student ID:</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button onClick={fetchStudent}>Fetch Details</button>
      </div>

      {studentData && (
        <div className="details-box">
          <p><strong>Student ID:</strong> {studentData.studentid}</p>
          <p><strong>Name:</strong> {studentData.name}</p>
          <p><strong>Course:</strong> {studentData.course}</p>
          <p><strong>Amount:</strong> ₹{amount}</p>

          <button onClick={handleSubmit} className="submit-btn">
            Submit & Generate PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default CourseFeePayment;
