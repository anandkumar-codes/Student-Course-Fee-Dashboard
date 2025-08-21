import React, { useState } from "react";
import axios from "axios";
import "./StudentUpdate.css"

const StudentUpdate = () => {
  const [studentId, setStudentId] = useState("");
  const [formData, setFormData] = useState(null);
  const [showActions, setShowActions] = useState(false);

  const fetchStudent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/students/${studentId}`);
      setFormData(res.data);
      setShowActions(true);
    } catch (err) {
      alert("❌ Student not found");
      setShowActions(false);
    }
  };

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

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/students/${studentId}`, formData);
      alert("✅ Student updated");
    } catch (err) {
      alert("❌ Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/students/${studentId}`);
      alert("🗑️ Student deleted");
      setFormData(null);
      setShowActions(false);
      setStudentId("");
    } catch (err) {
      alert("❌ Delete failed");
    }
  };

  return (
    <div className="container">
      <h2>Update Student Details</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button onClick={fetchStudent}>Fetch Details</button>
      </div>

      {formData && (
        <form className="form-grid">
          <input name="name" value={formData.name} onChange={handleChange} />
          <input name="dob" value={formData.dob} onChange={handleChange} />
          <input name="mobile" value={formData.mobile} onChange={handleChange} />
          <input name="email" value={formData.email} onChange={handleChange} />
          <select name="idType" value={formData.idType} onChange={handleChange}>
            <option>PAN</option>
            <option>Aadhar</option>
            <option>Passport</option>
          </select>
          <input name="idNumber" value={formData.idNumber} onChange={handleChange} />
          <select name="course" value={formData.course} onChange={handleChange}>
            <option>React</option>
            <option>Node</option>
            <option>Python</option>
            <option>Java</option>
          </select>

          <div className="checkbox-group">
            {["C", "C++", "Python", "JavaScript", "Java"].map((lang) => (
              <label key={lang}>
                <input
                  type="checkbox"
                  name="languages"
                  value={lang}
                  checked={formData.languages.includes(lang)}
                  onChange={handleChange}
                />{" "}
                {lang}
              </label>
            ))}
          </div>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>

          {showActions && (
            <div className="actions">
              <button type="button" onClick={handleUpdate}>
                Update
              </button>
              <button type="button" onClick={handleDelete} style={{ backgroundColor: "red" }}>
                Delete
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default StudentUpdate;
