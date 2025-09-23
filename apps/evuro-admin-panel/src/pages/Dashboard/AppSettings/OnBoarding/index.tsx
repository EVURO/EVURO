import {
  Button,
  Text,
  Video,
  ConfirmationModal,
  ScreenLoader,
} from '../../../../components';
import { FiPlus } from 'react-icons/fi';
import { useOnBoardings } from '@evuro-frontend/hooks';
import {
  setAlert,
  useAppDispatch,
  setScreenLoader,
  setResponseLoader,
  useAppSelector,
} from '@evuro-frontend/store';
import { deleteModalHelper } from '@evuro-frontend/db';
import { MdDelete } from 'react-icons/md';
import PublishVideo from './PublishVideo';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const OnBoarding = () => {
  const {
    getAllOnBoardingsFetch,
    getAllOnBoardingsData,
    allOnBoardingsLoading,
    handleUpdateOnBoarding,
    updateOnBoardingLoading,
    handleDeleteOnBoarding,
    deleteOnBoardingLoading,
  } = useOnBoardings({ resolve: selectedVideo, deleteResolve: deleteVideo });

  const { deleteModal, deleteToggleModal } = deleteModalHelper();

  const [loaderId, setLoaderId] = useState('');
  const [modal, setModal] = useState(false);

  //useAppDispatch and useAppSelector
  const dispatch = useAppDispatch();
  const screenLoader = useAppSelector((state) => state.screenLoader.loader);
  const responseLoader = useAppSelector(
    (state) => state.screenLoader.responseLoader
  );

  // console.log(
  //   '=========getAllOnBoardingsData Admin========',
  //   getAllOnBoardingsData?.data[0].admin.createdAt
  // );

  //const toggleModal Function
  const toggleModal = () => {
    // console.log('in toggleModal function=======');
    setModal(!modal);
  };

  function selectedVideo(response: any) {
    // console.log('========response======', response);
    // console.log('response======', response?.error?.data?.message);
    if (response?.data?.status === 200) {
      getAllOnBoardingsFetch();
      dispatch(
        setAlert({
          visible: true,
          message: 'Status is updated to active.',
          variant: 'success',
        })
      );
    } else {
      dispatch(
        setAlert({
          visible: true,
          text: response?.error?.data?.message,
          type: 'error',
        })
      );
    }
  }

  //delete Video function
  function deleteVideo(response: any) {
    // console.log('=====delete video function the response is=====', response);
    if (response?.data?.status === 200) {
      dispatch(
        setAlert({
          visible: true,
          message: response?.data?.message,
          variant: 'error',
        })
      );
      dispatch(setResponseLoader(true));
      getAllOnBoardingsFetch();
      deleteToggleModal();
    } else {
      dispatch(
        setAlert({
          visible: true,
          text: response?.error?.data?.message,
          variant: 'error',
        })
      );
    }
  }

  //screenLoader
  useEffect(() => {
    dispatch(setScreenLoader(allOnBoardingsLoading));
  }, [allOnBoardingsLoading]);

  return getAllOnBoardingsData?.data.length > 0 ? (
    <div className="max-w-[1640px] pb-12 flex flex-col">
      {/* Button Div */}
      <div className="flex flex-row justify-between px-5">
        {/* Input Div */}
        <div></div>

        <Button
          type="button"
          className="h-[50px] btn rounded-lg text-[15px] text-buttonWhite  font-normal leading-[22.5px] px-8 text-center
          bg-gradient-to-r from-darkBlue  to-darkBlue/60"
          onClick={toggleModal}
        >
          {' '}
          <Text className="text-xl font-medium text-left normal-case">
            Upload video
          </Text>
          <FiPlus className="bg-buttonWhite w-6 h-6 rounded-xl text-darkBlue text-xl" />
        </Button>
      </div>
      {/*Video Component*/}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 pt-6 pb-10">
        {getAllOnBoardingsData?.data.map((board) => (
          <div
            key={board._id}
            className={` ${
              board.status === 'active'
                ? 'col-span-full rounded-[10px]'
                : 'capitalize  card card-compact  bg-base-100 shadow-xl hover:scale-105 duration-300'
            }`}
          >
            <figure>
              <Video
                urlSource={board.video}
                className={`${
                  board.status === 'active'
                    ? 'h-[500px] w-[100%]  '
                    : 'h-[230px] w-full'
                }`}
                videoTagClassName={`${
                  board.status === 'active' && 'rounded-[10px]'
                }`}
              />
            </figure>
            {board.status === 'inactive' && (
              <div className="card-body">
                <p className="normal-case">
                  {`Added on : ${moment(board.admin.createdAt).format(
                    'YYYY/MM/DD'
                  )}`}{' '}
                </p>
                <div className="card-actions justify-between items-center mt-2.5 ">
                  <Button
                    className="btn text-buttonWhite bg-darkBlue hover:btn-primary hover:text-euvroWhite"
                    isLoading={
                      loaderId === board._id && updateOnBoardingLoading
                    }
                    onClick={() => {
                      setLoaderId(board._id);
                      handleUpdateOnBoarding({
                        id: board._id,
                        status: 'active',
                      });
                    }}
                  >
                    Publish
                  </Button>

                  <MdDelete
                    size={35}
                    color={'red'}
                    className="cursor-pointer duration-300"
                    onClick={() => {
                      setLoaderId(board._id);
                      deleteToggleModal();
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {modal && <PublishVideo modal={modal} toggleModal={toggleModal} />}
      {deleteModal && (
        <ConfirmationModal
          deleteModal={deleteModal}
          deleteToggleModal={deleteToggleModal}
          deleteLoading={deleteOnBoardingLoading}
          deleteFunction={handleDeleteOnBoarding}
          deleteId={loaderId}
        />
      )}
      {responseLoader && <ScreenLoader isSuccessResponse={responseLoader} />}
    </div>
  ) : getAllOnBoardingsData?.data.length === 0 ? (
    <Text className="text-center font-bold text-error"> No Data found.</Text>
  ) : (
    <div></div>
  );
};

export default OnBoarding;
