import {
  useAddLaunchPadMutation,
  useGetLaunchPadQuery,
} from '@evuro-frontend/store';

export interface launchPadForm {
  title: string;
  description: string[];
  images: File[];
}

export type useLaunchPadProps = {
  resolve?: (response?: any) => void;
  reject?: (error: any) => void;
};

export function useLaunchPad(props: useLaunchPadProps) {
  // POST Launch Pad
  const [addLaunchPad, { isLoading: addLaunchPadLoading }] =
    useAddLaunchPadMutation();
  //Get LaunchPad
  const { data: getLaunchPad, isLoading: getLaunchPadLoading } =
    useGetLaunchPadQuery('');

  // console.log('========getLaunchPad===========', getLaunchPad);

  const handleLaunchPad = async (values: launchPadForm) => {
    // console.log('values===========', values);
    const formData = new FormData();
    formData.append('title', values.title);
    values.description.forEach((des) => formData.append('description', des));
    values.images.forEach((image) => formData.append('images', image));
    // formData.append('description', values.description.toString());
    // formData.append('images', values.images.toString());

    try {
      const response = await addLaunchPad(formData);
      console.log('=====response in hook====', response);

      props.resolve?.(response);
    } catch (error) {
      console.log('error=====', error);
    }
  };

  return {
    addLaunchPadLoading,
    handleLaunchPad,
    getLaunchPadLoading,
    getLaunchPad,
  };
}
