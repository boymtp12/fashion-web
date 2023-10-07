import React, { createContext, useEffect, useContext, useReducer } from "react";
import { categories_url as url } from "../utils/constants";
import reducer from "../reducers/categories_reducer";
import axios from "axios";
import {
  GET_CATEGORIES_BEGIN,
  GET_CATEGORIES_ERROR,
  GET_CATEGORIES_SUCCESS,
  GET_SINGLE_CATEGORY_BEGIN,
  GET_SINGLE_CATEGORY_ERROR,
} from "../actions";
import { mockDataCategories } from "../data/mockData";

const initialState = {
  categories: [],
};

const CategoriesContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCategories = async (url) => {
    dispatch({ type: GET_CATEGORIES_BEGIN });
    try {
      dispatch({ type: GET_CATEGORIES_SUCCESS, payload: mockDataCategories });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_CATEGORIES_ERROR });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ ...state }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => {
  return useContext(CategoriesContext);
};
