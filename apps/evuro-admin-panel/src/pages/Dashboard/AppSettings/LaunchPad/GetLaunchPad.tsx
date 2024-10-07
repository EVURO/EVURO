import React, { useState } from 'react';
import { Text, Button } from '../../../../components';
import { HiPencil } from 'react-icons/hi';
import { FaRegCommentDots } from 'react-icons/fa';
import CommentModal from './molecules/CommentModal';
import PadImage from './molecules/PadImages';
import { getLaunchPadProps } from './types';

const GetLaunchPad = ({ getLaunchPad, setLaunchPad }: getLaunchPadProps) => {
  const [commentsModal, setCommentsModal] = useState('');
  // const { getLaunchPadLoading, getLaunchPad } = useLaunchPad();

  // console.log('========getLaunchPad===========', getLaunchPad?.data);
  return (
    <div className="w-full h-auto bg-euvroWhite mb-5 rounded-[10px] px-10 flex flex-col justify-start gap-10 pt-10 pb-14">
      {/* Publish Button Flex Row Section */}
      <section className="flex flex-row justify-between items-center lg:items-start">
        <Text className="font-medium text-md md:text-lg lg:text-xl text-black">
          Launchpad Details
        </Text>
        <Button
          type="button"
          className=" h-11 lg:h-[50px] btn rounded-lg text-[15px] text-buttonWhite  font-normal leading-[22.5px] md:px-10 lg:px-12 text-center bg-darkBlue"
          onClick={() => setLaunchPad(true)}
        >
          {' '}
          <HiPencil size={22} />
          <Text className="lg:text-xl font-medium text-left">Edit</Text>
        </Button>
      </section>
      {/* Product Name*/}
      <section>
        <Text
          placeholder="Product Name"
          className="font-medium text-2xl text-black"
        >
          {getLaunchPad?.data?.launchPad?.title}
        </Text>
      </section>

      {/* Likes,Comments & Products Section*/}
      <section className="flex flex-col md:flex-row ">
        {/* like & comments */}
        <div className="text-lightGray flex flex-row items-start justify-stat font-normal text-[15px] space-x-[40px] w-full md:w-[25%] lg:w-[30%] xl:w-[20%] ">
          <span className="flex flex-row items-center gap-2 ">
            {' '}
            <FaRegCommentDots
              size={22}
              className="cursor-pointer duration-300"
              onClick={() => setCommentsModal('modal-open')}
            />
            <Text className="text-lightGray">
              {getLaunchPad?.data?.launchPad?.totalComments}
            </Text>
          </span>

          <span>
            {' '}
            <Text> Likes {getLaunchPad?.data?.launchPad?.totalLikes}</Text>
          </span>
        </div>
        {/* images */}
        <div className="text-center grid grid-cols-2 py-6 md:py-0 px-[15%] ">
          {getLaunchPad?.data?.launchPad?.images?.map((imagePath, index) => (
            <div
              key={index}
              className={`${
                index === 0
                  ? 'bg-firstLaunchPadImage rounded-tr-3xl  '
                  : index === 1
                  ? 'bg-secondLaunchPadImage rounded-t-3xl'
                  : index === 2
                  ? 'bg-thirdLaunchPadImage rounded-tr-3xl rounded-bl-3xl'
                  : 'bg-fourthLaunchPadImage  rounded-tr-none '
              } w-[150px] h-[150px] rounded-tr-3xl flex flex-col items-center justify-center `}
            >
              <figure>
                <PadImage
                  url={imagePath as string}
                  className={'rounded-none px-[8%] object-cover'}
                />
              </figure>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Section Production Description*/}
      <section className="w-full flex flex-col gap-4">
        {/* <TextArea placeholder="Write Description" /> */}
        <Text
          placeholder="Product Name"
          className="font-medium text-2xl text-black"
        >
          Description
        </Text>
        <div className="flex flex-col gap-3 text-xs">
          {getLaunchPad?.data?.launchPad?.description.map((des, index) => (
            <Text className="font-normal text-justify text-black" key={index}>
              {des}
            </Text>
          ))}
        </div>
      </section>

      <CommentModal
        commentsModal={commentsModal}
        setCommentsModal={setCommentsModal}
        comments={getLaunchPad?.data?.launchPad?.comments}
      />
      {/*Write Description & Add Image Section*/}
    </div>
  );
};

export default GetLaunchPad;
