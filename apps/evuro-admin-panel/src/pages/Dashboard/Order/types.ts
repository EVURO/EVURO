export type OrderDetails = {
  productName: string;
  productImage: string;
  quantity: number;
  price: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  // ... other properties
};

export type filterOrderResponseType = {
  orderDetails: OrderDetails[];
  user: User;
  orderTime: string; // Consider using Date type if possible
  orderPrice: string;
  orderStatus: string;
  _id: string;
};
