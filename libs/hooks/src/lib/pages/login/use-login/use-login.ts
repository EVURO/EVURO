import { UseLogin, useLoginType, FormikOnSubmit, LoginForm } from './types';
import { useFormik } from 'formik';
import { loginSchema } from '@evuro-frontend/validators';
import { useLoginMutation, useLogoutUserMutation } from '@evuro-frontend/store';
import { useAppDispatch } from '@evuro-frontend/store';
import { setLoginData, setToken } from '@evuro-frontend/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useLogin(props: useLoginType): UseLogin {
  const dispatch = useAppDispatch();
  const [loginSubmit, { isLoading }] = useLoginMutation();
  const [logout, { isLoading: logoutLoading }] = useLogoutUserMutation();

  const handleLogin: FormikOnSubmit<LoginForm> = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
      socialId: '',
      socialSite: '',
      loginType: 'email',
    };

    // console.log('payload====', payload);

    try {
      const res = await loginSubmit(payload);
      // console.log('res====', res);

      props.resolve?.(res);

      console.log('=====payload:', payload);

      if (res?.data) {
        // console.log(res?.data);
        // console.log('saving token---------------------------');
        await AsyncStorage.setItem('isAuth', res?.data?.accessToken);
        dispatch(setToken(res?.data?.accessToken));
        dispatch(setLoginData(res?.data));
      }
    } catch (error) {
      console.log('error=====', error);
    }
  };

  const handleLogout = async () => {
    // console.log('in logout hook function=======');
    try {
      const response = await logout();

      // console.log('response========', response);

      await AsyncStorage.removeItem('isAuth');
      dispatch(setLoginData(null));
      dispatch(setToken(''));
      props?.resolve?.(response);
    } catch (error) {
      console.log('error=========', error);
    }
  };

  const initialValues = {
    email: '',
    password: '',
    socialId: '',
    socialSite: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  });

  return {
    formik,
    isLoading,
    logoutLoading,
    handleLogin,
    handleLogout,
  };
}

export default useLogin;
