import { useUsersWithOrdersPropsTypes } from './types';
import {
  useGetUsersWithOrdersQuery,
  useDeleteUsersWithOrdersMutation,
} from '@evuro-frontend/store';

export function useUsersWithOrders(props: useUsersWithOrdersPropsTypes) {
  const {
    data: getUsersWithOrders,
    isLoading: getUsersWithOrdersLoading,
    refetch: getUsersWithOrdersRefetch,
  } = useGetUsersWithOrdersQuery(props.filterKeyWord, {
    skip: !props.filterKeyWord,
  });

  const [deleteUserWithOrder, { isLoading: deleteUserWithOrdersLoading }] =
    useDeleteUsersWithOrdersMutation();

  const handleDeleteUserWithOrders = async (id: string) => {
    try {
      const response = await deleteUserWithOrder(id);
      // console.log('id in delete', id);
      props?.deleteResolve?.(response);
    } catch (error) {
      props.reject?.(error);
    }
  };

  return {
    getUsersWithOrders,
    getUsersWithOrdersLoading,
    getUsersWithOrdersRefetch,
    handleDeleteUserWithOrders,
    deleteUserWithOrdersLoading,
  };
}
