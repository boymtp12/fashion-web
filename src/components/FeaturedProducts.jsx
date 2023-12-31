import React from "react";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";
import Error from "./Error";
import Product from "./Product";
import { mockDataFeatured } from "../data/mockData"; 
const FeaturedProducts = () => {
  const {
    products_loading: loading,
    products_error: error,
    featured_products: featured,
  } = useProductsContext();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  console.log(featured);
  return (
    <Wrapper className="section">
      <div className="title">
        <h2>Outstanding products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {mockDataFeatured.slice(0, 3).map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
