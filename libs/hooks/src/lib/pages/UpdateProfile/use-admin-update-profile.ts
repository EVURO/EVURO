import { updateAdminProfileSchema } from '@evuro-frontend/validators';
import { useFormik } from 'formik';
import { useUpdateUserProfleMutation } from '@evuro-frontend/store';

export interface useAdminUpdateProfileType {
  formik: ReturnType<typeof useFormik>;
  updateProfileLoading: boolean;
}

export interface updateAdminProfileResponse {
  data: any;
}
type FormikOnSubmit<Values> = (values: Values) => void | Promise<any>;

export type updateAdminProfileForm = {
  name: string;
  image: object | string;
};

export type useUpdateAdminProfileProps = {
  resolve?: (response?: updateAdminProfileResponse) => void;
  reject?: () => void;
  data?: any;
};

export function useAdminUpdateProfile(
  props: useUpdateAdminProfileProps
): useAdminUpdateProfileType {
  const [UpdateProfile, { isLoading: updateProfileLoading }] =
    useUpdateUserProfleMutation();

  const handleAdminUpdateProfile: FormikOnSubmit<
    updateAdminProfileForm
  > = async (values) => {
    console.log('formik values in hook  ==========', values);
    const formData = new FormData();
    formData.append('name', values.name);
    if (values.image instanceof File) {
      formData.append('image', values.image);
    }

    try {
      const response = await UpdateProfile(formData);
      // console.log('update profile res======', res);
      props.resolve?.(response);
    } catch (error) {
      props.reject?.(error);
      console.log('update profile error=========', error);
    }
  };

  const initialValues = {
    name: '',
    image: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: updateAdminProfileSchema,
    onSubmit: handleAdminUpdateProfile,
  });

  return {
    formik,
    updateProfileLoading,
  };
}
