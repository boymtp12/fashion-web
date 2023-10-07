import {
  COMMENT_REQUEST,
  COMMENT_REQUEST_SUCCESS,
  COMMENT_REQUEST_FAIL,
} from "../actions";

const comment_reducer = (state, action) => {
  switch (action.type) {
    case COMMENT_REQUEST:
      return { ...state };
    case COMMENT_REQUEST_SUCCESS:
      console.log("comments: ", action.payload);
      return { ...state, comments: action.payload.objList };
    case COMMENT_REQUEST_FAIL:
      return { ...state };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};
export default comment_reducer;
