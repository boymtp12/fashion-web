import React from "react";
import axiosConfig from "../utils/axiosConfig";

const commentApi = {
  get_comments_by_productId: (id) => {
    return axiosConfig.get("/comment/get_all/ofProduct/" + id);
  },

  insert_comment: (content, productId) => {
    return axiosConfig.post("/comment/insert", {
      content,
      productId,
    });
  },

  insert_subComment: (content, commentId) => {
    return axiosConfig.post("/subcomment/insert", {
      content,
      commentId,
    });
  },

  delete_comment: (commentId) => {
    return axiosConfig.delete("/comment/delete/" + commentId);
  },
};

export default commentApi;
