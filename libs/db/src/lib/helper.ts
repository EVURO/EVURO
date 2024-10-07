import { useState, useCallback } from 'react';

export function deleteModalHelper() {
  const [deleteModal, setDeleteModal] = useState(false);

  const deleteToggleModal = () => {
    // console.log('in deleteToggleModal function=======');

    setDeleteModal(!deleteModal);
  };

  return { deleteToggleModal, deleteModal };
}

export const useDetailDropDown = () => {
  const [openDetails, setOpenDetails] = useState([false, false, false, false]);

  // console.log('open details ========================', openDetails);

  const toggleDetailSummary = useCallback(
    (indexToOpen: number) => {
      setOpenDetails((details) =>
        details.map((detail, index) => (index === indexToOpen ? true : false))
      );
    },
    [setOpenDetails]
  );

  return { toggleDetailSummary, openDetails };
};
