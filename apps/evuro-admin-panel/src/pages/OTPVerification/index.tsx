import { Svgs } from '@evuro-frontend/assets';
import { Text, Button } from '../../components';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOTP } from '@evuro-frontend/hooks';
import { setAlert, useAppDispatch } from '@evuro-frontend/store';
import React, { useState, useEffect } from 'react';

export interface otpResponseType {
  data: { status: number; message: string };
  error?: {
    data: { message: string };
    status: number;
  };
}

export interface resendOtpResponseType {
  data: {
    status: number;
    message: string;
  };
  error?: {
    data: { message: string };
    status: number;
  };
}

export const OTPVerification = (
  response: otpResponseType | resendOtpResponseType
) => {
  const { state } = useLocation();
  const [sec, setSec] = useState(30);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOTP = (response: otpResponseType) => {
    console.log(response);
    if (response?.data?.status === 200) {
      dispatch(
        setAlert({
          visible: true,
          message: response?.data?.message,
          variant: 'success',
        })
      );
      resetForm();
      navigate('/reset_password', {
        state: { email: state?.email },
      });
    } else {
      dispatch(
        setAlert({
          visible: true,
          message: response?.error?.data?.message,
          variant: 'error',
        })
      );
    }
  };

  const resendSuccess = (response: resendOtpResponseType) => {
    if (response?.data?.status === 200) {
      setSec(29);
      dispatch(
        setAlert({
          visible: true,
          message: response?.data?.message,
          variant: 'success',
        })
      );
    } else {
      dispatch(
        setAlert({
          visible: true,
          message: response?.error?.data?.message,
          variant: 'error',
        })
      );
    }
  };

  const { formik, handleChange, handleKeyDown, otpLoading, handelResendOTP } =
    useOTP({
      email: state?.email,
      resolve: handleOTP,
      resendSuccess,
    });
  const { values, resetForm, handleSubmit } = formik;

  const ontime = () => {
    setTimeout(() => {
      if (sec < 1) {
        setSec(0);
      } else {
        setSec(sec - 1);
      }
    }, 1000);
  };
  useEffect(() => {
    ontime();
  }, [sec]);

  return (
    <div
      color="transparent"
      className="w-[100%] flex flex-col items-center justify-center"
    >
      {/* Main Card Item */}

      <div className="sm:w-[60%] md:w-[75%] lg:w-[55%] flex flex-col items-center justify-center gap-16">
        <section className="flex flex-col self-start justify-center w-[100%] ">
          {/* logo section */}
          <div className="w-[250px] flex flex-col self-center ">
            <img src={Svgs.authDogLogo} alt="logo" />
          </div>
        </section>

        <div className="w-[450px] max-w-screen-lg  flex flex-col justify-between md:justify-center mt-3.5">
          <div className="mb-1 flex flex-col items-center justify-between gap-1">
            <div className="flex flex-col items-start w-[350px]">
              <Text
                className={
                  'text-[25px] mt-3 font-bold leading-[37px] text-start w-fit'
                }
              >
                Verification Code
              </Text>
              <Text className={`text-[12px] font-normal leading-[20px]`}>
                {`OTP sent to ${state?.email || 'xxxxxxxxxx'} `}
              </Text>
            </div>

            <div className="w-[350px]">
              <OtpInput
                value={values.otp}
                onChange={handleChange}
                numInputs={4}
                inputStyle={{
                  width: '50px',
                  height: '50px',
                  border: '1px solid #959595',
                  borderRadius: '10px',
                  padding: '10px',
                  margin: '30px 10% 10px 0',
                }}
                placeholder="----"
                renderInput={(props, index) => <input {...props} />}
              />
            </div>
            {/* Resend Link */}

            <div className="flex flex-row justify-center ml-24 sm:ml-5 w-[90%] items-center gap-1">
              <Text
                className={`text-[11px] text-right md:text-[14px] font-normal leading-[20px] text-otpGrayText`}
              >
                Didn’t receive the OTP?{' '}
              </Text>
              {sec > 0 ? (
                <Text
                  className={`cursor-pointer text-[11px] md:text-[14px] font-semibold text-darkBlue }`}
                >
                  {`00 : ${sec < 10 ? '0' : ''}${sec} sec`}
                </Text>
              ) : (
                <Text
                  className={`cursor-pointer bg-none text-[11px] md:text-[14px] font-semibold text-darkBlue ${
                    sec > 0 ? 'btn-disabled' : 'btn-link'
                  }`}
                  onClick={handelResendOTP}
                >
                  Resend OTP
                </Text>
              )}
            </div>
          </div>

          <section>
            <Button
              type="button"
              className={`h-[60px] btn rounded-[40px] mt-16 text-[20px] text-buttonWhite bg-darkBlue font-normal leading-[30px] w-full ${
                values.otp.length < 4 ? 'btn-disabled' : 'btn-active'
              }`}
              isLoading={otpLoading}
              onClick={() => handleSubmit()}
            >
              Continue
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};
