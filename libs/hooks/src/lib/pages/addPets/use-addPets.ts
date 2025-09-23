import { useAddPetsMutation } from '@evuro-frontend/store';
import { validAddPetsSchema } from '@evuro-frontend/validators';
import { useFormik } from 'formik';

export interface useAddPetsType {
  formik: ReturnType<typeof useFormik>;
}

export interface addPetsResponce {
  data: any;
}
type FormikOnSubmit<Values> = (values: Values) => void | Promise<any>;

export type AddPetsForm = {
  images: any[];
  name: string;
  age: string;
  gender: string;
  size: string;
  breed: string;
};

export type UseAddPetsType = {
  resolve?: (response?: addPetsResponce) => void;
  reject?: () => void;
};

export function useAddPets(props: UseAddPetsType): useAddPetsType {
  const [petsHandle, { isLoading }] = useAddPetsMutation();

  const handelAddPets: FormikOnSubmit<AddPetsForm> = async (values) => {
    const formData = new FormData();
    formData.append('petName', values.name);
    formData.append('age', values.age);
    formData.append('gender', values.gender);
    formData.append('size', values.size);
    formData.append('breed', values.breed);

    values?.images?.forEach((image, index) => {
      formData.append('image', {
        uri: image.path,
        type: 'image/jpg',
        name: image.path.substring(image.path.lastIndexOf('/') + 1),
      });
    });

    try {
      const res = await petsHandle(formData);
      // console.log('=========res', res);
      props.resolve?.(res);
    } catch (error) {
      console.log('error=========', error);
    }
  };

  const initialValues = {
    images: [],
    name: '',
    age: '',
    gender: '',
    size: '',
    breed: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validAddPetsSchema,
    onSubmit: handelAddPets,
  });

  return {
    formik,
    isLoading,
  };
}

export default useAddPets;
