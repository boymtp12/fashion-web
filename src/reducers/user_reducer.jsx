import React from "react";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  USER_INFO_UPDATE_REQUEST,
  USER_INFO_UPDATE_FAIL,
  USER_INFO_UPDATE_SUCCESS,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../actions";
const user_reducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, result: true, logined: true };
    case USER_LOGIN_FAIL:
      console.log("USER_LOGIN_FAIL");
      return {
        ...state,
        error_login: true,
        loading: false,
        result: false,
      };
    case USER_INFO_REQUEST:
      return { ...state };
    case USER_INFO_SUCCESS:
      return { ...state, user_information: action.payload };
    case USER_INFO_FAIL:
      return { ...state, error_get_user: true };
    case USER_INFO_UPDATE_REQUEST:
      return { ...state };
    case USER_CHANGE_PASSWORD_SUCCESS:
      return { ...state, result_change_password: action.payload };
    case USER_CHANGE_PASSWORD_FAIL:
      return { ...state, result_change_password: action.payload };
    case USER_INFO_UPDATE_SUCCESS:
      return {
        ...state,
        result_update_user: true,
        user_information: action.payload,
      };
    case USER_INFO_UPDATE_FAIL:
      return { ...state, result_update_user: false };
    case USER_REGISTER_REQUEST:
      return { ...state };
    case USER_REGISTER_SUCCESS:
      return { ...state, result_register: action.payload };
    case USER_REGISTER_FAIL:
      return { ...state, result_register: action.payload };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default user_reducer;
