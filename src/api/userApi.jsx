import axiosConfig from "../utils/axiosConfig";

const userApi = {
  login: (email, password) => {
    return axiosConfig.post("/login", {
      email,
      password,
    });
  },

  getUser: () => {
    return axiosConfig.get("/user/get_one/info-user");
  },
  updateUser: (name, gender, phone, address) => {
    return axiosConfig.put("/user/update", {
      name,
      gender,
      phone,
      address,
    });
  },

  updatePassword: (oldPassword, newPassword) => {
    return axiosConfig.put("/user/update/changepassword", {
      oldPassword,
      newPassword,
    });
  },

  register: (name, email, gender, phone, password, role) => {
    return axiosConfig.post("/register", {
      name,
      email,
      gender,
      phone,
      password,
      role,
    });
  },
};

export default userApi;
