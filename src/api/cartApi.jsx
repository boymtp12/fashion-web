import React from "react";
import axiosConfig from "../utils/axiosConfig";

const cartApi = {
  get_cart: () => {
    return axiosConfig.get("/cart/get_one");
  },

  addToCart: (itemId, quantity) => {
    return axiosConfig.post(
      "/cart/insert?itemId=" + itemId + "&quantity=" + quantity
    );
  },

  updateQuantity: (itemId, quantity) => {
    return axiosConfig.put(
      "/cart/update?itemId=" + itemId + "&quantity=" + quantity
    );
  },

  deleteCartItem: (itemId) => {
    return axiosConfig.delete("/cart/delete?itemId=" + itemId);
  },

  getOrderOfUser: () => {
    return axiosConfig.get("/order/get_all");
  },

  createOrder: (cartDTOs, orderDetailDTO) => {
    return axiosConfig.post("/order/insert", {
      orderDTO: {
        status: "ordered",
      },
      cartDTOs,
      orderDetailDTO,
    });
  },
};

export default cartApi;
