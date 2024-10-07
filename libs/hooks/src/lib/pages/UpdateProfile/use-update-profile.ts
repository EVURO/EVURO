import { updateProfileSchema } from '@evuro-frontend/validators';
import { useFormik } from 'formik';
import { useUpdateUserProfleMutation } from '@evuro-frontend/store';

export interface useUpdateprofileType {
  formik: ReturnType<typeof useFormik>;
  isLoading: boolean;
}

export interface updateProfileResponse {
  data: any;
}
type FormikOnSubmit<Values> = (values: Values) => void | Promise<any>;

export type updateProfileForm = {
  name: string;
  email: string;
  latitude: string;
  longitude: string;
  address: string;
  image: object | string;
  isImageChanged: boolean;
};

export type useUpdateProfileType = {
  resolve?: (response?: updateProfileResponse) => void;
  reject?: () => void;
  data?: any;
};

export function useUpdateProfile(
  props: useUpdateProfileType
): useUpdateprofileType {
  const [UpdateProfile, { isLoading }] = useUpdateUserProfleMutation();

  const handleUpdateProfile: FormikOnSubmit<updateProfileForm> = async (
    values
  ) => {
    console.log('in hook api calling ==========');
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('latitude', values.latitude);
    formData.append('longitude', values.longitude);
    formData.append('address', values.address);
    values.isImageChanged && formData.append('image', values.image);

    try {
      const res = await UpdateProfile(formData);
      // console.log('update profile res======', res);
      props.resolve?.(res);
    } catch (error) {
      props.reject?.(error);
      console.log('update profile error=========', error);
    }
  };

  const initialValues = {
    name: '',
    email: '',
    longitude: '',
    latitude: '',
    address: '',
    image: '',
    isImageChanged: false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: updateProfileSchema,
    onSubmit: handleUpdateProfile,
  });

  return {
    formik,
    isLoading,
  };
}

export default useUpdateProfile;
