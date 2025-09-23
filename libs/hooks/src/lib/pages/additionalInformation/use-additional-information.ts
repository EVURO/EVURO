import { useFormik } from 'formik';
import { validAdditionalInformationSchema } from '@evuro-frontend/validators';
import {
  setAdditionalInfoData,
  useAdditionalInfoMutation,
  useAppDispatch,
} from '@evuro-frontend/store';

export interface useAdditionalInfoType {
  formik: ReturnType<typeof useFormik>;
}

export interface addInfoResponce {
  data: any;
}
type FormikOnSubmit<Values> = (values: Values) => void | Promise<any>;

export type AddInfoForm = {
  images: any[];
  bio: string;
  age: string;
  video: string;
  breedName: string;
  ratePerHour: string;
  experience: string;
  Gander: string;
};

export type UseAdditionalInfoType = {
  resolve?: (response?: addInfoResponce) => void;
  reject?: () => void;
};

export function useAdditionalInfromation(
  props: UseAdditionalInfoType
): useAdditionalInfoType {
  const [AdditionalInfo, { isLoading }] = useAdditionalInfoMutation();
  const dispatch = useAppDispatch();

  const handelAdditionalInfo: FormikOnSubmit<AddInfoForm> = async (values) => {
    const formData = new FormData();
    formData.append('bio', values.bio);
    formData.append('breedName', values.breedName);
    formData.append('age', values.age);
    formData.append('experience', values.experience);
    formData.append('ratePerHour', values.ratePerHour);

    // formData.append('video', {
    //   uri: values.video.path,
    //   type: 'video/mp4',
    //   name: values.video.path.substring(values.video.path.lastIndexOf('/') + 1),
    // });

    formData.append('video', values.video);

    values?.images?.forEach((image, index) => {
      formData.append('images', image);
    });

    console.log('formData=======', formData?._parts);

    try {
      const res = await AdditionalInfo(formData);
      // console.log('res======', res);
      dispatch(setAdditionalInfoData(res));
      props.resolve?.(res);
    } catch (error) {
      console.log('error=====', error);
    }
  };

  const initialValues = {
    images: [],
    bio: '',
    age: '',
    video: '',
    breedName: '',
    ratePerHour: '',
    experience: '',
    Gander: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validAdditionalInformationSchema,
    onSubmit: handelAdditionalInfo,
  });

  return {
    formik,
    isLoading,
  };
}

export default useAdditionalInfromation;
