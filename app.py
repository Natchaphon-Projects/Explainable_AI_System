from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from joblib import load
import numpy as np

app = FastAPI()

# เพิ่ม CORS Middleware เพื่ออนุญาตคำขอจาก React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ระบุ URL ของ React
    allow_credentials=True,
    allow_methods=["*"],  # อนุญาตทุก HTTP methods
    allow_headers=["*"],  # อนุญาตทุก headers
)

# โหลดโมเดลและไฟล์สนับสนุน
try:
    model = load('src/model/best_model.pkl')
    columns = load('src/model/columns.pkl')
    mapping = load('src/model/mapping.pkl')  # โหลด mapping
    print("✅ Model, columns, and mapping loaded successfully")
except Exception as e:
    print(f"❌ Error loading model, columns, or mapping: {e}")
    model = None
    columns = []
    mapping = {}

# สร้าง Pydantic Model สำหรับรับข้อมูล
class PredictionInput(BaseModel):
    Sex: int
    Age: int
    Height: int
    Weight: int
    Continent: int
    National_Income: int
    Status: int
    Dietary_intakes_National: int
    Dietary_intakes_Fruit_G: float
    Dietary_intakes_Vegetables_G: float
    Dietary_intakes_Legumes_G: float
    Dietary_intakes_Nuts_G: float
    Dietary_intakes_Whole_grains_G: float
    Dietary_intakes_Fish_G: float
    Dietary_intakes_Dairy_G: float
    Dietary_intakes_Red_meat_G: float
    Basic_Water: float
    At_Least_Basic_Water: float
    Safely_Managed_Water: float
    Limited_Water: float
    Unimproved_Water: float
    Surface_Water: float
    Basic_Sanitation: float
    At_Least_Basic_Sanitation: float
    Safely_Managed_Sanitation: float
    Limited_Sanitation: float
    Unimproved_Sanitation: float
    Open_Defecation: float

@app.post("/prediction", tags=["predictions"])
async def get_prediction(input_data: PredictionInput):
    try:
        if model is None:
            return {"error": "Model not loaded. Please check the file path or format."}

        # แปลงข้อมูลเป็น list ตามลำดับ columns
        data = []
        for col in columns:
            value = getattr(input_data, col, 0)

            # หาก column อยู่ใน mapping ให้แปลงค่า
            if col in mapping and value in mapping[col]:
                mapped_value = mapping[col][value]
                data.append(mapped_value)
            else:
                data.append(float(value))  # ใช้ค่าเดิมหากไม่มี mapping

        print("Data for model prediction:", data)  # ตรวจสอบข้อมูลที่ส่งให้โมเดล

        # แปลงข้อมูลเป็น numpy array
        data = np.array(data).reshape(1, -1)

        # พยากรณ์ด้วยโมเดล
        prediction = model.predict(data).tolist()

        # แปลงผลลัพธ์เป็น class
        class_names = ['Normal', 'Obesity', 'Overweight', 'SAM', 'Stunting', 'Underweight']
        predicted_class = class_names[prediction[0]]

        return {"prediction": predicted_class}

    except Exception as e:
        print("Error occurred:", str(e))
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=5000, reload=True)