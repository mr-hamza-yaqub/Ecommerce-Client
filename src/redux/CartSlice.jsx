import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload.attributes;
      // If found a Product then Send Current Item like Below OtherWise send the Action.payload
      const currItem = product
        ? {
            title: product.title,
            key: product.key,
            price: product.Price,
            image: product.image.data.attributes.url,
          }
        : action.payload;

      const index = state.cart.findIndex((item) => item.key === currItem.key);
      if (index === -1) {
        state.cart.push({ ...currItem, quantity: 1 });
      } else {
        state.cart[index].quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      const currKey = action.payload?.attributes?.key || action.payload.key;
      const index = state.cart.findIndex((item) => item.key === currKey);
      if (index === -1) return;
      if (state.cart[index].quantity === 1) {
        state.cart = state.cart.filter((item) => item.key !== currKey);
      } else {
        state.cart[index].quantity -= 1;
      }
    },
  },
});
export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
