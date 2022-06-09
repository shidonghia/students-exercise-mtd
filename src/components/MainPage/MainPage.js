import "./MainPage.css";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

function MainPage() {
  return (
    <div className="main-page-container">
      <h1>Tra cứu thông tin tuyển sinh</h1>
      <img
        src="https://tracuutuyensinh.vn/wp-content/uploads/2020/11/logo-tracuuts-300x101.png"
        alt="Logo trang tra cứu thông tin tuyển sinh"
      />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainPage;
