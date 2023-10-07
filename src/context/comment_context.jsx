import {
  COMMENT_REQUEST,
  COMMENT_REQUEST_FAIL,
  COMMENT_REQUEST_SUCCESS,
} from "../actions";
import React, { createContext, useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/comment_reducer";
import axios from "axios";
import commentApi from "../api/commentApi";
import { mockDataComments } from "../data/mockData";
const initialState = {
  comments: null,
};

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchComments = async (id) => {
    dispatch({ type: COMMENT_REQUEST });
    try {
      dispatch({ type: COMMENT_REQUEST_SUCCESS, payload: mockDataComments });
    } catch (error) {
      console.log(error);
      dispatch({ type: COMMENT_REQUEST_FAIL });
    }
  };



  return (
    <CommentContext.Provider
      value={{
        ...state,
        fetchComments,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  return useContext(CommentContext);
};
