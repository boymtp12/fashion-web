import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaUserMinus,
  FaUserPlus,
  FaRegPaperPlane,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useProductsContext } from "../context/products_context";
import LogOutButton from "./LogOutButton";
import { MDBBtn } from "mdb-react-ui-kit";
import { isTokenExpired, isUserLoggedIn } from "../utils/helpers";
import { useUserContext } from "../context/user_context";
import userApi from "../api/userApi";

const CartButtons = () => {
  const { closeSidebar } = useProductsContext();
  const { result } = useUserContext();

  // const getUser = async () => {
  //   const user_info = await userApi.getUser();
  //   console.log("user_info", user_info);
  // };
  useEffect(() => {
    isUserLoggedIn();
  }, [result]);
  return (
    <Wrapper className="cart-btn-wrapper">
      <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">0</span>
        </span>
      </Link>

      <Link
        to="/login"
        className="btn"
        style={{
          color: "#fff",
          display: "block",
          padding: "10px 10px",
        }}
      >
        Log in <FaUserPlus />
      </Link>

    </Wrapper >
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  width: 300px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .user-btn {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 0 10px;
    color: var(--clr-primary-5);
    // a {
    //   color: var(--clr-primary-5);
    // }
    :hover {
      color: var(--clr-primary-1);
    }
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
export default CartButtons;
