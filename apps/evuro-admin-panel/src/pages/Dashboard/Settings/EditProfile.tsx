import React, { useEffect, useRef, ChangeEvent } from 'react';
import { CiEdit } from 'react-icons/ci';
import { Svgs } from '@evuro-frontend/assets';
import { Button, Text, Input, Image, FileInput } from '../../../components';
import { useAdminUpdateProfile } from '@evuro-frontend/hooks';
import {
  setAlert,
  setLoginData,
  useAppDispatch,
  useAppSelector,
} from '@evuro-frontend/store';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { formik, updateProfileLoading } = useAdminUpdateProfile({
    resolve: handleEditProfileResolve,
  });

  // console.log('updateProfileLoading========== ', updateProfileLoading);
  const {
    getFieldProps,
    touched,
    errors,
    resetForm,
    handleSubmit,
    setValues,
    setFieldValue,
    setTouched,
    values,
  } = formik;
  const loginUser = useAppSelector((state) => state.user.loginData);
  // console.log('formik values=========', values);
  // console.log('login user state =========', loginUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const imageRef = useRef(null);

  function handleEditProfileResolve(response: any) {
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
      dispatch(setLoginData(response?.data));
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

  const handleImageClick = () => {
    imageRef?.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileObject = event.target.files?.[0];

    // console.log('image file object======', fileObject);
    setFieldValue('image', fileObject as File);
  };

  useEffect(() => {
    setValues({
      ...setValues,
      name: loginUser?.data?.name,
      email: loginUser?.data?.email,
      image: loginUser?.data?.profileImage,
    });
  }, [loginUser]);

  return (
    <div className="h-full bg-euvroWhite rounded-t-lg flex flex-col items-center justify-center lg:justify-start  md:gap-5 lg:gap-0">
      {/* Image Section */}
      <section className="hidden md:flex flex-row  mt-5 ml-10 self-start l w-[150px] h-[55px]">
        <img
          src={Svgs.authDogLogo}
          className="w-full h-full object-cover"
          alt="logo"
        />
      </section>
      {/* Change Password Section */}
      <section className="flex flex-col items-center justify-center gap-5 w-full h-auto">
        <div className="flex flex-col w-[450px] gap-[20px] mt-[2%]">
          {/* Profile Image */}
          <div className="w-[100px] h-[100px] rounded-full relative flex flex-col justify-center self-center items-center">
            <div className="relative flex flex-col justify-center items-center shadow-paginationShadow bg-euvroWhite h-[160px] w-[100px] rounded-full  z-10">
              <Image
                url={
                  values.image instanceof File
                    ? URL.createObjectURL(values.image)
                    : values.image
                }
                className="object-cover h-full w-full rounded-full"
              />
              <div className="cursor-pointer flex flex-col items-center justify-center absolute h-[25px] w-[25px] object-cover top-[70px] text-euvroWhite bg-darkBlue left-[69px] rounded-full z-10 ">
                <CiEdit onClick={handleImageClick} size={17} />
              </div>
            </div>
            {/* Hidden File Input */}
            <FileInput
              name="image"
              className="rounded-[5px] bg-red"
              inputRef={imageRef}
              errorMessage={(touched.image && errors.image) as string}
              style={{ display: 'none' }}
              accept=".jpg, .jpeg, .png,"
              onClick={() => setTouched({ ...touched, image: true })}
              onChange={handleImageChange}
              myPlaceholder={false}
            />
          </div>
          {/* Headings */}
          <Text className="text-black px-2 font-medium text-[20px]">
            Edit Profile
          </Text>
          {/* Inputs */}
          <div className="flex flex-col items-center space-y-[30px]">
            <Input
              {...getFieldProps('name')}
              className="rounded-[40px] h-[55px] bg-euvroWhite"
              errorMessage={(touched.name && errors.name) as string}
              placeholder="Johan"
            />

            <Input
              {...getFieldProps('email')}
              className="rounded-[40px] h-[55px] bg-euvroWhite mt-[10px]"
              errorMessage={(touched.email && errors.email) as string}
              placeholder="email@gmail.com"
              readOnly
            />
          </div>
        </div>
      </section>
      <div className="flex flex-col items-center space-y-[30px] md:gap-10  lg:gap-4 mt-[45px] lg:mt-[50px] xl:mt-[60px] w-[340px] md:w-[370px] ">
        <Button
          type="button"
          className="w-[450px] rounded-[40px] h-[60px] text-[20px] bg-darkBlue font-normal text-buttonWhite border-none"
          isLoading={updateProfileLoading}
          onClick={handleSubmit}
        >
          Update
        </Button>
        <Text className="text-lightGray text-[12px] md:text-[15px]  font-normal">
          Powered by maximuseneca™ Group .©2023
        </Text>
      </div>
    </div>
  );
};

export default EditProfile;
