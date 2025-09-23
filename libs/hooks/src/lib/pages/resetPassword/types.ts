import { useFormik } from 'formik';

export interface useResetPasswordType {
  isError: boolean;
  resetPasswordLoading: boolean;
  formik: ReturnType<typeof useFormik>;
}

export type resetPasswordForm = {
  password: string;
  confirmPassword: string;
};

export interface resetPasswordResponse {
  data: any;
}

export type useResetType = {
  resolve?: (response?: resetPasswordResponse) => void;
  reject?: () => void;
  email?: string;
};

export type FormikOnSubmit<Values> = (values: Values) => void | Promise<any>;
