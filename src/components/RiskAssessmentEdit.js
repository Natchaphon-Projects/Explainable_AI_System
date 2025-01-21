import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RiskAssessmentEdit.css";
import sadFace from "../assets/sad.png";
import happyFace from "../assets/happiness.png";

function RiskAssessmentEdit() {
  const navigate = useNavigate();
  const [patientName] = useState("ศุวิชญ์ หนูวงศ์");
  const [formData, setFormData] = useState({
    Sex: 0,
    Age: 30,
    Height: 165,
    Weight: 60,
    Continent: 1,
    National_Income: 2,
    Status: 1,
    Dietary_intakes_National: 1,
    Dietary_intakes_Fruit_G: 150,
    Dietary_intakes_Vegetables_G: 200,
    Dietary_intakes_Legumes_G: 50,
    Dietary_intakes_Nuts_G: 20,
    Dietary_intakes_Whole_grains_G: 100,
    Dietary_intakes_Fish_G: 80,
    Dietary_intakes_Dairy_G: 200,
    Dietary_intakes_Red_meat_G: 100,
    Basic_Water: 95,
    At_Least_Basic_Water: 90,
    Safely_Managed_Water: 85,
    Limited_Water: 10,
    Unimproved_Water: 5,
    Surface_Water: 0,
    Basic_Sanitation: 90,
    At_Least_Basic_Sanitation: 85,
    Safely_Managed_Sanitation: 80,
    Limited_Sanitation: 10,
    Unimproved_Sanitation: 5,
    Open_Defecation: 0,
  });

  const [result, setResult] = useState(null);

  const fieldLabels = {
    Sex: "เพศ (0 = หญิง, 1 = ชาย)",
    Age: "อายุ (ปี)",
    Height: "ส่วนสูง (เซนติเมตร)",
    Weight: "น้ำหนัก (กิโลกรัม)",
    Continent: "รหัสทวีป (Asia = 1)",
    National_Income: "รายได้ของประเทศ (0-3)",
    Status: "สถานะทางโภชนาการ",
    Dietary_intakes_National: "การบริโภคอาหารในประเทศ",
    Dietary_intakes_Fruit_G: "ปริมาณการบริโภคผลไม้ (กรัม)",
    Dietary_intakes_Vegetables_G: "ปริมาณการบริโภคผัก (กรัม)",
    Dietary_intakes_Legumes_G: "ปริมาณการบริโภคพืชตระกูลถั่ว (กรัม)",
    Dietary_intakes_Nuts_G: "ปริมาณการบริโภคถั่ว (กรัม)",
    Dietary_intakes_Whole_grains_G: "ปริมาณการบริโภคธัญพืชเต็มเมล็ด (กรัม)",
    Dietary_intakes_Fish_G: "ปริมาณการบริโภคปลา (กรัม)",
    Dietary_intakes_Dairy_G: "ปริมาณการบริโภคผลิตภัณฑ์นม (กรัม)",
    Dietary_intakes_Red_meat_G: "ปริมาณการบริโภคเนื้อแดง (กรัม)",
    Basic_Water: "การเข้าถึงน้ำพื้นฐาน (%)",
    At_Least_Basic_Water: "การเข้าถึงน้ำอย่างน้อยพื้นฐาน (%)",
    Safely_Managed_Water: "การจัดการน้ำอย่างปลอดภัย (%)",
    Limited_Water: "การเข้าถึงน้ำจำกัด (%)",
    Unimproved_Water: "น้ำไม่ได้ปรับปรุงคุณภาพ (%)",
    Surface_Water: "น้ำผิวดิน (%)",
    Basic_Sanitation: "การเข้าถึงสุขาภิบาลพื้นฐาน (%)",
    At_Least_Basic_Sanitation: "การเข้าถึงสุขาภิบาลอย่างน้อยพื้นฐาน (%)",
    Safely_Managed_Sanitation: "การจัดการสุขาภิบาลอย่างปลอดภัย (%)",
    Limited_Sanitation: "การเข้าถึงสุขาภิบาลจำกัด (%)",
    Unimproved_Sanitation: "สุขาภิบาลไม่ได้ปรับปรุง (%)",
    Open_Defecation: "การถ่ายอุจจาระในที่โล่ง (%)",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value) && parseFloat(value) >= 0) {
      setFormData({
        ...formData,
        [name]: value === "" ? 0 : parseFloat(value),
      });
    }
  };

  const handleSubmit = async () => {
    console.log("Form data before sending:", formData);

    try {
      const response = await fetch("http://127.0.0.1:5000/prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }      

      const data = await response.json();
      if (data.prediction) {
        setResult(data.prediction);
      } else {
        console.error("Error in prediction response:", data.error);
        setResult("error");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setResult("error");
    }
  };

  return (
    <div className="risk-assessment-edit-container">
      <div className="patient-header">
        <h1 className="page-title">แบบฟอร์มประเมินผู้ป่วย</h1>
        <p className="patient-name">
          ชื่อผู้ป่วย: <strong>{patientName}</strong>
        </p>
      </div>
      <div className="assessment-grid">
        <div className="patient-info-section">
          <form>
            {Object.keys(formData).map((key) => (
              <div className="form-row" key={key}>
                <label>{fieldLabels[key]}:</label>
                <input
                  type="number"
                  name={key}
                  value={formData[key]}
                  placeholder={`กรอก ${fieldLabels[key]}`}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="action-buttons">
              <button type="button" className="evaluate-button" onClick={handleSubmit}>
                ประเมินอีกครั้ง
              </button>
              <button
                type="button"
                className="action-button back-button"
                onClick={() => navigate("/doctor-dashboard")}
              >
                ย้อนกลับ
              </button>
            </div>
          </form>
        </div>
        <div className="evaluation-section">
          <h3>ผลการประเมิน</h3>
          {result && result !== "error" && (
            <div className={`result-card result ${result.toLowerCase()}`}>
              <p className="result-text">{result}</p>
              <img
                src={result === "Normal" ? happyFace : sadFace}
                alt={result}
                className="result-icon"
              />
              <div className="xai-container">
                <div className="xai-graph">
                  <h4>Global XAI กราฟ</h4>
                  <p>Global XAI คำอธิบาย</p>
                </div>
                <div className="xai-description">
                  <h4>Local  กราฟ</h4>
                  <p>
                    <strong>Local XAI คำอธิบาย:</strong> 
                  </p>
                </div>
              </div>
            </div>
          )}
          {result === "error" && (
            <div className="result error">
              <p>เกิดข้อผิดพลาดในการประเมิน</p>
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

export default RiskAssessmentEdit;