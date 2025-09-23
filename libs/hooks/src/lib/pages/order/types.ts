export type useOrderProps = {
  editId?: string;
  reject?: () => void;
  setEditId?: React.Dispatch<React.SetStateAction<string>>;
  filterKeyWord?: string;
  resolveEdit: (response: any) => void;
};

export type productForm = {
  productName: string;
  availability: boolean;
  price: number;
  productDescription: string;
  category: string;
  quantity: number;
  image: File | string;
};

export type FormikOnSubmit<Values> = (values: Values) => void | Promise<any>;
