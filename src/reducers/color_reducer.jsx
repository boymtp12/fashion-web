import {
  GET_COLORS_BEGIN,
  GET_COLORS_ERROR,
  GET_COLORS_SUCCESS,
} from "../actions";

const categories_reducer = (state, action) => {
  switch (action.type) {
    case GET_COLORS_BEGIN:
      return { ...state };
    case GET_COLORS_SUCCESS:
      return { ...state, colors: action.payload };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};
export default categories_reducer;
