import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  GET_CART_ERROR,
  GET_CART_SUCCESS,
  GET_CART_BEGIN,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  TRANSFER_ORDER_SUCCESS,
  TRANSFER_ORDER_FAIL,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log(state);
    // if(state.cart)
    // if(state.cart.)
    // const { selectedItem, selectedOption, color, amount, product } =
    //   action.payload;

    // state.cart.map((cartItem) => {
    //   const {
    //     id, inventory: max
    //   } = cartItem.items.item;
    //   if(id === selectedItem.id){
    //     console.log("selectedItem.id", selectedItem.id);
    //     return cartItem;
    //   }
    // })
    // const selectedCartQuantity = state.cart.find(
    //   (cartItem) => cartItem.items.item.id === selectedItem.id
    // )?.quantity;
    // console.log("selectedCartQuantity", selectedCartQuantity);
    // if(quantity+amount > selectedItem.inventory){

    // }
    // const {}
    // console.log("action.payload", action.payload);
    // const tempItem = state.cart.find(
    //   (i) => i.id === product.id + color.name + selectedOption.optionName
    // );
    // console.log(tempItem);
    // if (tempItem) {
    //   console.log("In if tempItem");
    //   const tempCart = state.cart.map((cartItem) => {
    //     if (
    //       cartItem.id ===
    //       product.id + color.name + selectedOption.optionName
    //     ) {
    //       let newAmount = cartItem.amount + amount;
    //       if (newAmount > cartItem.max) {
    //         newAmount = cartItem.max;
    //       }
    //       return { ...cartItem, amount: newAmount };
    //     } else {
    //       return cartItem;
    //     }
    //   });
    //   return { ...state, cart: tempCart };
    // } else {
    //   const newItem = {
    //     id: product.id + color.name + selectedOption.optionName,
    //     name: product.name,
    //     color: color.name,
    //     amount,
    //     option: selectedOption.optionName,
    //     image: product.images[0].urlImage,
    //     price: selectedOption.price,
    //     max: selectedItem.inventory,
    //   };
    //   return { ...state, cart: [...state.cart, newItem] };
    // }
    case GET_CART_SUCCESS:
      let totalPrice = 0;
      state.cart.forEach((cartItem) => {
        totalPrice += cartItem.items.price * cartItem.quantity;
      });
      return {
        ...state,
        cart: action.payload,
        total_items: state.cart.length,
        total_amount: totalPrice,
      };
    case GET_CART_ERROR:
      return { ...state };
    case GET_ORDER_SUCCESS:
      return { ...state, result_order: true, order: action.payload };
    case GET_ORDER_FAIL:
      return { ...state, result_order: false };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
