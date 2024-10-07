import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  age: number;
  productName: string;
  productDescription: string;
  _id: number;
  price: number;
  quantity: number;
  isChecked: boolean;
  hideIcon: boolean;
  productImage: string;
  standardDelivery: number;
  duration: string;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    addtoCart(state, action: PayloadAction<CartItem>) {
      let myIndex = -1;
      state.forEach((item, index) => {
        if (item._id === action.payload._id) {
          myIndex = index;
        }
      });

      if (myIndex === -1) {
        state.push({
          age: action.payload.age,
          productName: action.payload.productName,
          productDescription: action.payload.productDescription,
          _id: action.payload._id,
          price: action.payload.price,
          quantity: 1,
          isChecked: action.payload.isChecked,
          hideIcon: action.payload.hideIcon,
          productImage: action.payload.productImage,
          standardDelivery: action.payload.standardDelivery,
          duration: action.payload.duration,
        });
      } else {
        state[myIndex].quantity = state[myIndex].quantity + 1;
      }
    },
    removeCartItem(state, action: PayloadAction<CartItem>) {
      let myIndex = -1;
      state.forEach((item, index) => {
        if (item._id === action.payload._id) {
          myIndex = index;
        }
      });

      if (myIndex !== -1) {
        state[myIndex].quantity = state[myIndex].quantity - 1;
      }
    },
    deleteCartItem(state, action: PayloadAction<number>) {
      return (state = state.filter((item) => item._id !== action.payload));
    },

    increaseCartItemQuantity(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const itemIndex = state.findIndex((item) => item._id === itemId);

      if (itemIndex !== -1) {
        state[itemIndex].quantity += 1;
      }
    },
    decreaseCartItemQuantity(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const itemIndex = state.findIndex((item) => item._id === itemId);

      if (itemIndex !== -1) {
        state[itemIndex].quantity = Math.max(state[itemIndex].quantity - 1, 0);
      }
    },

    toggleItemCheck(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const selectedItem = state.find((item) => item._id === itemId);

      if (selectedItem) {
        selectedItem.isChecked = !selectedItem.isChecked;
      }
    },
    hideCartIcon(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const itemIndex = state.findIndex((item) => item._id === itemId);

      if (itemIndex !== -1) {
        state[itemIndex].hideIcon = true;
      }
    },
    resetCartItemQuantity: (state, action) => {
      const { _id } = action.payload;
      const itemIndex = state.findIndex((item) => item._id === _id);

      if (itemIndex !== -1) {
        state[itemIndex].quantity = 1;
      }
    },
  },
});

export const {
  addtoCart,
  removeCartItem,
  deleteCartItem,
  toggleItemCheck,
  hideCartIcon,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  resetCartItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
