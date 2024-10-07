import React from 'react';

import { Svgs } from '@evuro-frontend/assets';
import { Button, Text, Input } from '../../../components';
import { useChangePassword } from '@evuro-frontend/hooks';
import { setAlert, useAppDispatch } from '@evuro-frontend/store';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const { formik, isLoading, handlePasswordChange } = useChangePassword({
    resolve: handleChangePasswordResolve,
  });
  const { getFieldProps, touched, errors, resetForm, values } = formik;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleChangePasswordResolve(response: any) {
    console.log('response in page =========', response);
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
    <div className="h-full bg-euvroWhite rounded-t-lg flex flex-col items-center justify-center lg:justify-start  md:gap-5 lg:gap-0">
      {/* Image Section */}
      <section className="hidden md:flex flex-row  mt-5 ml-10  md:self-center lg:self-start w-[150px] h-[55px]">
        <img
          src={Svgs.authDogLogo}
          className="w-full h-full object-cover"
          alt="logo"
        />
      </section>
      {/* Change Password Section */}
      <section className="flex flex-col items-center justify-center space-y-[40px] w-full h-auto">
        {/* Headings */}
        <div className="text-black flex flex-col gap-2 mt-5">
          <Text className="font-medium text-[20px]">Change Password</Text>
          <Text className="font-normal text-[10px]">
            Enter your new password down below.
          </Text>
        </div>
        {/* Inputs */}
        <div className="flex flex-col items-center w-[450px] gap-[30px] mt-[2%]">
          <Input
            {...getFieldProps('currentPassword')}
            className="rounded-[40px] h-[55px] bg-euvroWhite"
            errorMessage={
              (touched.currentPassword && errors.currentPassword) as string
            }
            type="password"
            placeholder="Current Password"
          />

          <Input
            {...getFieldProps('password')}
            className="rounded-[40px] h-[55px] bg-euvroWhite"
            errorMessage={(touched.password && errors.password) as string}
            type="password"
            placeholder="New Password"
          />
          <Input
            {...getFieldProps('confirmPassword')}
            className="rounded-[40px] h-[55px] bg-euvroWhite"
            errorMessage={
              (touched.confirmPassword && errors.confirmPassword) as string
            }
            type="password"
            placeholder="Confirm Password"
          />
        </div>

        <div className="flex flex-col items-center gap-8 md:gap-14 lg:gap-12 mt-[5%] lg:mt-[2%] xl:mt-[70px] w-[340px] md:w-[370px] ">
          <Button
            className="w-[450px] rounded-[40px] h-[60px] mt-[30px] text-[20px] font-normal bg-darkBlue text-buttonWhite border-none"
            isLoading={isLoading}
            onClick={() => handlePasswordChange(values)}
          >
            Continue
          </Button>
          <Text className="text-lightGray text-[12px] md:text-[15px] font-normal">
            Powered by maximuseneca™ Group .©2023
          </Text>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;
