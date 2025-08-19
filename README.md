# Todo Frontend (React + Vite + Tailwind + Axios)

Frontend สำหรับ Todo App ใช้ **React (Vite)** และ **Tailwind CSS** เชื่อมต่อกับ backend ที่ทำด้วย **Express + MongoDB (Atlas)** และ Deploy บน **Render (Static Site)**

---

## ฟีเจอร์

* เพิ่ม / แก้ไข / ลบ / ค้นหา Todo
* Mark งานว่าเสร็จ (completed)
* ดับเบิลคลิกเพื่อแก้ไขชื่อ Todo
* Responsive UI ด้วย Tailwind
* เชื่อมต่อ API backend ที่ Render

---

## โครงสร้างโปรเจกต์

```
todo-frontend-react-mongodb/
 ├── public/
 ├── src/
 │   ├── services/       # axios เรียก backend
 │   ├── App.jsx         # UI หลัก
 │   ├── main.jsx        # entry point
 │   └── index.css       # tailwind styles
 ├── package.json
 ├── vite.config.js
 ├── postcss.config.js
 ├── tailwind.config.js
 └── README.md
```

---

## การติดตั้ง (Local)

1. โคลนโปรเจกต์

   ```bash
   git clone https://github.com/<username>/todo-frontend-react-mongodb.git
   cd todo-frontend-react-mongodb
   ```

2. ติดตั้ง dependencies

   ```bash
   npm install
   ```

3. สร้างไฟล์ `.env.local`

   ```env
   VITE_API_URL=http://localhost:3000
   ```

   > ถ้าจะเชื่อมกับ backend ที่ Render ให้ใส่
   > `VITE_API_URL=https://todo-backend-mongodb-xxxx.onrender.com`

4. รัน dev server

   ```bash
   npm run dev
   ```

   เปิด [http://localhost:5173](http://localhost:5173)

---

## การใช้งาน

* พิมพ์ข้อความแล้วกด **เพิ่ม** → สร้าง Todo
* ดับเบิลคลิก Todo → เปลี่ยนชื่อ
* ติ๊ก checkbox → Toggle ว่างานเสร็จ / ไม่เสร็จ
* กดปุ่ม → ลบงาน
* ช่องค้นหา → พิมพ์ข้อความแล้วรอ จะ filter งาน

---
