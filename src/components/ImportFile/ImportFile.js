import "./ImportFile.css";
import { useState } from "react";
import axios from "axios";
import { HOST_URL } from "../../apiUrl/ApiUrl";
import { Link } from "react-router-dom";

export default function ImportFile() {
  var XLSX = require("xlsx");
  const [fileSelect, setFileSelect] = useState();

  const mapIndexToPropName = (i) => {
    switch (i) {
      case 1:
        return "STT";
      case 2:
        return "Trường Tiểu học";
      case 3:
        return "Quận/Huyện";
      case 4:
        return "Mã học sinh";
      case 5:
        return "Lớp";
      case 6:
        return "Họ và tên";
      case 7:
        return "Ngày";
      case 8:
        return "Tháng";
      case 9:
        return "Năm";
      case 10:
        return "Giới";
      case 11:
        return "Nơi sinh";
      case 12:
        return "Dân tộc";
      case 13:
        return "Hộ khẩu thường trú";
      case 14:
        return "Điện thoại liên hệ";
      case 15:
        return "Tổng điểm năm lớp 1";
      case 16:
        return "Tổng điểm năm lớp 2";
      case 17:
        return "Tổng điểm năm lớp 3";
      case 18:
        return "Tổng điểm năm lớp 4";
      case 19:
        return "Tổng điểm năm lớp 5";
      case 20:
        return "Tổng điểm kết quả 5 năm";
      case 21:
        return "Điểm ưu tiên";
      case 22:
        return "Tổng điểm sơ tuyển";
      case 23:
        return "Ghi chú";
      default:
        return "err";
    }
  };

  const mapIndexToColumn = (i) => {
    switch (i) {
      case 1:
        return "A";
      case 2:
        return "B";
      case 3:
        return "C";
      case 4:
        return "D";
      case 5:
        return "E";
      case 6:
        return "F";
      case 7:
        return "G";
      case 8:
        return "H";
      case 9:
        return "I";
      case 10:
        return "J";
      case 11:
        return "K";
      case 12:
        return "L";
      case 13:
        return "M";
      case 14:
        return "N";
      case 15:
        return "O";
      case 16:
        return "P";
      case 17:
        return "Q";
      case 18:
        return "R";
      case 19:
        return "S";
      case 20:
        return "T";
      case 21:
        return "U";
      case 22:
        return "V";
      case 23:
        return "W";
      default:
        return "err";
    }
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (fileSelect) {
      console.log(fileSelect)
      if (fileSelect.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        var fileReader = new FileReader();
        fileReader.onload = (e) => {
          var data = e.target.result;
          var workbook = XLSX.read(data, {
            type: "binary",
          });
          console.log(workbook);
          const numberOfRecord = parseInt(
            workbook.Sheets.data["!ref"].split("W")[1]
          );
          console.log(numberOfRecord);
          console.log(workbook.Sheets.data[`D${numberOfRecord}`].v);
          for (let i = 6; i <= numberOfRecord; i++) {
            const studentData = {};
            for (let j = 1; j <= 23; j++) {
              if (j === 4) {
                studentData[mapIndexToPropName(j)] =
                  workbook.Sheets.data[`${mapIndexToColumn(j)}${i}`]?.v.replace(/(\r\n|\n|\r)/gm, "");;
              } else {
                studentData[mapIndexToPropName(j)] =
                  workbook.Sheets.data[`${mapIndexToColumn(j)}${i}`]?.v || 0;
              }
            }
            axios
              .post(HOST_URL, studentData)
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }
        };
      } else {
        alert("Chỉ nhận file .xlsx");
      }
    }
    fileReader.readAsBinaryString(fileSelect);
    setFileSelect("")
  };
  return (
    <div className="file-import-container">
      <div className="file-import">
        <label htmlFor="file-upload-input" className="file-upload-field">
          <input
            type="file"
            id="file-upload-input"
            accept=".xlsx"
            onChange={(e) => setFileSelect(e.target.files[0])}
          />
          {fileSelect ? fileSelect.name : "Nhấn để chọn file (.xlsx)"}
        </label>
        <button
          type="button"
          className="file-upload-button"
          onClick={handleSubmitFile}
        >
          Upload
        </button>
      </div>
      <Link className="navigate-button" to="/search-student">
        {" "}
        Tra cứu thí sinh{" "}
      </Link>
    </div>
  );
}
