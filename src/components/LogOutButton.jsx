import React from "react";
import { isTokenExpired, isUserLoggedIn } from "../utils/helpers";
import { MDBBtn } from "mdb-react-ui-kit";
const LogOutButton = () => {
  const handleLogout = () => {
    // Xử lý đăng xuất, ví dụ: xóa token trong local storage
    localStorage.removeItem("ACCESS_TOKEN");
    // Nếu cần, có thể thực hiện các bước xóa dữ liệu, reset trạng thái, v.v.
    // sau khi đăng xuất thành công
    window.location.reload();
  };

  return (
    <>
      {isUserLoggedIn() && ( // Kiểm tra người dùng đã đăng nhập hay chưa
        <MDBBtn onClick={handleLogout}>Đăng xuất</MDBBtn>
      )}
    </>
  );
};

export default LogOutButton;
