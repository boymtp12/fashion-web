import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CartPage = () => {
 
  return (
    <Wrapper className="page-100">
      <div className="empty">
        <h2>Oop! Có vẻ giỏ hàng của bạn đang trống.</h2>
        <Link to="/products/men" className="btn">
          Làm đầy nó thôi!
        </Link>
      </div>
    </Wrapper>
  );

};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
