import { Svgs } from '@evuro-frontend/assets';
import { Input, Text, Button } from '../../components';
import { useForgot } from '@evuro-frontend/hooks';
import { useNavigate } from 'react-router-dom';
import { setAlert, useAppDispatch } from '@evuro-frontend/store';
import React from 'react';

export const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { formik, isLoading } = useForgot({
    resolve: handleForgetPasswordResolve,
  });

  const { resetForm, getFieldProps, touched, values, errors, handleSubmit } =
    formik;

  function handleForgetPasswordResolve(response: any) {
    try {
      if (response?.data?.status === 200) {
        resetForm();
        navigate('/otp-verification', { state: { email: values.email } });
        dispatch(
          setAlert({
            visible: true,
            message: response?.data?.message,
            variant: 'success',
          })
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          visible: true,
          message: response?.error?.data?.message,
          variant: 'error',
        })
      );
    }
  }
  return (
    <div
      color="transparent"
      className="w-[100%] flex flex-col items-center justify-center"
    >
      {/* Main Card Item */}
      <div className="sm:w-[60%] md:w-[75%] lg:w-[55%] md:rounded-[20px]  flex flex-col items-center justify-center ">
        <section className="flex flex-col justify-center gap-2">
          {/* logo section */}
          <div className="w-[250px] flex flex-col self-center">
            <img src={Svgs.authDogLogo} alt="logo" />
          </div>

          <Text className=" text-[25px] font-semibold leading-[37px] text-left w-[90%] mt-14">
            Forget Your Password
          </Text>
          <Text
            className={` text-[12px] font-normal leading-[20px] text-left w-[90%]`}
          >
            Enter your email address and we’ll send you an email with all the
            instructions.
          </Text>
        </section>

        <form className="mt-5 mb-2 w-[100%] max-w-screen-lg flex flex-col items-center self-start gap-16">
          <div className="mb-1 flex flex-col ">
            <Input
              {...getFieldProps('email')}
              placeholder="name@mail.com"
              className="rounded-[40px] h-[55px] w-[450px]"
              errorMessage={(touched.email && errors.email) as string}
            />
          </div>

          <section>
            <Button
              type="button"
              className="h-[60px] btn rounded-[40px] text-[20px] text-buttonWhite bg-darkBlue font-normal leading-[30px] w-[450px]"
              isLoading={isLoading}
              onClick={() => {
                handleSubmit();
              }}
            >
              Continue
            </Button>
          </section>
        </form>
      </div>
    </div>
  );
};
