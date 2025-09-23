import { useResetPasswordMutation } from '@evuro-frontend/store';
import {
  useResetPasswordType,
  FormikOnSubmit,
  resetPasswordForm,
  useResetType,
  resetPasswordResponse,
} from './types';
import { validationResetPassword } from '@evuro-frontend/validators';
import { useFormik } from 'formik';

export function useResetPassword(props: useResetType): useResetPasswordType {
  const [resetPasswordSubmit, { isLoading: resetPasswordLoading }] =
    useResetPasswordMutation();

  const handelResetPassword: FormikOnSubmit<resetPasswordForm> = async (
    values
  ) => {
    const payload = {
      email: props.email,
      newPassword: values.confirmPassword,
    };

    // console.log('payload====', payload);

    try {
      const res = await resetPasswordSubmit(payload);
      props.resolve?.(res as resetPasswordResponse);
    } catch (error) {
      console.log('error======', error);
      props.reject?.(error);
    }
  };

  const schema = validationResetPassword;
  const initialValues = {
    email: props.email,
    password: '',
    confirmPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: handelResetPassword,
  });

  return {
    formik,
    resetPasswordLoading,
  };
}

export default useResetPassword;
