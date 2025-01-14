import React from "react";
import '../styles.css';


function EditPatient() {
  return (
    <div className="form-container">
      <h2>แก้ไขข้อมูล</h2>
      <form>
        <div className="patient-header">
          <p>HN ID: 65111</p>
          <p>ชื่อ: ศุวิชญ์ หนูวงศ์</p>
        </div>
        <label>
          ผู้ปกครอง:
          <input type="text" value="นายณัชพล ทองอนันต์" />
        </label>
        <label>
          เบอร์โทรติดต่อ:
          <input type="text" value="083-970-9083" />
        </label>
        <label>
          ที่อยู่:
          <textarea value="123 หมู่ 5, อำเภอ เขาพนม, จังหวัด กระบี่, 81140" />
        </label>
        {/* ข้อมูลเพิ่มเติม */}
        <button type="submit">บันทึกข้อมูล</button>
      </form>
    </div>
  );
}

export default EditPatient;
