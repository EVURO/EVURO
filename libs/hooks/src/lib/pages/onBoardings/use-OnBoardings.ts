import {
  useCreateOnBoardingMutation,
  useGetAllOnBoardingsQuery,
  useUpdateOnBoardingMutation,
  useDeleteOnBoardingMutation,
} from '@evuro-frontend/store';
import { dashboardPropsTypes } from './types';

export function useOnBoardings(props: dashboardPropsTypes) {
  const {
    data: getAllOnBoardingsData,
    isLoading: allOnBoardingsLoading,
    refetch: getAllOnBoardingsFetch,
  } = useGetAllOnBoardingsQuery('');

  // console.log('=====getAllOnBoardingData=========', getAllOnBoardingsData);

  const [createOnBoarding, { isLoading: createOnBoardingLoading }] =
    useCreateOnBoardingMutation();

  const [updateOnBoarding, { isLoading: updateOnBoardingLoading }] =
    useUpdateOnBoardingMutation();

  const [deleteOnBoarding, { isLoading: deleteOnBoardingLoading }] =
    useDeleteOnBoardingMutation();

  const handleCreateOnBoarding = async (video: File) => {
    // console.log('video File in hook=====', video);
    const formData = new FormData();
    formData.append('video', video);
    try {
      const response = await createOnBoarding(formData);
      // console.log('createOnBoardings hook response=======', response);
      props.createResolve?.(response);
    } catch (error) {
      props.reject?.(error);
    }
  };

  const handleUpdateOnBoarding = async (payload: {
    id: string;
    status: string;
  }) => {
    console.log('payload in hook=====', payload);
    try {
      const response = await updateOnBoarding(payload);
      // console.log('payload status======', payload.status);
      // console.log('updateOnBoardings hook response=======', response);
      props.resolve?.(response);
    } catch (error) {
      props.reject?.(error);
    }
  };

  const handleDeleteOnBoarding = async (id: string) => {
    try {
      const response = await deleteOnBoarding(id);
      // console.log('deleteDashboard hook response=======', response);
      props.deleteResolve?.(response);
    } catch (error) {
      props.reject?.(error);
    }
  };

  return {
    getAllOnBoardingsFetch,
    getAllOnBoardingsData,
    allOnBoardingsLoading,
    handleUpdateOnBoarding,
    updateOnBoardingLoading,
    deleteOnBoardingLoading,
    handleDeleteOnBoarding,
    createOnBoardingLoading,
    handleCreateOnBoarding,
  };
}

export default useOnBoardings;
