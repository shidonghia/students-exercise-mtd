import "./SearchResult.css";

export default function SearchResult({ searchResults }) {
  return (
    <div className="search-result-container">
      {typeof searchResults !== "string" && searchResults ? (
        <table>
          <thead>
            <tr>
              <th>Mã học sinh</th>
              <th>Họ và tên</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Tổng điểm 5 năm</th>
              <th>Điểm ưu tiên</th>
              <th>Đánh giá</th>
            </tr>
          </thead>
          <tbody>
            {searchResults?.map((searchResult) => (
              <tr key={searchResult.id}>
                <td>{searchResult["Mã học sinh"]}</td>
                <td>{searchResult["Họ và tên"]}</td>
                <td>{searchResult["Giới"]}</td>
                <td>{searchResult["Ngày"]}/{searchResult["Tháng"]}/{searchResult["Năm"]}</td>
                <td>{searchResult["Tổng điểm kết quả 5 năm"]}</td>
                <td>{searchResult["Điểm ưu tiên"]}</td>
                <td>{searchResult["Ghi chú"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>{searchResults}</div>
      )}
      {console.log(searchResults)}
    </div>
  );
}
