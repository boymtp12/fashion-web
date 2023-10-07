import axios from "axios";
import jwt_decode from "jwt-decode";
const URL = "http://localhost:8080/api/v1/";
const axiosConfig = axios.create({
  baseURL: URL,
  header: {
    "Content-Type": "appplication/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosConfig.interceptors.request.use(async (config) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);

      // Lấy thời gian hết hạn từ thông tin giải mã JWT
      const expirationTime = decodedToken.exp * 1000; // Đổi sang đơn vị milliseconds

      // Kiểm tra xem token đã hết hạn chưa
      if (Date.now() > expirationTime) {
        localStorage.removeItem("ACCESS_TOKEN");

        // Token đã hết hạn, xử lý tương ứng (ví dụ: đăng xuất người dùng)
        // Ví dụ: gửi action hoặc dispatch đến Redux store để đăng xuất người dùng
        console.log("Token đã hết hạn");
      } else {
        // Token chưa hết hạn, thêm token vào header của yêu cầu
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  } catch (error) {
    console.error("Error occurred while attaching token to request:", error);
    return Promise.reject(error);
  }
});

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      console.error("Unauthorized request:", error);
      // redirect user to login page or handle token refresh
    } else if (status === 403) {
      console.error("Forbidden request:", error);
      // handle permission denied error
    } else if (status === 404) {
      console.error("Not found:", error);
      // handle not found error
    } else if (status >= 500) {
      console.error("Server error:", error);
      // handle server error
    }

    return Promise.reject(error);
  }
);

export default axiosConfig;
