import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
  FILTER_PRODUCTS_CATEGORY,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filtered_products_categories: [action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
        },
      };

    case FILTER_PRODUCTS_CATEGORY:
      if (action.payload.all_products.length > 0) {
        const filter_products = action.payload.all_products.filter(
          (product) => {
            const option_products = product.option;
            const option = option_products.filter(
              (option) =>
                option.product.category.categoryName.toLowerCase() ===
                action.payload.mainCategory
            );
            if (option.length) {
              return product;
            }
          }
        );
        let maxPrice = filter_products.map((p) => p.price);
        maxPrice = Math.max(...maxPrice);
        return {
          ...state,
          filtered_products: filter_products,
          filtered_products_categories: filter_products,
          isReloaded: true,
          filters: {
            ...state.filters,
            category: "all",
            max_price: maxPrice,
            price: maxPrice,
          },
        };
      }
      return { ...state };
    case SET_GRIDVIEW:
      return { ...state, grid_view: true };
    case SET_LISTVIEW:
      return { ...state, grid_view: false };
    case UPDATE_SORT:
      return { ...state, sort: action.payload };
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      switch (sort) {
        case "price-lowest":
          tempProducts = tempProducts.sort((a, b) => {
            if (a.price < b.price) {
              return -1;
            }
            if (a.price > b.price) {
              return 1;
            }
            return 0;
          });
          break;
        case "price-highest":
          tempProducts = tempProducts.sort((a, b) => b.price - a.price);
          break;

        case "name-a":
          tempProducts = tempProducts.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          break;

        case "name-z":
          tempProducts = tempProducts.sort((a, b) => {
            return b.name.localeCompare(a.name);
          });
          break;
      }
      return { ...state, filtered_products: tempProducts };
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    case FILTER_PRODUCTS:
      const { all_products } = state;
      const filter_products = state.filtered_products_categories;
      const {
        text,
        company,
        category,
        color,
        min_price,
        max_price,
        price,
        shipping,
      } = state.filters;

      let tempFilterProducts = [...filter_products];
      //Filtering
      if (text) {
        tempFilterProducts = tempFilterProducts.filter((product) => {
          return product.name.toLowerCase().includes(text.toLowerCase());
        });
      }
      if (category !== "all") {
        tempFilterProducts = tempFilterProducts.filter((product) => {
          const option_products = product.option;
          const option = option_products.filter(
            (option) => option.product.subcategory.categoryName === category
          );
          if (option.length) {
            return product;
          }
        });
      }
      if (company !== "all") {
        tempFilterProducts = tempFilterProducts.filter((product) => {
          return product.company === company;
        });
      }
      // colors
      if (color !== "all") {
        tempFilterProducts = tempFilterProducts.filter((product) => {
          return product.colors.find((c) => c.name === color);
        });
      }
      if (shipping) {
        tempFilterProducts = tempFilterProducts.filter(
          (product) => product.shipping === true
        );
      }
      tempFilterProducts = tempFilterProducts.filter((product) => {
        return product.price <= price;
      });
      return { ...state, filtered_products: tempFilterProducts };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
