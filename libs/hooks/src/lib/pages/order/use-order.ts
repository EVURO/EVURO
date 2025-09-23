import { useOrderProps } from './types';
import {
  useGetOrdersByFilterQuery,
  useEditOrderByFilterMutation,
} from '@evuro-frontend/store';

export function useOrder(props: useOrderProps) {
  const {
    data: getFilterOrder,
    isLoading: getFilterOrderLoading,
    refetch: filterRefetch,
  } = useGetOrdersByFilterQuery(props?.filterKeyWord);

  const [editOrderByFilter, { isLoading: editOrderFilterLoading }] =
    useEditOrderByFilterMutation();
  //filterKeywords
  // On going
  // Complete
  // Pending
  // Inprogress

  const handleEditOrderByFilter = async (payload: {
    orderId: string;
    status: string;
  }) => {
    const response = await editOrderByFilter(payload);
    props.resolveEdit?.(response);
  };

  return {
    getFilterOrder,
    getFilterOrderLoading,
    filterRefetch,
    handleEditOrderByFilter,
    editOrderFilterLoading,
  };
}
