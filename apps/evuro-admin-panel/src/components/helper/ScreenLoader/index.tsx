import React, { useEffect } from 'react';
import Loader from '../../base/Loader';
import { setResponseLoader, useAppDispatch } from '@evuro-frontend/store';

const ScreenLoader = ({
  isSuccessResponse,
}: {
  isSuccessResponse?: boolean;
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let loaderTimeout;

    if (isSuccessResponse) {
      loaderTimeout = setTimeout(() => {
        dispatch(setResponseLoader(false));
      }, 4000);
    }

    return () => {
      clearTimeout(loaderTimeout);
    };
  }, [isSuccessResponse]);

  return (
    <div
      id="loaderModal"
      className=" flex flex-col items-center justify-center fixed w-full h-screen bg-black/70 top-0 right-0 z-10 duration-300"
    >
      <Loader className="loading-lg flex justify-center text-euvroWhite" />
    </div>
  );
};

export default ScreenLoader;
