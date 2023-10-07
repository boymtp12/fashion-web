import React, { useEffect, useState, useHistory } from "react";
import styled from "styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  formatPrice,
  getValuesFromItems,
  isUserLoggedIn,
} from "../utils/helpers";
import { useProductsContext } from "../context/products_context";
import {
  Loading,
  Error,
  PageHero,
  ProductImages,
  Stars,
  CommentList,
} from "../components";
import { useCommentContext } from "../context/comment_context";
import { useUserContext } from "../context/user_context";

const SingleProductPage = () => {
  const { id } = useParams();
  const history = useNavigate();
  // const back = useHistory();
  const handleGoBack = () => {
    window.history.go(-1);
  };
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();
  const { fetchComments, comments } = useCommentContext();


  useEffect(() => {
    fetchSingleProduct(id);
    // console.log(isUserLoggedIn());
  }, [id]);

  useEffect(() => {
    fetchComments(id);
  }, [id]);


  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history("/");
      }, 3000);
    }
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  // console.log("Images", images);
  console.log("comments", comments);
  console.log("PRODUCT:", product)
  return (
    <Wrapper>
      <PageHero title={product.name} product />
      <div className="section section-center page">
        <Link onClick={handleGoBack} className="btn">
          Return to product page
        </Link>
        <div className="product-center" style={{ paddingBottom: '64px' }}>
          <ProductImages images={product.image} />
          <section className="content">
            <h2>{product.name}</h2>
            <Stars stars={4.5} reviews={4.5} />
            <h5 className="price">{formatPrice(product.price)}</h5>
            <p className="desc">{product?.description}</p>
            <p className="info">
              <span>SKU : </span>
              50
            </p>
            <hr />

          </section>
        </div>
        <div style={{ padding: '32px 0', borderTop: '1px solid #ccc' }}>
          <div style={{ padding: '4px 8px', margin: "16px 0", width: '300px', borderRadius: '5px', fontWeight: '500', color: '#fff', fontSize: '19px', background: '#b77676', textTransform: 'uppercase' }}>Product Description</div>
          <div>
            Bring it back to the basics with this premium tee from the adidas Z.N.E. series — a collection inspired by the present moment. Moisture-absorbing AEROREADY and an all-cotton build ensure all-day comfort and a calm mindset. Zero negative energy? Always possible.
          </div>

          <div>
            We partner with Better Cotton to improve Cotton farming globally. Better Cotton makes global cotton production better for the people who produce it, better for the environment it grows in, and better for the sector's future.
          </div>

          <div>
            Better Cotton is sourced via a chain-of-custody model called mass balance. This means that Better Cotton is not physically traceable to end products. However, Better Cotton Farmers benefit from the demand for Better Cotton in equivalent volumes to those we "source."
          </div>
        </div>
        <CommentList />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;
export default SingleProductPage;
