import Text from '../../base/Text';

import Button from '../../base/Button';
import React from 'react';

interface modalProps {
  modal: boolean;
  headerText: string;
  buttonsText: { button1: string; button2: string };
  handleSubmit: (values: any) => void | Promise<any>;
  cancelSubmit: () => void;
  submitLoading: boolean;
  editLoading: boolean;
  children: React.ReactNode;
  editId?: string;
}

const Modal = ({
  modal,
  headerText,
  buttonsText,
  handleSubmit,
  cancelSubmit,
  submitLoading,
  editLoading,
  editId,
  children,
}: modalProps) => {
  return (
    <div
      id="my_modal_4"
      className={
        modal
          ? ' flex flex-col items-end justify-center fixed w-full h-screen bg-black/70 top-0 right-0 z-10 duration-300'
          : ' flex flex-col items-end justify-center fixed w-full h-screen top-0 right-[-100%]'
      }
    >
      <div
        className={
          modal
            ? 'flex flex-col justify-between rounded-none w-full md:w-[530px]  max-w-5xl bg-white shadow-paginationShadow p-0 h-screen fixed right-0  z-10 duration-700'
            : 'flex flex-col justify-between rounded-none w-full md:w-5/12  max-w-5xl bg-white shadow-paginationShadow p-0 h-screen fixed right-[-100%]  z-10 duration-700'
        }
      >
        {/* if there is a button in form, it will close the modal */}

        <div>
          {/* form Header */}
          <section className="bg-gradient-to-r from-darkBlue  to-darkBlue/60 w-full  flex items-center justify-between px-4 py-3">
            <Text className="text-xl font-normal text-euvroWhite">
              {headerText}
            </Text>
            <button
              className="btn btn-sm btn-circle btn-ghost text-euvroWhite"
              onClick={cancelSubmit}
            >
              ✕
            </button>
          </section>
          {/* form Main Content */}

          {children}
        </div>

        {/* form Footer */}
        <section className="grid lg:grid-cols-2 gap-5 px-4  my-7">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-darkBlue  to-darkBlue/60 text-white text-sm "
            onClick={handleSubmit}
            isLoading={submitLoading || editLoading}
          >
            {editId ? 'Save' : buttonsText?.button1}
          </Button>
          <Button
            className="w-full text-sm border- bg-white text-darkBlue border-darkBlue hover:text-white hover:bg-gradient-to-r from-darkBlue  to-darkBlue/60 duration-300"
            onClick={cancelSubmit}
          >
            {buttonsText?.button2}
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Modal;
