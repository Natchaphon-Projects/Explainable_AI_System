import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RiskAssessment.css";
import sadFace from "../assets/sad.png";
import happyFace from "../assets/happiness.png";

function RiskAssessment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Sex: 0,
    Age: 0,
    Height: 0,
    Weight: 0,
    Continent: 0,
    National_Income: 0,
    Status: 0,
    Dietary_intakes_National: 0,
    Dietary_intakes_Fruit_G: 0,
    Dietary_intakes_Vegetables_G: 0,
    Dietary_intakes_Legumes_G: 0,
    Dietary_intakes_Nuts_G: 0,
    Dietary_intakes_Whole_grains_G: 0,
    Dietary_intakes_Fish_G: 0,
    Dietary_intakes_Dairy_G: 0,
    Dietary_intakes_Red_meat_G: 0,
    Basic_Water: 0,
    At_Least_Basic_Water: 0,
    Safely_Managed_Water: 0,
    Limited_Water: 0,
    Unimproved_Water: 0,
    Surface_Water: 0,
    Basic_Sanitation: 0,
    At_Least_Basic_Sanitation: 0,
    Safely_Managed_Sanitation: 0,
    Limited_Sanitation: 0,
    Unimproved_Sanitation: 0,
    Open_Defecation: 0,
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // แปลงค่าที่กรอกให้เป็นตัวเลขเสมอ
    setFormData({
      ...formData,
      [name]: value === "" ? 0 : parseFloat(value),
    });
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
    <div className="assessment-container">
      <div className="card-container">
        <div className="card">
          <h2>ประเมินความเสี่ยงเบื้องต้น</h2>
          <form>
            {Object.keys(formData).map((key) => (
              <label key={key}>
                {key}:
                <input
                  type="number"
                  name={key}
                  placeholder={`Enter ${key}`}
                  onChange={handleChange}
                />
              </label>
            ))}
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
        <div className="card result-card">
          <h2>ผลการประเมิน</h2>
          {result === "Normal" && (
            <div className="result normal">
              <p>ปกติ</p>
              <img src={happyFace} alt="Normal" className="result-icon" />
            </div>
          )}
          {result === "Obesity" && (
            <div className="result obesity">
              <p>โรคอ้วน</p>
              <img src={sadFace} alt="Obesity" className="result-icon" />
            </div>
          )}
          {result === "Overweight" && (
            <div className="result overweight">
              <p>น้ำหนักเกิน</p>
              <img src={sadFace} alt="Overweight" className="result-icon" />
            </div>
          )}
          {result === "SAM" && (
            <div className="result sam">
              <p>ภาวะขาดสารอาหารเฉียบพลันรุนแรง</p>
              <img src={sadFace} alt="SAM" className="result-icon" />
            </div>
          )}
          {result === "Stunting" && (
            <div className="result stunting">
              <p>เตี้ยแคระ</p>
              <img src={sadFace} alt="Stunting" className="result-icon" />
            </div>
          )}
          {result === "Underweight" && (
            <div className="result underweight">
              <p>น้ำหนักต่ำกว่าเกณฑ์</p>
              <img src={sadFace} alt="Underweight" className="result-icon" />
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

export default RiskAssessment;
