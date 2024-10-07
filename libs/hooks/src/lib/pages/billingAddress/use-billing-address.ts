import { useFormik } from 'formik';
import { validBillingAddressSchema } from '@evuro-frontend/validators';
import { useAddBillingAddressMutation } from '@evuro-frontend/store';

export interface useAddBillingAddressType {
  formik: ReturnType<typeof useFormik>;
}

export interface addBillingAddressResponseType {
  data: unknown;
}
type FormikOnSubmit<Values> = (values: Values) => void | Promise<unknown>;

export type BillingAddressForm = {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  mobileNo: string;
  state: string;
  zipCode: string;
  // isSavable: boolean;
};

export type UseAddBillingAddressType = {
  resolve?: (response?: addBillingAddressResponseType) => void;
  reject?: () => void;
};

export function useBillingAddress(
  props: UseAddBillingAddressType
): useAddBillingAddressType {
  const [AddBillingAddress, { isLoading }] = useAddBillingAddressMutation();

  const handleAddBillingAddress: FormikOnSubmit<BillingAddressForm> = async (
    values
  ) => {
    const payload = {
      name: values.fullName,
      billingAddress: values.address1,
      deliveryAddress: values.address2,
      city: values.city,
      mobileNumber: values.mobileNo,
      state: values.state,
      zipCode: values.zipCode,
    };

    // console.log('payload=====', payload);

    try {
      const res = await AddBillingAddress(payload);
      // console.log('res===', res);
      props?.resolve?.(res?.data);
    } catch (error) {
      console.log('error====', error);
    }
  };

  const initialValues = {
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    mobileNo: '',
    state: '',
    zipCode: '',
    // isSavable: false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validBillingAddressSchema,
    onSubmit: handleAddBillingAddress,
  });

  return {
    formik,
    isLoading,
  };
}

export default useBillingAddress;
