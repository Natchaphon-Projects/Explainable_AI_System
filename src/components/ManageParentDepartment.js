import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageDepartment.css"; // ใช้ไฟล์ CSS เดียวกัน

function ManageParentDepartment() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const parents = [
    { id: "P001", name: "อนงค์ วัฒนศิริ" },
    { id: "P002", name: "บุญรัตน์ ธนภูมิ" },
    { id: "P003", name: "ศิริพร วงศ์วัฒนกุล" },
  ];

  const filteredParents = parents.filter(
    (parent) =>
      parent.id.includes(searchTerm) || parent.name.includes(searchTerm)
  );

  return (
    <div className="manage-department-container">
      <header>
        <h1>จัดการแผนกผู้ปกครอง</h1>
        <p>Manage Parent Department</p>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="กรุณากรอกรหัสหรือชื่อผู้ปกครอง"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="add-button" onClick={() => navigate("/add-parent")}>
          + เพิ่มผู้ปกครอง
        </button>
      </div>

      <div className="patient-list">
        {filteredParents.length > 0 ? (
          filteredParents.map((parent) => (
            <div key={parent.id} className="patient-card">
              <div className="patient-info">
                <p className="patient-name">{parent.name}</p>
                <p className="patient-hn">ID: {parent.id}</p>
              </div>
              <div className="action-buttons">
                <button
                  onClick={() => navigate(`/edit-parent/${parent.id}`)}
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
            ไม่พบข้อมูลผู้ปกครอง
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

export default ManageParentDepartment;
