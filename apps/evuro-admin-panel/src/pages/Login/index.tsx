import { Svgs } from '@evuro-frontend/assets';
import { Text, Button, Input } from '../../components';
import { useLogin } from '@evuro-frontend/hooks';
import { useNavigate } from 'react-router-dom';
import { setAlert, useAppDispatch } from '@evuro-frontend/store';
import React from 'react';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { formik, isLoading } = useLogin({
    resolve: handleLoginResolve,
    screen: 'LOGIN',
  });

  //Alert Toast

  const { getFieldProps, touched, errors, handleSubmit, resetForm } = formik;
  function handleLoginResolve(response: any) {
    if (response?.data?.status === 200) {
      resetForm();
      navigate('/');
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
  }

  return (
    <div className="w-[100%] flex flex-col items-center justify-center ">
      {/* Main Card Item */}
      <div className="w-[450px] md:rounded-[20px] flex flex-col items-center justify-center">
        <section className="h-[50vh] flex flex-col   justify-center gap-[70px] w-[100%] ">
          {/* logo section */}
          <div className="w-[250px]  flex flex-col self-center ">
            <img src={Svgs.authDogLogo} alt="logo" className="object-contain" />
          </div>

          {/* form section */}
          <form className=" mb-2 w-[100%] max-w-screen-lg ">
            <Text className="blue-gray mb-5 text-[25px] font-normal leading-[38px] text-left">
              Login
            </Text>
            <div className="mb-1 flex flex-col items-center gap-[30px]">
              <Input
                {...getFieldProps('email')}
                className="rounded-[40px] w-[450px] h-[55px]"
                errorMessage={(touched.email && errors.email) as string}
                placeholder="name@mail.com"
              />

              <Input
                {...getFieldProps('password')}
                className="rounded-[40px] w-[450px] h-[55px]"
                errorMessage={(touched.password && errors.password) as string}
                type="password"
                placeholder="*********"
              />
            </div>

            <Text
              className="mt-4 font-normal text-right text-[12px] text-[#196F92] leading-[18px] underline cursor-pointer"
              onClick={() => navigate('/forget_password')}
            >
              Forget Password
            </Text>

            <div className="mt-[70px] flex flex-row justify-center items-center  bg-red-500">
              <Button
                type="button"
                className="h-[60px] btn rounded-[40px]  text-[20px] text-buttonWhite bg-darkBlue font-normal leading-[30px] w-[450px] "
                isLoading={isLoading}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Login
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
