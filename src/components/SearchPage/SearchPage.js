import "./SearchPage.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { HOST_URL } from "../../apiUrl/ApiUrl";
import SearchResult from "../SearchResult/SearchResult";

export default function SearchPage() {
  const [fullName, setFullName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [searchResults, setSearchResults] = useState();
  const regexFullName =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/;
  const regexStudentCode = /^[A-Za-z0-9]*$/;

  const capitalizeFirstLetter = (str) => {
    return str
      .trim()
      .replace(/  +/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSearchStudent = (e) => {
    e.preventDefault();
    console.log(fullName, studentCode);
    if (!fullName && !studentCode) {
      alert("Phải có ít nhất 1 trường không trống");
    } else {
      if (studentCode && !regexStudentCode.test(studentCode.trim())) {
        alert("Mã học sinh chỉ bao gồm số và chữ");
      } else {
        if (fullName && !regexFullName.test(capitalizeFirstLetter(fullName))) {
          alert("Họ và tên chỉ bao gồm chữ cái và khoản trắng");
        } else {
          const keyword = studentCode
            ? `?Mã học sinh=${studentCode}`
            : `?Họ và tên=${capitalizeFirstLetter(fullName)}`;
          axios
            .get(HOST_URL + keyword)
            .then((res) => {
              if (res.data.length > 0) {
                setSearchResults([...res.data]);
              } else {
                setSearchResults(
                  "Không tìm thấy kết quả nào khớp với từ khóa. Vui lòng thử lại với tên/mã số khác."
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
    setFullName("");
    setStudentCode("");
  };

  return (
    <div className="search-page-container">
      <Link to="/" className="navigate-button">
        Về trang chủ
      </Link>
      <div className="search-page-box">
        <div className="search-page-field">
          <label htmlFor="full-name-input">Họ và tên</label>
          <input
            type="text"
            id="full-name-input"
            placeholder="Nhập họ tên thí sinh cần tìm..."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="search-page-field">
          <label htmlFor="student-code-input">Mã học sinh</label>
          <input
            type="text"
            id="student-code-input"
            placeholder="Nhập mã học sinh cần tìm..."
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="file-upload-button"
          onClick={handleSearchStudent}
        >
          Tìm kiếm
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ marginLeft: "4px" }}
          ></i>
        </button>
      </div>

      <SearchResult searchResults={searchResults} />
    </div>
  );
}
