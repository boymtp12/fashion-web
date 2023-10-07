import React from "react";
import axiosConfig from "../utils/axiosConfig";

const productApi = {
  get_all: () => {
    return axiosConfig.get("/product/get_all");
  },
};

export default productApi;
