import React, { useState } from "react";
import axios from "axios";
import { PDFDocument, rgb } from "pdf-lib";
import "./StudentRegister.css"

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    studentid: "",
    name: "",
    dob: "",
    mobile: "",
    email: "",
    idType: "PAN",
    idNumber: "",
    course: "React",
    languages: [],
    address: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        languages: checked
          ? [...prev.languages, value]
          : prev.languages.filter((lang) => lang !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/students", formData);
      alert("✅ Registered successfully");
      generatePDF(formData);
      window.location.reload();
    } catch (err) {
      alert("❌ Registration failed");
    }
  };

  const generatePDF = async (data) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 700]);
    const { height } = page.getSize();

    page.drawText("Student Registration", {
      x: 50,
      y: height - 50,
      size: 20,
      color: rgb(0, 0.53, 0.71),
    });

    const info = [
      `Student ID: ${data.studentid}`,
      `Name: ${data.name}`,
      `DOB: ${data.dob}`,
      `Mobile: ${data.mobile}`,
      `Email: ${data.email}`,
      `ID Type: ${data.idType}`,
      `ID Number: ${data.idNumber}`,
      `Course: ${data.course}`,
      `Languages: ${data.languages.join(", ")}`,
      `Address: ${data.address}`,
    ];

    info.forEach((line, i) => {
      page.drawText(line, { x: 50, y: height - 80 - i * 25, size: 14 });
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${data.studentid}_registration.pdf`;
    link.click();
  };

  return (
    <div className="container">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input name="studentid" placeholder="Student ID" onChange={handleChange} required />
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="dob" type="date" onChange={handleChange} required />
          <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <select name="idType" onChange={handleChange}>
            <option>PAN</option>
            <option>Aadhar</option>
            <option>Passport</option>
          </select>
          <input name="idNumber" placeholder="ID Number" onChange={handleChange} required />
          <select name="course" onChange={handleChange}>
            <option>React</option>
            <option>Node</option>
            <option>Python</option>
            <option>Java</option>
          </select>
        </div>

        <div className="checkbox-group">
          <label><input type="checkbox" value="C" onChange={handleChange} name="languages" /> C</label>
          <label><input type="checkbox" value="C++" onChange={handleChange} name="languages" /> C++</label>
          <label><input type="checkbox" value="Python" onChange={handleChange} name="languages" /> Python</label>
          <label><input type="checkbox" value="JavaScript" onChange={handleChange} name="languages" /> JavaScript</label>
          <label><input type="checkbox" value="Java" onChange={handleChange} name="languages" /> Java</label>
        </div>

        <textarea name="address" placeholder="Address" onChange={handleChange} required></textarea>
        <button type="submit">Register and Download PDF</button>
      </form>
    </div>
  );
};

export default StudentRegister;
