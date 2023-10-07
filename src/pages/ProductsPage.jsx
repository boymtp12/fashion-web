import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PageHero, Filters, Sort, ProductList } from "../components";

const ProductsPage = () => {
  const { mainCategory } = useParams();
  //   const { fetchComments, comments } = useCommentContext();
  // useEffect(())
  return (
    <main>
      <PageHero title="Products" />
      <Wrapper className="page">
        <div className="section-center products">
          <Filters mainCategory={mainCategory} />
          <div className="">
            <Sort />
            <ProductList mainCategory={mainCategory} />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 250px 1fr;
    }
  }
`;

export default ProductsPage;
