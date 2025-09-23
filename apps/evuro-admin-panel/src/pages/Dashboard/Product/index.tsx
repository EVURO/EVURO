import { createColumnHelper } from '@tanstack/react-table';
import { Svgs } from '@evuro-frontend/assets';
import {
  Loader,
  Table,
  Button,
  Modal,
  Text,
  Input,
  Image,
  FileInput,
  Checkbox,
  TextArea,
  ScreenLoader,
  ConfirmationModal,
} from '../../../components';
import { FaPlus, FaMinus } from 'react-icons/fa';
import React, {
  useState,
  useEffect,
  useMemo,
  ChangeEvent,
  useRef,
} from 'react';
import { productTypes } from './types';
import { MdDelete } from 'react-icons/md';
import { LiaEditSolid } from 'react-icons/lia';
import { IoMdAdd } from 'react-icons/io';
import {
  setAlert,
  setScreenLoader,
  setResponseLoader,
  useAppDispatch,
  useAppSelector,
} from '@evuro-frontend/store';
import { useProduct } from '@evuro-frontend/hooks';
import { deleteModalHelper } from '@evuro-frontend/db';

const Product = () => {
  const [globalFilter, setGlobalSearch] = useState('');
  const [editId, setEditId] = useState('');

  const imageRef = useRef('');

  //delete Modal helpers

  const { deleteModal, deleteToggleModal } = deleteModalHelper();

  //useAppDispatch and useAppSelector
  const dispatch = useAppDispatch();
  const screenLoader = useAppSelector((state) => state.screenLoader.loader);
  const responseLoader = useAppSelector(
    (state) => state.screenLoader.responseLoader
  );

  const [modal, setModal] = useState(false);
  // const [deleteModal, setDeleteModal] = useState(false);

  const toggleModal = () => {
    setModal((modal) => !modal);
  };

  // fileHandler Image
  const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    const name = event.target.name;
    setTouched({ ...touched, [name]: true });
    setFieldValue(name, selectedFile);
  };

  // Custom Hook useProduct
  const {
    formik,
    getProductsData,
    getProductLoading,
    addProductLoading,
    handleDeleteProduct,
    deleteProductLoading,
    editProductLoading,
  } = useProduct({
    resolve: editId ? resolveEdit : resolveAddProduct,
    deleteResolve: resolveDelete,
    editId,
  });

  console.log('===========getProductsData=======', getProductsData?.data);

  // data pass to ReactTable as Prop
  const data = useMemo(() => {
    return (
      getProductsData?.data?.map &&
      getProductsData?.data.map(
        ({
          productImage,
          productName,
          availability,
          orderCount,
          price,
          _id,
        }: productTypes) => ({
          Image: productImage,
          Name: productName,
          Availability: availability,
          Order: orderCount,
          Price: `$${Number.parseFloat(price).toFixed(2)}`,
          Edit: _id,
          Delete: _id,
        })
      )
    );
  }, [getProductsData]);

  //screenLoader
  useEffect(() => {
    dispatch(setScreenLoader(getProductLoading));
  }, [getProductLoading]);

  const columnHelper = createColumnHelper();
  // columns Pass to ReactTable as Prop
  const columns = [
    columnHelper.accessor('', {
      id: 'Sr.No',
      cell: (info) => <Text>{info.row.index + 1}</Text>,
      header: () => <Text className="capitalize">Sr No.</Text>,
    }),
    columnHelper.accessor('Image', {
      cell: (info) => <Image className='rounded-full' url={info.getValue()} />,
      header: () => <Text className="capitalize">Image</Text>,
    }),
    columnHelper.accessor('Name', {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header: () => <Text className="capitalize">Name</Text>,
    }),
    columnHelper.accessor('Availability', {
      cell: (info) => <Text>{info.getValue() === true ? 'yes' : 'no'}</Text>,
      header: () => <Text className="capitalize">Availability</Text>,
    }),
    columnHelper.accessor('Order', {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header: () => <Text className="capitalize">Order</Text>,
    }),
    columnHelper.accessor('Price', {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header: () => <Text className="capitalize">Price</Text>,
    }),
    columnHelper.accessor('Edit', {
      cell: (info) => (
        <LiaEditSolid
          size={22}
          className="cursor-pointer duration-300 capitalize w-full"
          onClick={() => setFormValues(info.getValue())}
        />
      ),
      header: () => <Text className="capitalize">Edit</Text>,
    }),
    columnHelper.accessor('Delete', {
      cell: (info) => {
        return deleteProductLoading && editId === info.getValue() ? (
          <Loader />
        ) : (
          <MdDelete
            size={22}
            className="text-error cursor-pointer duration-300 w-full"
            onClick={() => {
              setEditId(info.getValue());
              deleteToggleModal();
            }}
          />
        );
      },
      header: () => <Text className="capitalize">Delete</Text>,
    }),
  ];

  const {
    values,
    getFieldProps,
    touched,
    errors,
    handleSubmit,
    setValues,
    setTouched,
    setFieldValue,
    resetForm,
  } = formik;

  // console.log('====formik values=====', values);
  // console.log('===formik errors=====', errors);
  // console.log('======formik touched=======', touched);

  // resolve add Product function
  function resolveAddProduct(response: any) {
    console.log('response======', response?.error?.data?.message);
    if (response?.data?.status === 200) {
      resetForm();
      setEditId('');
      imageRef.current.value = '';
      setModal(false);
      dispatch(
        setAlert({
          visible: true,
          message: response?.data?.message,
          variant: 'success',
        })
      );
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

  //delete Product function
  function resolveDelete(response: any) {
    // console.log('=====delete response=====', response);
    // console.log('editId State in resolveDelet =======', editId);
    if (response?.data?.status === 200) {
      dispatch(
        setAlert({
          visible: true,
          message: response?.data?.message,
          variant: 'error',
        })
      );
      dispatch(setResponseLoader(true));
      deleteToggleModal();
      getProductLoading();
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

  //set Form Values
  function setFormValues(id: string) {
    setModal((modal) => !modal);
    setEditId(id);

    const product = getProductsData?.data.find(
      (product: productTypes) => product._id === id
    );

    setValues({
      ...values,
      productName: product.productName,
      availability: product.availability,
      price: product.price,
      productDescription: product.productDescription,
      standardDelivery: product.standardDelivery,
      duration: values.duration,
      quantity: product.quantity,
      image: product.productImage,
      category: product.category,
    });
    setEditId(product._id);
  }

  function resolveEdit(response: any) {
    // console.log('===response===', response);
    // console.log('===response===', response?.data?.message);
    resetForm();
    setModal(false);
    setEditId('');
    if (response?.data?.status === 200) {
      dispatch(
        setAlert({
          visible: true,
          message: response?.data?.message,
          variant: 'success',
        })
      );
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
  // cancel submit button
  const cancelSubmit = () => {
    setModal((modal) => !modal);
    setEditId('');
    resetForm();
  };

  return (
    <div className="max-w-[1640px] h-full flex flex-col gap-5">
      {/* Button Div */}
      <div className="flex flex-row justify-between mx-5">
        {/* Input Div */}
        <div className="flex justify-start items-center relative">
          <img
            src={Svgs.webGlobalInputSearch}
            alt="search"
            className="absolute left-[1px] top-3/12 z-10 pointer-events-none w-10 h-5"
          />
          <Input
            className="h-[50px] hidden md:block md:w-[380px] lg:w-[420px] rounded-[5px] shadow-lg pl-10 placeholder:text-[12px] leading-[15px] font-normal text-[12px] placeholder:text-darkBlue border-transparent focus:outline-none bg-euvroWhite"
            placeholder="Quick Search..."
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
        </div>

        <Button
          type="button"
          className="h-[50px] btn rounded-[5px] text-[15px] text-buttonWhite  font-normal leading-[22.5px] px-8 text-center
        bg-gradient-to-r from-darkBlue  to-darkBlue/60"
          onClick={toggleModal}
        >
          {' '}
          <IoMdAdd size={21} /> Add Product
        </Button>
      </div>
      {/* Table Div */}
      <div>
        {data?.length > 0 ? (
          <div className=" bg-white rounded-xl mx-5 mb-5">
            <Table data={data} columns={columns} globalSearch={globalFilter} />
          </div>
        ) : data?.length === 0 ? (
          <Text className="text-center font-bold text-error">
            No Data found.
          </Text>
        ) : (
          <div></div>
        )}
      </div>

      <Modal
        modal={modal}
        headerText={editId ? 'Edit Product' : 'New Product'}
        buttonsText={{ button1: 'Submit', button2: 'Cancel' }}
        submitLoading={addProductLoading}
        editLoading={editProductLoading}
        cancelSubmit={cancelSubmit}
        handleSubmit={handleSubmit}
        editId={editId}
      >
        <section className="grid grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-5 px-4 py-[5%] overflow-y-scroll">
          {/* product Name */}
          <div className="col-start-1 col-span-2 md:col-span-2 lg:col-span-1 w-full">
            <Text className="text-black font-medium text-[15px]">
              Product Name
            </Text>
            <Input
              {...getFieldProps('productName')}
              className="border-[1px_solid_lightGray] lg:w-[230px] h-[40px] rounded-[5px] mt-2 bg-euvroWhite"
              placeholder="Product Name"
              errorMessage={
                (touched.productName && errors.productName) as string
              }
            />
          </div>
          {/* product Image */}
          <div className="col-start-1 col-span-2 md:col-span-2 lg:col-span-1 w-full">
            <div className="flex flex-row justify-between items-center">
              <Text className="text-black font-medium text-[15px]">
                Product Image
              </Text>
              {values.image && (
                <Image
                  url={
                    !values.image
                      ? ''
                      : values.image instanceof File
                      ? URL.createObjectURL(values.image as File)
                      : values.image
                  }
                  className="h-auto w-5"
                />
              )}
            </div>
            <FileInput
              name="image"
              className="rounded-[5px] lg:w-[230px] bg-euvroWhite"
              inputRef={imageRef}
              errorMessage={(touched.image && errors.image) as string}
              accept=".jpg, .jpeg, .png,"
              onClick={() => setTouched({ ...touched, image: true })}
              onChange={fileChangeHandler}
              myPlaceholder={true}
            />
          </div>

          {/* Price*/}
          <div className="col-start-1 col-span-2 md:col-span-2 lg:col-span-1 w-full">
            <Text className="text-black font-medium text-[15px]">Price</Text>
            <Input
              {...getFieldProps('price')}
              className="border-[1px_solid_lightGray] lg:w-[230px] rounded-[5px] h-[45px] mt-2 bg-euvroWhite"
              placeholder="Enter Price"
              type="number"
              errorMessage={(touched.price && errors.price) as string}
            />
          </div>

          {/*Delivery Charges */}
          <div className="col-start-1 col-span-2 md:col-span-2 lg:col-span-1 w-full">
            <Text className="text-black font-medium text-[15px]">
              Delivery Charges
            </Text>
            <Input
              {...getFieldProps('standardDelivery')}
              className="border-[1px_solid_lightGray] lg:w-[230px] rounded-[5px] h-[45px] mt-2 bg-euvroWhite"
              placeholder="Enter Delivery Charges"
              type="number"
              errorMessage={
                (touched.standardDelivery && errors.standardDelivery) as string
              }
            />
          </div>

          {/* Availability*/}
          <div className="col-start-1 col-span-1">
            <div className="flex flex-row justify-between items-center pr-4 mt-4">
              <Text className="text-black font-medium text-[15px]">
                Availability
              </Text>
              <Checkbox
                name="availability"
                value={values.availability.toString()}
                onChange={(e) => {
                  setValues({
                    ...values,
                    [e.target.name]: e.target.checked,
                  });
                  setTouched({ ...touched, [e.target.name]: true });
                }}
              />
            </div>
          </div>

          {/* Quantity*/}

          <div className=" flex flex-row justify-between items-center mr-4 mt-5 gap-5 col-start-2 col-span-1">
            <Text className="text-black font-medium text-[15px] flex self-center ">
              Quantity
            </Text>
            <div className="join rounded-xl shadow-paginationShadow bg-tablePaginationShadow">
              <button
                className="join-item btn btn-sm rounded-tl-xl text-euvroWhite  border-none bg-darkBlue hover:bg-gradient-to-l from-darkBlue  to-darkBlue/60"
                onClick={() =>
                  setValues({ ...values, quantity: values.quantity - 1 })
                }
                disabled={values.quantity === 0 ? true : false}
              >
                <FaMinus size={15} />
              </button>
              <button className="join-item btn btn-sm bg-euvroWhite hover:bg-darkBlue mx-1">
                {values.quantity}
              </button>
              <button
                className="join-item btn btn-sm rounded-tr-xl text-euvroWhite border-none bg-darkBlue hover:bg-gradient-to-r from-darkBlue  to-darkBlue/60"
                onClick={() =>
                  setValues({ ...values, quantity: values.quantity + 1 })
                }
                // disabled={}
              >
                {' '}
                <FaPlus size={15} />
              </button>
            </div>

            {((touched.quantity && errors.quantity) as string) && (
              <Text className="mt-1 text-xs italic font-normal pl-4 text-error">
                {(touched.quantity && errors.quantity) as string}
              </Text>
            )}
          </div>

          {/* Description */}
          <div className="col-start-1 col-span-2 w-full">
            <Text className="text-black font-medium text-[15px]">
              Description
            </Text>
            <TextArea
              {...getFieldProps('productDescription')}
              className="border-[1px_solid_lightGray] lg:w-[500px] h-[118px] rounded-[5px] mt-2 remove-arrow bg-euvroWhite"
              placeholder="Enter Description"
              // type="number"
              errorMessage={
                (touched.productDescription &&
                  errors.productDescription) as string
              }
              daysAdornmentText={true}
            />
          </div>

          {/* Quantity */}
        </section>
      </Modal>
      {deleteModal && (
        <ConfirmationModal
          deleteModal={deleteModal}
          deleteToggleModal={deleteToggleModal}
          deleteLoading={deleteProductLoading}
          deleteFunction={handleDeleteProduct}
          deleteId={editId}
        />
      )}
      {responseLoader && <ScreenLoader isSuccessResponse={responseLoader} />}
    </div>
  );
};

export default Product;
