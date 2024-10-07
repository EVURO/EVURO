import { Svgs } from '@evuro-frontend/assets';
import { Input, Text, Button } from '../../components';
import { useResetPassword } from '@evuro-frontend/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, setAlert } from '@evuro-frontend/store';
import React from 'react';

interface resetPasswordResponse {
  data: {
    status: number;
    message: string;
  };
  error?: {
    data: { message: string };
    status: number;
  };
}

export const ResetPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function resolveResetPassword(response: resetPasswordResponse) {
    if (response?.data?.status === 200) {
      dispatch(
        setAlert({
          visible: true,
          message: response?.data?.message,
          variant: 'success',
        })
      );
      resetForm();
      navigate('/login');
    } else {
      dispatch(
        setAlert({
          visible: true,
          message: response?.error?.data?.message,
          variant: 'error',
        })
      );
    }
  }

  const { formik, resetPasswordLoading } = useResetPassword({
    email: state?.email,
    resolve: resolveResetPassword,
  });
  const { getFieldProps, touched, errors, handleSubmit, resetForm } = formik;
  return (
    <div
      color="transparent"
      className="w-[100%] flex flex-col items-center justify-center "
    >
      {/* Main Card Item */}
      <div className="sm:w-[60%] md:w-[75%] lg:w-[55%] md:rounded-[20px] flex flex-col items-center justify-center">
        {/* logo section */}

        <section className="flex flex-col justify-start w-[100%] gap-10">
          <div className="w-[250px] flex flex-col self-center">
            <img src={Svgs.authDogLogo} alt="logo" />
          </div>
          <div className="flex flex-col justify-start ">
            <Text
              className={'text-[25px] font-semibold leading-[37px] text-left'}
            >
              Reset Password
            </Text>
            <Text
              className={` text-[12px] font-normal leading-[20px] text-left `}
            >
              Enter your new password down below.
            </Text>
          </div>
        </section>
        <div className="mt-7 mb-2 w-[100%] max-w-screen-lg h-[23vh] md:h-[auto] flex flex-col items-center justify-between gap-8">
          <div className=" flex flex-col items-center gap-5 ">
            <Input
              type="password"
              {...getFieldProps('password')}
              placeholder="New Password"
              className="rounded-[40px] w-[450px] h-[55px]"
              errorMessage={(touched.password && errors.password) as string}
            />
            <Input
              type="password"
              {...getFieldProps('confirmPassword')}
              placeholder="Confirm Password"
              className="rounded-[40px] w-[450px] h-[55px]"
              errorMessage={
                (touched.confirmPassword && errors.confirmPassword) as string
              }
            />
          </div>

          <section>
            <Button
              type="button"
              className="mt-6 h-[60px] text-[20px] rounded-[40px] font-normal leading-[30px]  text-buttonWhite bg-darkBlue w-[450px]"
              isLoading={resetPasswordLoading}
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
