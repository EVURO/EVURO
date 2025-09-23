import { FormikHelpers, useFormik } from 'formik';

export type forgetForm = {
  email: string;
};
export type resetForm = {
  password: string;
};
export type changePassword = {
  currentPassword: string;
  password: string;
};
export interface UseLogin {
  isError: boolean;
  email: string;
  resetPasswordLoading: boolean;
  password: string;
  confirmPassword: string;
  setEmail: (arg: string) => void;
  setPassword: (arg: string) => void;
  setConfirmPassword: (arg: string) => void;
  handleLogin: () => void;
  handleForgotPassword: (response: forgetForm) => void;
  handleChangePassword: (password: string, confirmPassword: string) => void;
  handelRestPassword: (email: string, password: string) => void;
  forgotLoading: boolean;
  forgetPasswordResponse: string;
  changePasswordLoading: boolean;
  formik: ReturnType<typeof useFormik>;
  isLoading: boolean;
}

export type FormikOnSubmit<Values> = (
  values: Values,
  formikHelpers: FormikHelpers<Values>
) => void | Promise<any>;

export type LoginForm = {
  email: string;
  password: string;
};

export interface LoginResponse {
  data: any;
}
export interface handelRestPassword {
  data?: {
    status: number;
  };
  error?: {
    data: {
      message: string;
    };
  };
}

export interface handleForgotResponse {
  data: {
    message: string;
    status: number;
  };
  error?: {
    data: {
      message: string;
    };
  };
}

export type useLoginType = {
  screen?: string;
  resolve?: (
    response?: loginResponse | forgetForm | handleForgotResponse | any
  ) => void;
  reject?: (error: any) => void;
  data?: { email?: string };
};

export interface loginResponse {
  data: {
    access_token: string;
    data: {
      createdAt: string;
      email: string;
      emailVerified: boolean;
      id: number;
      otp: number;
      otpExpiry: string;
      password: string;
      phoneNo: string;
      phoneNoVerified: boolean;
      receivingCountry: string;
      referBy: string;
      referralCode: string;
      sendingCountry: string;
      updatedAt: string;
      userType: string;
    };
    refresh_token: string;
    status: number;
  };
}
