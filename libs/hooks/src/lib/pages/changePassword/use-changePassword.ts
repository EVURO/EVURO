import { useChangePasswordMutation } from '@evuro-frontend/store';
import { validationChangePassword } from '@evuro-frontend/validators';
import { useFormik } from 'formik';

export interface useChangePasswordType {
  isError: boolean;
  isLoading: boolean;
  formik: ReturnType<typeof useFormik>;
}

export interface changePasswordResponse {
  data: any;
}

type FormikOnSubmit<Values> = (values: Values) => void | Promise<any>;

export type changePasswordForm = {
  currentPassword: string;
  password: string;
  confirmPassword?: string;
};

export type useChangePassword = {
  resolve?: (response?: changePasswordResponse) => void;
  reject?: (error: Error) => void;
};

export function useChangePassword(
  props: useChangePassword
): useChangePasswordType {
  const [changePasswordSubmit, { isLoading }] = useChangePasswordMutation();

  const handlePasswordChange: FormikOnSubmit<changePasswordForm> = async (
    values
  ) => {
    const payload = {
      oldPassword: values.currentPassword,
      newPassword: values.password,
    };
    console.log('fromik values=========', values);

    // console.log('payload===', payload);

    try {
      const response = await changePasswordSubmit(payload);
      console.log('change password in hook======', response);
      props.resolve?.(response);
    } catch (error) {
      console.error('error======', error);
      props.reject?.(error);
    }
  };

  const schema = validationChangePassword;
  const initialValues = {
    currentPassword: '',
    password: '',
    confirmPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: handlePasswordChange,
  });

  return {
    formik,
    isLoading,
    handlePasswordChange,
  };
}

export default useChangePassword;
