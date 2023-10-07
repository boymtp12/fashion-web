import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import "./index.css";
import { CategoryProvider } from "./context/category_context";
import { ColorProvider } from "./context/color_context";
import { UserProvider } from "./context/user_context";
import { CommentProvider } from "./context/comment_context";
ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <CategoryProvider>
      <ColorProvider>
        <ProductsProvider>
          <CommentProvider>
            <FilterProvider>
                <App />
            </FilterProvider>
          </CommentProvider>
        </ProductsProvider>
      </ColorProvider>
    </CategoryProvider>
  </UserProvider>
);
