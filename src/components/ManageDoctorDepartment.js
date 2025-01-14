import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageDepartment.css"; // ใช้ไฟล์ CSS เดียวกันกับแผนกเด็ก

function ManageDoctorDepartment() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const doctors = [
    { id: "D001", name: "นพ. กิตติชัย พูนทรัพย์" },
    { id: "D002", name: "นพ. อมรินทร์ วิริยะธรรม" },
    { id: "D003", name: "พญ. จันทิมา แก้วประเสริฐ" },
  ];

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.id.includes(searchTerm) || doctor.name.includes(searchTerm)
  );

  return (
    <div className="manage-department-container">
      <header>
        <h1>จัดการแผนกหมอ</h1>
        <p>Manage Doctor Department</p>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="กรุณากรอกรหัสหรือชื่อหมอ"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="add-button" onClick={() => navigate("/add-doctor")}>
          + เพิ่มหมอ
        </button>
      </div>

      <div className="patient-list">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="patient-card">
              <div className="patient-info">
                <p className="patient-name">{doctor.name}</p>
                <p className="patient-hn">ID: {doctor.id}</p>
              </div>
              <div className="action-buttons">
                <button
                  onClick={() => navigate(`/edit-doctor/${doctor.id}`)}
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
            ไม่พบข้อมูลหมอ
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

export default ManageDoctorDepartment;
