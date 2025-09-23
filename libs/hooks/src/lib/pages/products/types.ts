export type payloadType = {
  fromDate: string;
  toDate: string;
  productId: string;
};

export type useProductPropsTypes = {
  editId?: string;
  resolve?: (response?: any) => void;
  deleteResolve?: (response?: any) => void;
  reject?: () => void;
  payload: payloadType;
  setEditId?: React.Dispatch<React.SetStateAction<string>>;
  getProductsDateResolve?: (response?: any) => void;
};

export type productForm = {
  productName: string;
  availability: boolean;
  price: number;
  standardDelivery: number;
  duration: number;
  productDescription: string;
  quantity: number;
  image: File | string;
};

export type FormikOnSubmit<Values> = (values: Values) => void | Promise<any>;
