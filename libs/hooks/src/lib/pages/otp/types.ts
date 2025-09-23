import { useFormik } from 'formik';

export interface useOTPType {
  formik: ReturnType<typeof useFormik>;
  handelResendOTP: () => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleChange: (newOtp: string) => void;
  otpLoading: boolean;
  resendOtpLoading: boolean;
}

export interface otpResponseType {
  data: { status: number; message: string };
}

export type otpForm = {
  otp: string;
};

export type useOtpPropsType = {
  resolve?: (response?: otpResponseType) => void;
  reject?: () => void;
  resendSuccess?: (response: any) => void;
  email?: string;
};

export type FormikOnSubmit<Values> = (values: Values) => void | Promise<any>;
