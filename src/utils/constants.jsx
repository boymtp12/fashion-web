import React from "react";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
export const links = [
  {
    id: 1,
    text: "HOME",
    url: "/",
  },
  {
    id: 2,
    text: "ABOUT",
    url: "/about",
  },
  {
    id: 3,
    text: "MEN",
    url: "/products/men",
  },
  {
    id: 4,
    text: "WOMEN",
    url: "/products/women",
  },
  {
    id: 5,
    text: "CHILDREN",
    url: "/products/children",
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "history",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
];
// export const products_url = "https://course-api.com/react-store-products";
export const products_url = "http://localhost:8080/api/v1/product/get_all";

export const categories_url = "http://localhost:8080/api/v1/category/get_all";

export const colors_url = "http://localhost:8080/api/v1/color/get_all";

export const single_category_url = `http://localhost:8080/api/v1/category/get_one?id=`;

export const single_product_url = `http://localhost:8080/api/v1/product/get_one/`;
