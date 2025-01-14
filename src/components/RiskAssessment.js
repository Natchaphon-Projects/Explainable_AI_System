import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For back navigation
import "./RiskAssessment.css";
import sadFace from "../assets/sad.png"; // Sad face image
import happyFace from "../assets/happiness.png"; // Happy face image

function RiskAssessment() {
  const navigate = useNavigate(); // Navigation function
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "",
    disease: "",
    meals: "",
  });
  const [result, setResult] = useState(null); // Stores the risk result

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Validate form fields
    const { age, weight, height, gender, disease, meals } = formData;
    if (!age || !weight || !height || !gender || !disease || !meals) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่องก่อนทำการประเมิน");
      return;
    }

    // Generate result
    const isAtRisk = Math.random() > 0.5; // Randomize result
    setResult(isAtRisk ? "at-risk" : "no-risk");
  };

  return (
    <div className="assessment-container">
      <div className="card-container">
        {/* Input Card */}
        <div className="card">
          <h2>ประเมินความเสี่ยงเบื้องต้น</h2>
          <form>
            <label>
              อายุ:
              <input
                type="text"
                name="age"
                placeholder="กรอกอายุ"
                onChange={handleChange}
              />
            </label>
            <label>
              น้ำหนัก:
              <input
                type="text"
                name="weight"
                placeholder="กรอกน้ำหนัก (kg)"
                onChange={handleChange}
              />
            </label>
            <label>
              ส่วนสูง:
              <input
                type="text"
                name="height"
                placeholder="กรอกส่วนสูง (cm)"
                onChange={handleChange}
              />
            </label>
            <label>
              เพศ:
              <input
                type="text"
                name="gender"
                placeholder="กรอกเพศ"
                onChange={handleChange}
              />
            </label>
            <label>
              โรคประจำตัว:
              <input
                type="text"
                name="disease"
                placeholder="กรอกโรคประจำตัว"
                onChange={handleChange}
              />
            </label>
            <label>
              มื้ออาหารต่อวัน:
              <input
                type="text"
                name="meals"
                placeholder="กรอกจำนวนมื้ออาหาร"
                onChange={handleChange}
              />
            </label>
            <button type="button" onClick={handleSubmit}>
              บันทึกและประเมิน
            </button>
            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/parent-dashboard")}
            >
              ย้อนกลับ
            </button>
          </form>
        </div>

        {/* Result Card */}
        <div className="card result-card">
          <h2>ผลการประเมิน</h2>
          {result === "at-risk" && (
            <div className="result at-risk">
              <p>มีความเสี่ยง</p>
              <img
                src={sadFace}
                alt="At Risk"
                className="result-icon"
              />
            </div>
          )}
          {result === "no-risk" && (
            <div className="result no-risk">
              <p>ไม่มีความเสี่ยง</p>
              <img
                src={happyFace}
                alt="No Risk"
                className="result-icon"
              />
            </div>
          )}
          {!result && (
            <div className="result placeholder">
              <p>กรุณากรอกข้อมูลและกดปุ่มประเมิน</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RiskAssessment;
