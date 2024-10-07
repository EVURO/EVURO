

import Text from '../../base/Text';
import Button from '../../base/Button';
import React from 'react';
import { Svgs } from '../../../../../../libs/assets/src';

interface videoProp {
  className?: string;
  deleteModal: boolean;
  deleteToggleModal: () => void;
  deleteLoading: boolean;
  deleteFunction: (deleteId: string) => void;
  deleteId: string;
}

const ConfirmationModal = ({
  className,
  deleteModal,
  deleteToggleModal,
  deleteLoading,
  deleteFunction,
  deleteId,
}: videoProp) => {
  //   console.log('======video api url strng =====', videoData);

  return (
    <div
      id="my_modal_4"
      className={
        deleteModal
          ? ' flex flex-col items-center justify-center fixed  w-full h-screen bg-black/70 top-0 right-0 z-10 duration-300'
          : ' flex flex-col items-end justify-center fixed  w-full h-screen top-0'
      }
    >
      <div
        className={
          deleteModal
            ? 'flex flex-col justify-evenly items-center w-9/12  md:w-6/12 lg:w-4/12 h-[40%] md:h-[33%] lg:h-[40%] rounded-xl max-w-5xl bg-white shadow-paginationShadow relative p-0  z-10 duration-700'
            : 'hidden duration-300'
        }
      >
        {/* Logo */}

        <div>
          <img
            src={Svgs.authDogLogo}
            className="w-full h-[55px] object-cover "
            alt="logo"
          />
        </div>

        {/* Confirmation Message */}

        <section>
          <Text className="font-medium sm:text-sm md:text-base lg:text-lg">
            Are you sure want to delete ?
          </Text>
        </section>

        {/* Yes and No Buttons */}

        <section className="w-full lg:w-9/12 xl:w-5/12 flex flex-row items-center justify-center gap-5 ">
          <Button
            className="h-[50px] btn rounded-lg text-lg text-buttonWhite pt-1 font-normal leading-[22.5px] px-10 lg:px-12 text-center
           bg-gradient-to-r from-red/90 to-error "
            isLoading={deleteLoading}
            onClick={() => {
              deleteFunction(deleteId);
            }}
          >
            Yes
          </Button>
          <Button
            className="h-[50px] btn rounded-lg text-lg text-buttonWhite pt-1 font-normal leading-[22.5px] px-10 lg:px-12 text-center
          bg-gradient-to-r from-darkBlue  to-darkBlue/60"
            onClick={deleteToggleModal}
          >
            No
          </Button>
        </section>
      </div>
    </div>
  );
};

export default ConfirmationModal;
