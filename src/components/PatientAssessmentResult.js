import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PatientAssessmentResult.css";
import chartImage from "../assets/chart.png";
import growthChartImage from "../assets/growth-chart.png";
import editIcon from "../assets/edit.png"; // Icon for edit assessment
import historyIcon from "../assets/history.png"; // Icon for patient history

function PatientAssessmentResult() {
  const location = useLocation();
  const navigate = useNavigate();

  // Simulated patient data
  const patient = location.state?.patient || {
    id: "HN001",
    name: "ศุวิชญ์ หนูวงศ์",
    age: 7,
    gender: "ชาย",
    profile: "https://via.placeholder.com/150", // Placeholder image
    weight: 25,
    height: 110,
    bloodPressure: "110/70",
    allergies: ["นมวัว", "ถั่วลิสง"],
    chronicDiseases: ["โรคหอบหืด"],
    medicalHistory: ["ได้รับวัคซีนครบถ้วน"],
    bmi: 13.4,
    status: "น้ำหนักต่ำกว่าเกณฑ์",
    mealsPerDay: 2,
    sleepHours: 8,
    bowelMovements: 1,
    reasons: [
      "น้ำหนักและส่วนสูงอยู่ต่ำกว่ามาตรฐาน",
      "อาหารไม่ครบ 5 หมู่",
      "ขาดวิตามินดี",
    ],
    recommendations: [
      "เสริมอาหารที่มีโปรตีน",
      "เพิ่มปริมาณไฟเบอร์ในมื้ออาหาร",
      "พบแพทย์เพื่อปรึกษา",
    ],
  };

  const [doctorNote, setDoctorNote] = useState(""); // State to store doctor's note

  const handleSaveNote = () => {
    alert(`บันทึกคำแนะนำของแพทย์เรียบร้อย: ${doctorNote}`);
    setDoctorNote(""); // Clear the note after saving
  };

  return (
    <div className="assessment-result-container">
      <h2>ดูผลลัพธ์การประเมินของผู้ป่วย</h2>

      {/* Patient Info Section */}
      <div className="patient-header">
        <img src={patient.profile} alt={patient.name} className="patient-photo" />
        <div className="patient-info">
          <h3>{patient.name}</h3>
          <p>HN: {patient.id}</p>
          <p>อายุ: {patient.age} ปี</p>
          <p>เพศ: {patient.gender}</p>
          <p>น้ำหนัก: {patient.weight} กก.</p>
          <p>ส่วนสูง: {patient.height} ซม.</p>
          <p>ความดันโลหิต: {patient.bloodPressure}</p>
          <p>โรคประจำตัว: {patient.chronicDiseases?.join(", ") || "ไม่มี"}</p>
          <p>ภูมิแพ้: {patient.allergies?.join(", ") || "ไม่มี"}</p>
          <p>ประวัติทางการแพทย์: {patient.medicalHistory?.join(", ")}</p>
        </div>
      </div>

      {/* Actions Section */}
<div className="patient-actions">
  <button className="action-button" onClick={() => navigate("/edit-assessment/1")}>
    <img src={editIcon} alt="Edit Assessment" className="action-icon" />
    <span>แก้ไขข้อมูลการซักประวัติ</span>
  </button>
  <button className="action-button" onClick={() => navigate("/patient-history")}>
    <img src={historyIcon} alt="Patient History" className="action-icon" />
    <span>ดูประวัติย้อนหลังผู้ป่วย</span>
  </button>
</div>


      {/* BMI Section */}
      <div className="bmi-section">
        <h3>BMI = {patient.bmi}</h3>
        <p>อยู่ในเกณฑ์: {patient.status}</p>
      </div>

      {/* First Chart Section */}
      <div className="chart-section">
        <h3>กราฟ:</h3>
        <div className="chart-container">
          <img src={chartImage} alt="กราฟแสดงผล" className="chart-image" />
          <p className="chart-description">
            กราฟนี้แสดงถึงปัจจัยที่ส่งผลต่อภาวะทุพโภชนาการ: <br />
            <strong>สีแดง:</strong> ชี้ให้เห็นถึงการบริโภคเกินมาตรฐาน <br />
            <strong>สีน้ำเงิน:</strong> ชี้ให้เห็นถึงการขาดสมดุลของการบริโภค
          </p>
        </div>
        <div className="analysis-notes">
          <h4>หมายเหตุ:</h4>
          <ul>
            <li>
              <strong>+0.92 (สีแดง):</strong> การบริโภคไขมันที่สูงมากกว่าปกติ
            </li>
            <li>
              <strong>-0.52 (สีน้ำเงิน):</strong> การขาดสารอาหารประเภทโปรตีนและไฟเบอร์
            </li>
          </ul>
        </div>
      </div>

      {/* Growth Chart Section */}
      <div className="growth-section">
        <h3>กราฟพัฒนาการ:</h3>
        <div className="chart-container">
          <img src={growthChartImage} alt="กราฟพัฒนาการ" className="chart-image" />
          <p className="chart-description">
            กราฟนี้แสดงพัฒนาการด้านน้ำหนักและส่วนสูง: <br />
            <strong>สีเขียวเข้ม:</strong> แสดงน้ำหนักปกติ <br />
            <strong>สีส้ม:</strong> น้ำหนักต่ำกว่าเกณฑ์
          </p>
        </div>
        <div className="analysis-notes">
          <h4>หมายเหตุ:</h4>
          <ul>
            <li>
              การเจริญเติบโตอยู่ในระดับช้ากว่าปกติ ต้องเสริมสารอาหารประเภทโปรตีน
            </li>
            <li>
              น้ำหนักของผู้ป่วยยังอยู่ในเกณฑ์ต่ำกว่าเกณฑ์เมื่อเปรียบเทียบกับอายุ
            </li>
          </ul>
        </div>
      </div>

      {/* Test Results Section */}
      <div className="test-results-section">
        <h3>ผลการตรวจ:</h3>
        <table className="results-table">
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
              <td>{patient.bmi}</td>
              <td>15.05</td>
              <td>
                <div className="bar-container">
                  <div className="bar low active"></div>
                </div>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>ปริมาณรับประทานอาหาร</td>
              <td>{patient.mealsPerDay}</td>
              <td>3 ครั้ง / วัน</td>
              <td></td>
              <td>
                <div className="bar-container">
                  <div className="bar normal active"></div>
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>การนอนหลับ</td>
              <td>{patient.sleepHours}</td>
              <td>9-11 ชม. / วัน</td>
              <td>
                <div className="bar-container">
                  <div className="bar low active"></div>
                </div>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>การขับถ่าย</td>
              <td>{patient.bowelMovements}</td>
              <td>1-2 ครั้ง / วัน</td>
              <td></td>
              <td>
                <div className="bar-container">
                  <div className="bar normal active"></div>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Recommendations */}
      <div className="recommendation-section">
        <h3>คำแนะนำ:</h3>
        <ul>
          {patient.recommendations.map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
        </ul>
      </div>

      {/* Doctor Note Section */}
      <div className="doctor-note-section">
        <h3>คำแนะนำจากแพทย์:</h3>
        <div className="doctor-note-container">
          {/* Left Side: Display the saved doctor's note */}
          <div className="doctor-note-display">
            <h4>คำแนะนำที่บันทึก:</h4>
            <p>{doctorNote || "ยังไม่มีคำแนะนำที่บันทึก"}</p>
          </div>

          {/* Right Side: Input doctor's note */}
          <div className="doctor-note-input">
            <textarea
              value={doctorNote}
              onChange={(e) => setDoctorNote(e.target.value)}
              placeholder="กรอกคำแนะนำสำหรับผู้ป่วย"
              className="doctor-note-textarea"
            />
            <button onClick={handleSaveNote} className="save-button">
              บันทึก
            </button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/view-results")}>
        ย้อนกลับ
      </button>
    </div>
  );
}

export default PatientAssessmentResult;
