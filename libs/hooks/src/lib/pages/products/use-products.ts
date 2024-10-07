import {
  useProductPropsTypes,
  FormikOnSubmit,
  productForm,
  payloadType,
} from './types';
import { addAdminProductSchema } from '@evuro-frontend/validators';
import {
  useGetAdminProductsQuery,
  useDeleteAdminProductMutation,
  useAddAdminProductMutation,
  useEditAdminProductMutation,
  useProductRevenueQuery,
} from '@evuro-frontend/store';
import { useFormik } from 'formik';

export function useProduct(props: useProductPropsTypes) {
  const {
    data: getProductsData,
    isLoading: getProductLoading,
    refetch: getProductRefetch,
  } = useGetAdminProductsQuery('');

  // console.log('payload in custom hook ', props?.payload);

  const {
    data: getProductsByDateData,
    isLoading: getProductsByDateLoading,
    refetch: getProductsByDateRefetch,
  } = useProductRevenueQuery(props?.payload);

  // console.log('useproducts custom hook', useProductRevenueQuery());

  const [addProduct, { isLoading: addProductLoading }] =
    useAddAdminProductMutation();

  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteAdminProductMutation();

  const [editProduct, { isLoading: editProductLoading }] =
    useEditAdminProductMutation();

  const handleAddProduct: FormikOnSubmit<productForm> = async (values) => {
    console.log('===========formik values========', values);
    const formData = new FormData();
    formData.append('productName', values.productName);
    formData.append('standardDelivery', values.standardDelivery.toString());
    formData.append('duration', values.duration.toString());
    formData.append('availability', values.availability.toString());
    formData.append('price', values.price.toString());
    formData.append('productDescription', values.productDescription);
    formData.append('quantity', values.quantity.toString());

    // Check if values.image is a File object
    if (values.image instanceof File) {
      // formData.append('image', values?.image as Blob),
      formData.append('image', values.image);
    }

    try {
      const res = await addProduct(formData);
      props.resolve?.(res);
    } catch (error) {
      console.log('error=====', error.code);
      props.reject?.(error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await deleteProduct(id);
      // console.log('id in delete', id);
      props.setEditId?.(id as string);
      props?.deleteResolve?.(response);
    } catch (error) {
      props.reject?.(error);
    }
  };

  const handleEditProduct: FormikOnSubmit<productForm> = async (values) => {
    console.log('====values====', values);
    const formData = new FormData();
    formData.append('productName', values.productName);
    formData.append('availability', values.availability.toString());
    formData.append('price', values.price.toString());
    formData.append('standardDelivery', values.standardDelivery.toString());
    formData.append('duration', values.duration.toString());
    formData.append('productDescription', values.productDescription);
    formData.append('quantity', values.quantity.toString());
    if (values.image instanceof File) {
      // formData.append('image', values?.image as Blob),
      formData.append('image', values.image);
    }

    try {
      const response = await editProduct({ formData, id: props?.editId });
      props?.resolve?.(response);
    } catch (error) {
      props?.reject?.(error);
    }
  };

  const handleGetProductsByDate = async (payload: payloadType) => {
    console.log('payload revenue in hooks=======', payload);

    // try {
    //   const response = await useGetProductsByDateQuery(payload);

    //   console.log('getProductsByDate in hook=======', response);
    //   props?.getProductsDateResolve?.(response);
    // } catch (error) {
    //   props.reject?.(error);
    // }
  };

  const initialValues = {
    productName: '',
    availability: false,
    price: null,
    standardDelivery: null,
    duration: 0,
    productDescription: '',
    quantity: 1,
    image: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: addAdminProductSchema,
    onSubmit: props?.editId ? handleEditProduct : handleAddProduct,
  });

  // const { errors } = formik;
  // console.log('error=========', errors);

  return {
    formik,
    addProduct,
    getProductsData,
    getProductRefetch,
    getProductLoading,
    addProductLoading,
    editProductLoading,
    handleDeleteProduct,
    handleEditProduct,
    deleteProductLoading,
    getProductsByDateData,
    getProductsByDateLoading,
    getProductsByDateRefetch,
  };
}
