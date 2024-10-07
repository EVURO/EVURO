import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderItem {
  age: number;
  productName: string;
  _id: number;
  price: number;
  quantity: number;
  isChecked: boolean;
  hideIcon: boolean;
  productImage: string;
  standardDelivery: number;
  receivedBy: string;
}

interface OrderState {
  orders: OrderItem[];
}

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
  } as OrderState,
  reducers: {
    placeOrder(state, action: PayloadAction<OrderItem[]>) {
      state.orders = [...state.orders, ...action.payload];
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const { placeOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
