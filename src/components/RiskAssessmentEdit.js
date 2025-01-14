import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RiskAssessmentEdit.css";

const patients = [
  {
    id: 1,
    name: "เด็กชาย ศุวิชญ์ หนูวงศ์",
    age: "4 ขวบ",
    weight: "13 กก.",
    height: "90 ซม.",
    gender: "ชาย",
    medicalCondition: "โรคโลหิตจาง (Anemia)",
    meals: "3 มื้อ",
    foodTypes: "ข้าว เนื้อสัตว์",
    foodAvoided: "ผักใบเขียว",
    bowelMovements: "2 ครั้ง / วัน",
    sleep: "6 ชม.",
  },
  {
    id: 2,
    name: "เด็กหญิง ศิริกานต์ พรมสุ",
    age: "5 ขวบ",
    weight: "15 กก.",
    height: "95 ซม.",
    gender: "หญิง",
    medicalCondition: "ไม่มีโรคประจำตัว",
    meals: "3 มื้อ",
    foodTypes: "ข้าว ผัก",
    foodAvoided: "ขนมหวาน",
    bowelMovements: "1 ครั้ง / วัน",
    sleep: "8 ชม.",
  },
];

function RiskAssessmentEdit() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const handlePatientChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const patient = patients.find((p) => p.id === selectedId);
    setSelectedPatient(patient);
    setEvaluationResult(null);
  };

  const handleInputChange = (field, value) => {
    setSelectedPatient({ ...selectedPatient, [field]: value });
  };

  const handleEvaluate = () => {
    const randomBMI = (Math.random() * (18 - 10) + 10).toFixed(2);
    const randomRisk = Math.random() > 0.5 ? "เสี่ยงมากกว่าปกติ" : "ปกติ";
    const result = {
      bmi: randomBMI,
      riskLevel: randomRisk,
      notes: randomRisk === "เสี่ยงมากกว่าปกติ" ? "ควรพบแพทย์" : "สมดุลดี",
    };
    setEvaluationResult(result);
  };

  return (
    <div className="risk-assessment-edit-container">
      <h2 className="page-title">ผลลัพธ์การประเมินของผู้ป่วย</h2>

      <div className="assessment-grid">
        {/* Left Section */}
        <div className="patient-info-section">
          <div className="form-row">
            <label>เลือกผู้ป่วย:</label>
            <select onChange={handlePatientChange}>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-section">
            {Object.keys(selectedPatient).map((key) =>
              key !== "id" && key !== "name" ? (
                <div className="form-row" key={key}>
                  <label>{key}:</label>
                  <input
                    type="text"
                    value={selectedPatient[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                </div>
              ) : null
            )}
          </div>
          <button className="evaluate-button" onClick={handleEvaluate}>
            บันทึกและประเมิน
          </button>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={() => navigate("/patient-history")} className="action-button">
              ดูประวัติการตรวจย้อนหลัง
            </button>
            <button onClick={() => navigate("/patient-profile")} className="action-button">
              ดูประวัติผู้ป่วย
            </button>
            <button
              onClick={() => (window.location.href = "http://localhost:3000/doctor-dashboard")}
              className="action-button back-button"
            >
              ย้อนกลับไปหน้า Doctor Dashboard
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="evaluation-section">
          <h3>ผลการประเมิน</h3>
          {evaluationResult ? (
            <div>
              <p>BMI: {evaluationResult.bmi}</p>
              <p>ความเสี่ยง: {evaluationResult.riskLevel}</p>
              <p>หมายเหตุ: {evaluationResult.notes}</p>
              <div className="chart-placeholder">
                <p>กราฟแสดงผล BMI</p>
                <div className="chart"></div>
              </div>
              <div className="evaluation-table">
                <h4>ผลการตรวจ:</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Test</th>
                      <th>Results</th>
                      <th>Reference Interval</th>
                      <th>LOW</th>
                      <th>NORMAL</th>
                      <th>HIGH</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>BMI</td>
                      <td>{evaluationResult.bmi}</td>
                      <td>15.05</td>
                      <td className={evaluationResult.bmi < 15 ? "low" : ""}></td>
                      <td className={evaluationResult.bmi >= 15 && evaluationResult.bmi <= 18 ? "normal" : ""}></td>
                      <td className={evaluationResult.bmi > 18 ? "high" : ""}></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>กรุณากรอกข้อมูลและกดประเมิน</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RiskAssessmentEdit;
