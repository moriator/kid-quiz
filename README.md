# KidQuiz 🌈

Trò chơi trắc nghiệm vui nhộn và bổ ích dành cho trẻ em 5 tuổi.

## 🚀 Cách chạy ứng dụng

Vì ứng dụng sử dụng JavaScript Modules, bạn cần chạy qua một web server thay vì mở trực tiếp file HTML.

### Cách 1: Sử dụng Python (Đã cài sẵn trên máy)
Mở Terminal tại thư mục dự án và chạy:
```bash
python3 -m http.server 8000
```
Sau đó truy cập: `http://localhost:8000`

### Cách 2: Sử dụng Live Server (Nếu dùng VS Code)
Nhấn chuột phải vào `index.html` và chọn **Open with Live Server**.

## 📁 Cấu trúc thư mục
- `index.html`: Giao diện chính của ứng dụng.
- `src/app.js`: Logic điều khiển trò chơi.
- `src/questions.js`: Ngân hàng câu hỏi.
- `src/style.css`: Giao diện và hiệu ứng.
- `assets/`: Chứa hình ảnh và tài nguyên.

## ✨ Tính năng
- Trắc nghiệm theo chủ đề (Động vật, Thiên nhiên, Cây cối, Địa danh).
- Đếm ngược thời gian (10 giây mỗi câu).
- Bảng xếp hạng lưu cục bộ trên máy.
- Hiệu ứng âm thanh và phản hồi sinh động (Emojis).
