import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from '@evuro-frontend/store';
import { validOtpSchema } from '@evuro-frontend/validators';
import {
  useOTPType,
  useOtpPropsType,
  otpResponseType,
  otpForm,
  FormikOnSubmit,
} from './types';
import { useFormik } from 'formik';

export function useOTP(props: useOtpPropsType): useOTPType {
  const [OTPSubmit, { isLoading: otpLoading }] = useVerifyOtpMutation();
  const [resendOTPSubmit, { isLoading: resendOtpLoading }] =
    useResendOtpMutation();

  const handelOTP: FormikOnSubmit<otpForm> = async (values) => {
    const payload = {
      email: props?.email,
      otp: values.otp,
    };

    try {
      const res = await OTPSubmit(payload);
      props.resolve?.(res as otpResponseType);
    } catch (error) {
      props.reject?.(error);
    }
  };

  const initialValues = {
    email: props.email,
    otp: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validOtpSchema,
    onSubmit: handelOTP,
  });

  const handleChange = (newOtp: string) => {
    formik.setFieldValue('otp', newOtp);
  };

  const handelResendOTP = async () => {
    try {
      const res = await resendOTPSubmit({ email: props.email });
      props.resendSuccess?.(res);
    } catch (error) {
      console.log('error=====', error.code);
      props.reject?.(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const numericRegex = /^[0-9]*$/;

    if (!numericRegex.test(e.key)) {
      e.preventDefault();
    }
  };

  return {
    formik,
    handelResendOTP,
    handleKeyDown,
    handleChange,
    otpLoading,
    resendOtpLoading,
  };
}

export default useOTP;
