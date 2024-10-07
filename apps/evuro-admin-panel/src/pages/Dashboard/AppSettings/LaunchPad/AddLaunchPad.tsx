import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { Text, Button, Input, TextArea, Image } from '../../../../components';
import { HiPencil } from 'react-icons/hi';
import { IoIosImages } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { setAlert, useAppDispatch } from '@evuro-frontend/store';
import { useLaunchPad } from '@evuro-frontend/hooks';
import { addLaunchPadProps } from './types';

const AddLaunchPad = ({ showLaunchPad, getLaunchPad }: addLaunchPadProps) => {
  const [launchPad, setLaunchPad] = useState({
    title: '',
    description: [],
    images: [],
  });
  const [editImages, setEditImages] = useState(false);
  // console.log('getLaunchPad========', getLaunchPad?.data?.launchPad);
  // console.log('useState launchPad=========', launchPad);

  const dispatch = useAppDispatch();
  const imagesRef = useRef(null);
  const { addLaunchPadLoading, handleLaunchPad } = useLaunchPad({
    resolve: handleLaunchPadResponse,
  });

  useEffect(() => {
    if (getLaunchPad?.status === 200) {
      const descriptionArray = getLaunchPad?.data?.launchPad?.description;
      const imagesArray = getLaunchPad?.data?.launchPad?.images;
      const title = getLaunchPad?.data?.launchPad?.title;

      console.log('get launchpad =======================', getLaunchPad);
      // imagesArray.map((img) => console.log('images ====', img));
      setEditImages(true);
      setLaunchPad({
        title,
        description: descriptionArray,
        images: imagesArray,
        // images: imagesArray.map((image) => image as FileList),
      });
    }
  }, [getLaunchPad]);

  // Add Launch Pad Response
  function handleLaunchPadResponse(response: any) {
    if (response?.data?.status === 200) {
      setLaunchPad({
        title: '',
        description: [],
        images: [],
      });
      dispatch(
        setAlert({
          visible: true,
          message: 'Launchpad product is added successfully.',
          variant: 'success',
        })
      );
      showLaunchPad(false);
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

  // handle Descriptions
  const handleDescriptionChange = (index: number, value: string) => {
    const updatedDescriptions = [...launchPad.description];
    updatedDescriptions[index] = value;
    setLaunchPad({ ...launchPad, description: updatedDescriptions });
  };

  //Check if Descriptions are Fille
  const areDescriptionsFilled = () => {
    const updatedDescriptions = [...launchPad.description];

    const allDescriptionsFilled = updatedDescriptions.every(
      (description) => description !== ''
    );
    return allDescriptionsFilled;
  };

  // Add Launch Pad Mutation
  const addLaunchPadHook = () => {
    if (
      launchPad.title.length > 0 &&
      launchPad.description.length > 0 &&
      launchPad.images.length > 0
    ) {
      if (launchPad.images.length < 4) {
        dispatch(
          setAlert({
            visible: true,
            message: 'At least 4 images are required.',
            variant: 'error',
          })
        );
      } else {
        // console.log(
        //   'launchpad before submitting ===================',
        //   launchPad
        // );
        handleLaunchPad(launchPad);
      }
    } else {
      dispatch(
        setAlert({
          visible: true,
          message: 'Please fill Title, Description & Images ',
          variant: 'error',
        })
      );
    }
  };

  /*Add New Description*/

  const addNewDescription = () => {
    const updatedDescriptions = [...launchPad.description];

    if (areDescriptionsFilled()) {
      updatedDescriptions.push('');

      setLaunchPad({
        ...launchPad,
        description: updatedDescriptions,
      });
    } else {
      dispatch(
        setAlert({
          visible: true,
          message: 'Please fill last description!',
          variant: 'info',
        })
      );
    }
  };

  /*Delete Description*/

  const deleteDescription = (index: number) => {
    let filteredDescription = [...launchPad.description];
    filteredDescription = filteredDescription.filter(
      (description, filterIndex) => filterIndex !== index
    );
    setLaunchPad({
      ...launchPad,
      description: filteredDescription,
    });
  };

  /*Handle Images use Ref Click*/

  const handleImagesClick = () => {
    imagesRef?.current?.click();
  };

  /* Handle Change Image*/

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log('files list length========', event?.target?.files?.length);
    setEditImages(false);
    const fileList = [...(event?.target?.files as FileList)];
    setLaunchPad({
      ...launchPad,
      images: [...launchPad.images, ...fileList],
    });
    event.target.value = null;
  };

  // Delete Image function

  const deleteImage = (index: number) => {
    // console.log('index in delete Image =====', index);
    let filteredImages = [...launchPad.images];
    filteredImages = filteredImages.filter(
      (images, filterIndex) => filterIndex !== index
    );
    setLaunchPad({
      ...launchPad,
      images: filteredImages,
    });
  };

  return (
    <div className="w-full h-auto bg-euvroWhite mb-5 rounded-[10px] px-10 flex flex-col justify-start gap-10 pt-10 pb-14">
      {/* Publish Button Flex Row Section */}
      <section className="flex flex-row justify-between items-center lg:items-start">
        <Text className="font-medium text-md md:text-lg lg:text-xl text-black">
          Launchpad Details
        </Text>
        <Button
          type="button"
          className={`${
            launchPad.title &&
            launchPad.description.length > 0 &&
            launchPad.images.length > 3
              ? false
              : true && 'bg-darkBlue/50 pointer-events-none'
          } h-11 lg:h-[50px] btn rounded-lg text-[15px] text-buttonWhite  font-normal leading-[22.5px] md:px-10 lg:px-12 text-center bg-darkBlue`}
          // disabled={
          //   launchPad.title &&
          //   launchPad.description.length > 0 &&
          //   launchPad.images.length > 0
          // }
          isLoading={addLaunchPadLoading}
          onClick={addLaunchPadHook}
        >
          <Text className="lg:text-xl font-medium text-left">Publish</Text>
        </Button>
      </section>
      {/* Product Name & Description Section*/}
      <section>
        <Input
          placeholder="Product Name"
          className="placeholder:font-medium placeholder:text-launchPadPlaceHolder  placeholder:text-2xl focus:outline-0 font-medium text-2xl border-none"
          value={launchPad.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLaunchPad({ ...launchPad, title: e.target.value })
          }
        />
      </section>

      {/* Dynamic Section Images */}
      {launchPad.images.length > 0 && (
        <section className="w-[95%] m-auto grid md:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-5 lg:gap-0 lg:gap-y-3 text-center px-[5%] py-7">
          {launchPad.images.map((fileObject, index) => (
            // console.log('file object ==========================', fileObject),
            <div
              key={index}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="indicator w-[160px] h-full ">
                <div className="w-full h-auto bg-euvroWhite place-items-center relative">
                  <span className="indicator-item bg-euvroWhite w-9 h-9 top-0 right-0 rounded-full flex items-center justify-center">
                    <MdDelete
                      size={23}
                      color="red"
                      onClick={() => deleteImage(index)}
                      className="cursor-pointer duration-300"
                    />
                  </span>
                  <Image
                    url={
                      editImages
                        ? fileObject
                        : URL.createObjectURL(fileObject as File)
                    }
                    className="object-cover h-[190px] w-[150px] rounded-[20px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
      {/* Dynamic Section Production Description*/}
      <section className="w-full flex flex-col gap-4">
        {/* <TextArea placeholder="Write Description" /> */}
        {launchPad.description.map((description, index) => (
          <div className="relative" key={index}>
            <TextArea
              className="textarea relative border text-justify bg-dashboardLayoutBackground focus:outline-0 w-full h-full pr-[75px] placeholder:text-launchPadPlaceHolder placeholder:font-medium text-xl font-normal text-black"
              placeholder="Write Description"
              autoFocus
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleDescriptionChange(index, e.target.value)
              }
              disabled={launchPad.title ? false : true}
            ></TextArea>
            <div className="absolute top-[16px] right-7">
              <button
                className="btn btn-xs md:btn-sm bg-euvroWhite hover:bg-[#11B0F0]"
                onClick={() => deleteDescription(index)}
              >
                <MdDelete size={22} />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/*Write Description & Add Image Section*/}
      <section className="w-full bg-dashboardLayoutBackground flex flex-row justify-center items-center gap-4 md:gap-8 py-10 border-2 border-dashed border-darkBlue rounded-[10px]">
        <Button
          className=" text-euvroBlack bg-euvroWhite hover:bg-[#11B0F0] hover:text-euvroWhite rounded-[10px] border-[1px] border-black px-3 lg:px-7"
          onClick={addNewDescription}
        >
          <HiPencil size={22} className="hidden md:block" />
          <Text className="font-medium text-sm md:text-md lg:text-[20px]">
            Write Description
          </Text>
        </Button>
        <Button
          className=" text-euvroBlack bg-euvroWhite hover:bg-[#11B0F0] hover:text-euvroWhite rounded-[10px] border-[1px] border-black px-3 lg:px-7"
          onClick={handleImagesClick}
        >
          <IoIosImages size={22} className="hidden md:block" />
          <Text className="font-medium text-sm md:text-md lg:text-[20px]">
            Add Image
          </Text>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={imagesRef}
            onChange={handleImageChange}
            multiple
          />
        </Button>
      </section>
    </div>
  );
};

export default AddLaunchPad;
