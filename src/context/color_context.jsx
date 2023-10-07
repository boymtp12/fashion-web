import React, { createContext, useEffect, useContext, useReducer } from "react";
import { colors_url as url } from "../utils/constants";
import reducer from "../reducers/color_reducer";
import axios from "axios";

import {
  GET_COLORS_BEGIN,
  GET_COLORS_ERROR,
  GET_COLORS_SUCCESS,
} from "../actions";
import { mockDataColors } from "../data/mockData";

const initialState = {
  colors: [],
};

const ColorsContext = createContext();

export const ColorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchColors = async () => {
    dispatch({ type: GET_COLORS_BEGIN });
    try {
      dispatch({ type: GET_COLORS_SUCCESS, payload: mockDataColors });
    } catch (error) {
      dispatch({ type: GET_COLORS_ERROR });
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <ColorsContext.Provider value={{ ...state }}>
      {children}
    </ColorsContext.Provider>
  );
};
export const useColorsContext = () => {
  return useContext(ColorsContext);
};
