# Cửa Hàng Laptop (Demo)

Trang web tĩnh giới thiệu ba dòng laptop: Gaming, Văn Phòng và Design.

## Cấu trúc
```
index.html
css/ style.css
js/  app.js
assets/ (chứa hình ảnh nếu bổ sung sau)
```

## Chức năng
- Lọc theo danh mục: Gaming / Văn Phòng / Design / Tất cả.
- Tìm kiếm theo tên model.
- Sắp xếp giá tăng hoặc giảm.
- Hiển thị badge thông số chính.

## Cách chạy
Mở trực tiếp file `index.html` trong trình duyệt:

Trên Windows (PowerShell):
```powershell
Start-Process .\index.html
```

Hoặc dùng server nhanh (nếu đã cài Node.js):
```powershell
npm install -g serve
serve .
```
Sau đó truy cập địa chỉ hiển thị (thường http://localhost:3000).

## Mở rộng gợi ý
- Thêm giỏ hàng và lưu localStorage.
- Trang chi tiết sản phẩm (product.html) với mô tả sâu.
- Tải dữ liệu từ file JSON thay vì mảng cố định.
- Thêm chuyển đổi chủ đề sáng/tối.

## Bản quyền
Demo học tập năm 2025.
