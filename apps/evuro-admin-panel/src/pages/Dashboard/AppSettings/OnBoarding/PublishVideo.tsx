import { AiOutlineClose } from 'react-icons/ai';
import { useOnBoardings } from '@evuro-frontend/hooks';
import { useAppDispatch, setAlert } from '@evuro-frontend/store';
import { RiFileCloseLine } from 'react-icons/ri';
import { IoCloudUploadSharp } from 'react-icons/io5';
import { RiFile3Line } from 'react-icons/ri';
import { Text, Button } from '../../../../components';
import React, { ChangeEvent, useRef, useState } from 'react';

interface videoProp {
  className?: string;
  modal: boolean;
  toggleModal: () => void;
}

const PublishVideo = ({ className, modal, toggleModal }: videoProp) => {
  //   console.log('======video api url strng =====', videoData);
  const inputRef = useRef(null);
  const [video, setVideo] = useState<File | string>('file');
  const dispatch = useAppDispatch();

  const {
    createOnBoardingLoading,
    handleCreateOnBoarding,
    getAllOnBoardingsFetch,
  } = useOnBoardings({
    createResolve: createOnBoardingVideo,
  });

  const handleVedioClick = () => {
    inputRef?.current?.click();
  };

  // useEffect(() => {
  //   const handleCloseModal = (event: MouseEvent) => {
  //     if (modal && !inputRef.current.contains(event.target as Node)) {
  //       toggleModal();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleCloseModal);

  //   return () => {
  //     document.removeEventListener('mousedown', handleCloseModal);
  //   };
  // }, [modal, toggleModal]);

  const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileObject = event.target.files?.[0];
    // console.log('video file object======', fileObject);
    setVideo(fileObject as File);
  };

  function createOnBoardingVideo(response: any) {
    // console.log('========response======', response);
    // console.log('response======', response?.error?.data?.message);
    if (response?.data?.status === 200) {
      getAllOnBoardingsFetch();
      dispatch(
        setAlert({
          visible: true,
          message: 'OnBoarding Video is Published',
          variant: 'success',
        })
      );
      setVideo('');
      toggleModal();
    } else {
      dispatch(
        setAlert({
          visible: true,
          message: response?.error?.data?.message,
          variant: 'error',
        })
      );
    }
  }

  return (
    <div
      id="my_modal_4"
      className={
        modal
          ? ' flex flex-col items-center justify-center fixed  w-full h-screen bg-black/70 top-0 right-0 z-10 duration-300 '
          : ' flex flex-col items-end justify-center fixed  w-full h-screen top-0'
      }
    >
      <div
        className={
          modal
            ? 'flex flex-col justify-between items-center w-10/12   md:w-6/12  h-[60%] rounded-xl max-w-5xl bg-white shadow-paginationShadow relative p-0  z-10 duration-700'
            : 'hidden'
        }
      >
        {/* Close Modal Button Section */}
        <section className=" w-full  rounded-t-xl flex items-center justify-end px-4 py-3">
          <Button
            className="btn btn-circle btn-sm bg-darkBlue hover:bg-error text-euvroWhite"
            onClick={toggleModal}
          >
            <AiOutlineClose size={20} />
          </Button>
        </section>

        {/* Upload and File Text */}

        <section className="w-9/12 lg:w-6/12 xl:w-5/12 flex flex-col items-center justify-between gap-6 ">
          <Button
            className="btn btn-outline w-full rounded-md text-xl font-normal text-left hover:bg-darkBlue hover:text-euvroWhite flex flex-row items-center justify-center "
            onClick={handleVedioClick}
          >
            Upload video <IoCloudUploadSharp size={32} />
            <input
              type="file"
              ref={inputRef}
              style={{ display: 'none' }}
              onChange={handleVideoChange}
              accept="video/mp4,video/x-m4v,video/*"
            />
          </Button>
          {video instanceof File ? (
            <RiFileCloseLine
              size={55}
              className="hover:text-error cursor-pointer"
              onClick={() => setVideo('')}
            />
          ) : (
            <RiFile3Line size={55} className="cursor-pointer" />
          )}

          <Text className="font-normal text-md text-center">
            {(video as File).name}
          </Text>
        </section>

        {/* Publish Button */}
        <section className=" w-full  rounded-t-xl flex items-center justify-end py-6 px-4">
          <Button
            className="h-[50px] btn rounded-lg text-lg text-buttonWhite  font-normal leading-[22.5px] px-8 text-center
          bg-gradient-to-r from-darkBlue  to-darkBlue/60"
            isLoading={createOnBoardingLoading}
            onClick={() => handleCreateOnBoarding(video)}
          >
            Publish
          </Button>
        </section>
      </div>
    </div>
  );
};

export default PublishVideo;
