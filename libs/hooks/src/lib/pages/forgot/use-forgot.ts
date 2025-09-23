import { useForgotPasswordMutation } from '@evuro-frontend/store';
import { forgotPasswordSchema } from '@evuro-frontend/validators';
import { useFormik } from 'formik';

export interface useForgotType {
  isError: boolean;
  isLoading: boolean;
  formik: ReturnType<typeof useFormik>;
}

export interface forgotResponce {
  data: any;
}
type FormikOnSubmit<Values> = (values: Values) => void | Promise<any>;

export type forgotForm = {
  email: string;
};

export type UseForgotType = {
  resolve?: (response?: forgotResponce) => void;
  reject?: () => void;
};

export function useForgot(props: UseForgotType): useForgotType {
  const [forgotSubmit, { isLoading }] = useForgotPasswordMutation();

  const handelForgotPassword: FormikOnSubmit<forgotForm> = async (values) => {
    try {
      const res = await forgotSubmit({ email: values.email });
      props.resolve?.(res);
    } catch (error) {
      console.log('error=========', error);
      props.reject?.(error);
    }
  };

  const initialValues = {
    email: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: handelForgotPassword,
  });

  return {
    formik,
    isLoading,
  };
}

export default useForgot;
