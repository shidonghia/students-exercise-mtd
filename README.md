Mở terminal tại thư mục chứa dự án
Chạy các lệnh sau: 
### `git clone https://github.com/shidonghia/students-exercise-mtd.git`
### `npm install`
### `npm install json-server`
Di chuyển đến thư mục dự án, chạy lệnh 
### `npm start`
Mở 1 terminal khác tại thư mục **src/data** của dự án, tại đây chạy lệnh 
### `json-server --watch -p 7777 data.json`

Với lệnh start json-server, có thể thay **7777** thành một số khác nếu bị xung đột port. Nếu sửa port khác **7777**, cần vào file **ApiUrl.js** tại thư mục **/src/apiUrl**, sửa lại url của host. Trong thư mục **/src/data**, có file mẫu **sample.xlsx**, có thể dùng để kiểm tra chức năng import dữ liệu từ file vào database.
