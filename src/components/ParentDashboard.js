import React from "react";
import { useNavigate } from "react-router-dom";
import "./ParentDashboard.css";
import logo from "../assets/logo.png";
import profileImage from "../assets/pro.jpg";
import loupeIcon from "../assets/loupe.png";
import dietImage from "../assets/diet.jpg";
import exerciseImage from "../assets/exercise.jpg";
import fruitsImage from "../assets/fruits.jpg";
import hydrationImage from "../assets/hydration.jpg";
import anemiaImage from "../assets/anemia.jpg";
import obesityImage from "../assets/obesity.png";

function ParentDashboard() {
  const navigate = useNavigate();

  const handleReadMore = (title) => {
    alert(`อ่านเพิ่มเติมเกี่ยวกับ: ${title}`);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src={logo} alt="Logo" className="dashboard-logo" />
        <nav>
          <ul className="nav-links">
            <li>
              <button className="nav-button" onClick={() => navigate("/parent-dashboard")}>
                หน้าแรก
              </button>
            </li>
            <li>
              <button className="nav-button" onClick={() => navigate("/parent-risk-assessment")}>
                ประเมินความเสี่ยงเบื้องต้น
              </button>
            </li>
            <li>
              <button className="logout-button" onClick={() => navigate("/")}>
                ออกจากระบบ
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="dashboard-main">
        <div className="header-content">
          <div className="user-info-left">
            <p>ยินดีต้อนรับ</p>
            <h1>ผู้ปกครอง</h1>
          </div>
          <div className="profile-container-right">
            <img src={profileImage} alt="User Profile" className="profile-image" />
          </div>
        </div>

        <div className="centered-user-name">คุณ Chin Tanawat</div>

        <div className="menu-container">
          <div className="menu-item" onClick={() => navigate("/parent-risk-assessment")}>
            <img src={loupeIcon} alt="Risk Assessment" className="menu-icon" />
            <p className="menu-title">ประเมินความเสี่ยงเบื้องต้น</p>
            <small className="menu-description">Preliminary Risk Assessment</small>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="recommendation-section">
          <h3>คำแนะนำเกี่ยวกับภาวะโภชนาการ</h3>
          <div className="recommendation-cards">
            <div className="recommendation-card">
              <img src={dietImage} alt="Diet" className="recommendation-image" />
              <h4>ลดการบริโภคอาหารที่มีไขมันสูง</h4>
              <p>ช่วยลดความเสี่ยงของโรคหัวใจและน้ำหนักเกิน</p>
              <button className="read-more-button" onClick={() => handleReadMore("ลดการบริโภคอาหารที่มีไขมันสูง")}>
                อ่านเพิ่มเติม
              </button>
            </div>
            <div className="recommendation-card">
  <img src={exerciseImage} alt="Exercise" className="recommendation-image" />
  <h4>เพิ่มการออกกำลังกายวันละ<br />30 นาที</h4> {/* ใช้ <br /> */}
  <p>ช่วยเสริมสร้างความแข็งแรงของร่างกาย</p>
  <button className="read-more-button" onClick={() => handleReadMore("เพิ่มการออกกำลังกายวันละ 30 นาที")}>
    อ่านเพิ่มเติม
  </button>
</div>

            <div className="recommendation-card">
              <img src={fruitsImage} alt="Fruits and Vegetables" className="recommendation-image" />
              <h4>เพิ่มการบริโภคผักและผลไม้</h4>
              <p>เพิ่มวิตามินและแร่ธาตุเพื่อสุขภาพที่ดี</p>
              <button className="read-more-button" onClick={() => handleReadMore("เพิ่มการบริโภคผักและผลไม้")}>
                อ่านเพิ่มเติม
              </button>
            </div>
            <div className="recommendation-card">
              <img src={hydrationImage} alt="Hydration" className="recommendation-image" />
              <h4>ดื่มน้ำให้เพียงพอ</h4>
              <p>ช่วยให้ระบบการย่อยและการเผาผลาญทำงานได้ดี</p>
              <button className="read-more-button" onClick={() => handleReadMore("ดื่มน้ำให้เพียงพอ")}>
                อ่านเพิ่มเติม
              </button>
            </div>
            <div className="recommendation-card">
              <img src={anemiaImage} alt="Anemia" className="recommendation-image" />
              <h4>เพิ่มการบริโภคธาตุเหล็ก</h4>
              <p>ป้องกันภาวะโลหิตจางที่เกิดจากการขาดธาตุเหล็ก</p>
              <button className="read-more-button" onClick={() => handleReadMore("เพิ่มการบริโภคธาตุเหล็ก")}>
                อ่านเพิ่มเติม
              </button>
            </div>
            <div className="recommendation-card">
              <img src={obesityImage} alt="Obesity" className="recommendation-image" />
              <h4>ควบคุมน้ำหนัก</h4>
              <p>ลดความเสี่ยงของโรคอ้วนและเบาหวาน</p>
              <button className="read-more-button" onClick={() => handleReadMore("ควบคุมน้ำหนัก")}>
                อ่านเพิ่มเติม
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>© 2023 - Project Hospital</p>
      </footer>
    </div>
  );
}

export default ParentDashboard;
