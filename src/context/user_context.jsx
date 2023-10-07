import React, { useContext, useEffect, useState, useReducer } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import reducer from "../reducers/user_reducer";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_UPDATE_REQUEST,
  USER_INFO_UPDATE_SUCCESS,
  USER_INFO_UPDATE_FAIL,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../actions";
import usersApi from "../api/userApi";
import userApi from "../api/userApi";
const initLogin = {
  result: false,
  loading: false,
  error_login: false,
  error_get_user: false,
  result_update_user: null,
  user_information: [],
  result_change_password: "",
  result_register: "",
};

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initLogin);
  console.log("User context", initLogin.result);
  const login = async (email, password, setLogined) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
      const response = await usersApi.login(email, password);
      if (
        response.data.hasOwnProperty("obj") &&
        response.data.statusCode === 200
      ) {
        setLogined("Đăng nhập thành công");
        localStorage.setItem("ACCESS_TOKEN", response.data.obj.token);
        console.log("request login success", response.data);
        dispatch({ type: USER_LOGIN_SUCCESS });
        // const user_info = await usersApi.getUser();
        // console.log("user_info", user_info);
      } else {
        setLogined("Đăng nhập không thành công!");
        console.log("request login fail", response.data);
        dispatch({ type: USER_LOGIN_FAIL });
      }
      console.log("loading login", state.loading);
      console.log("result", state.result);
    } catch (error) {
      console.log(error);
      setLogined("error");
      dispatch({ type: USER_LOGIN_FAIL });
    }
  };

  const getUser = async () => {
    dispatch({ type: USER_INFO_REQUEST });
    try {
      const response = await usersApi.getUser();
      if (
        response.data.hasOwnProperty("obj") &&
        response.data.statusCode === 200
      ) {
        let user = response.data.obj;
        console.log("request info user", user);
        dispatch({ type: USER_INFO_SUCCESS, payload: user });
      }
    } catch (error) {
      console.log("Error get user", error);
      dispatch({ type: USER_INFO_ERROR });
    }
  };
  const updateUser = async (name, gender, phone, address) => {
    dispatch({ type: USER_INFO_UPDATE_REQUEST });
    try {
      const response = await userApi.updateUser(name, gender, phone, address);
      if (
        response.data.hasOwnProperty("obj") &&
        response.data.statusCode === 200
      ) {
        let user = response.data.obj;
        dispatch({ type: USER_INFO_UPDATE_SUCCESS, payload: user });
      }
    } catch (error) {
      console.log("UPDATE USER INFO " + error);
      dispatch({ type: USER_INFO_UPDATE_FAIL });
    }
  };

  const changePassword = async (oldPassword, newPassword, setResultChange) => {
    try {
      const response = await userApi.updatePassword(oldPassword, newPassword);
      if (response.status === 200 && response.data.statusCode === 200) {
        dispatch({
          type: USER_CHANGE_PASSWORD_SUCCESS,
          payload: response.data.message,
        });
        setResultChange(false);
      } else {
        dispatch({
          type: USER_CHANGE_PASSWORD_FAIL,
          payload: response.data.message,
        });
        setResultChange(false);
      }
      console.log("response update password", response);
    } catch (error) {
      console.log(error);
      dispatch({ type: USER_INFO_ERROR });
    }
  };

  const register = async (name, email, phone, password, setResultRegister) => {
    try {
      const response = await userApi.register(
        name,
        email,
        "male",
        phone,
        password,
        "USER"
      );
      if (response.status === 200 && response.data.statusCode === 200) {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: response.data.message,
        });
        setResultRegister(false);
      } else {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: response.data.message,
        });
        setResultRegister(false);
      }
      console.log("response register", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserContext.Provider
      value={{ ...state, login, getUser, updateUser, changePassword, register }}
    >
      {children}
    </UserContext.Provider>
  );
};

// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
