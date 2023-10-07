import {
  GET_CATEGORIES_BEGIN,
  GET_CATEGORIES_SUCCESS,
  GET_SINGLE_CATEGORY_ERROR,
} from "../actions";

const categories_reducer = (state, action) => {
  switch (action.type) {
    case GET_CATEGORIES_BEGIN:
      return { ...state };
    case GET_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload };
    case GET_SINGLE_CATEGORY_ERROR:
      throw new Error(`No Matching "${action.type}" - action type`);

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};
export default categories_reducer;
