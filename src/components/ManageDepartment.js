import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageDepartment.css";

function ManageDepartment() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const patients = [
    { id: "65111", name: "ศุวิชญ์ หนูวงศ์" },
    { id: "65112", name: "พฤฒิภณ ปริศิริประภา" },
    { id: "65113", name: "ธีรดล ทวีทรัพย์" },
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.id.includes(searchTerm) || patient.name.includes(searchTerm)
  );

  return (
    <div className="manage-department-container">
      <header>
        <h1>จัดการแผนกเด็ก</h1>
        <p>Manage Pediatric Department</p>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="กรุณากรอกรหัส HN หรือชื่อผู้ป่วย"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="add-button" onClick={() => navigate("/add-patient")}>
          + เพิ่มผู้ป่วย
        </button>
      </div>

      <div className="patient-list">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div key={patient.id} className="patient-card">
              <div className="patient-info">
                <p className="patient-name">{patient.name}</p>
                <p className="patient-hn">HN: {patient.id}</p>
              </div>
              <div className="action-buttons">
                <button
                  onClick={() => navigate(`/edit-patient/${patient.id}`)}
                  className="edit-button"
                >
                  แก้ไข / เพิ่ม
                </button>
                <button className="delete-button">ลบ</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#7a7f85" }}>
            ไม่พบข้อมูลผู้ป่วย
          </p>
        )}
      </div>

      <button
        className="back-button"
        onClick={() => navigate("/admin-dashboard")}
      >
        ย้อนกลับไปหน้า Dashboard
      </button>
    </div>
  );
}

export default ManageDepartment;
