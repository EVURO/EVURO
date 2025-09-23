import { signUpSchema } from '@evuro-frontend/validators';
import { useFormik } from 'formik';
import {
  setLoginData,
  setToken,
  useAppSelector,
  useSignUPMutation,
} from '@evuro-frontend/store';
import { useAppDispatch } from '@evuro-frontend/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export interface useSignupType {
  formik: ReturnType<typeof useFormik>;
}

export interface signUpResponce {
  data: any;
}
type FormikOnSubmit<Values> = (values: Values) => void | Promise<any>;

export type SignUpForm = {
  image: string;
  fullName: string;
  email: string;
  password: string;
  location: string;
  userType: string;
};

export type useSignUpType = {
  resolve?: (response?: signUpResponce) => void;
  reject?: () => void;
  userType: string;
};

export function useSignup(props: useSignUpType): useSignupType {
  const dispatch = useAppDispatch();
  const [signUpHandle, { isLoading }] = useSignUPMutation();

  // console.log('props=======', props.googleData);

  const handelSignUp: FormikOnSubmit<SignUpForm> = async (values) => {
    // console.log('values====', values?.image);

    const imageName = {
      uri: values?.image,
      name: `UserImage-${Date.now()}.jpg`,
      type: 'image/jpeg',
    };

    const formData = new FormData();
    formData.append('name', values.fullName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('userType', props.userType);
    formData.append('image', imageName);
    formData.append('latitude', values.location?.latitude);
    formData.append('longitude', values.location?.longitude);
    formData.append('address', values.location?.address);
    formData.append('socialId', '');
    formData.append('socialSite', '');
    formData.append('loginType', 'email');

    // console.log('formData================', formData._parts[4]);

    try {
      const res = await signUpHandle(formData);
      console.log('res===', res);
      props.resolve?.(res);
      await AsyncStorage.setItem('isAuth', res?.data?.accessToken);
      dispatch(setToken(res?.data?.accessToken));
      dispatch(setLoginData(res?.data));
    } catch (error) {
      props.reject?.(error);
      console.log('error=========', error);
    }
  };

  const initialValues = {
    image: '',
    fullName: '',
    email: '',
    password: '',
    // userType: '',
    location: {
      latitude: 0,
      longitude: 0,
    },
    userType: props.userType,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: handelSignUp,
  });

  return {
    formik,
    isLoading,
  };
}

export default useSignup;
