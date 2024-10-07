/* eslint-disable react/jsx-pascal-case */
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useAddPetsStyle } from './style';
import {
  AnimatedInput,
  CustomButton,
  CustomText,
  showToast,
} from '../../../../components';

import { metrics, normalizeSize } from '../../../../util/metrics';
import { Colors, Svgs } from '@evuro-frontend/assets';
import AuthInformation from '../../../../components/ui/AuthInformation';
import AddMedia from '../../../../components/ui/AddMedia';
import { onCamera, onGallery } from '../../../../util/Halper';
import CustomDropdown from '../../../../components/base/CustomDropDown';
import { useAddPets } from '@evuro-frontend/hooks';
import { useNavigation } from '@react-navigation/native';
import {
  setShowDrawer,
  useAppDispatch,
  useGetPetsQuery,
} from '@evuro-frontend/store';
// import { useGetPetsQuery } from '@evuro-frontend/store';

const AddPets = ({ route }) => {
  // const { data } = useGetPetsQuery();
  // console.log('data=======', data);
  const { data, refetch } = useGetPetsQuery(null);

  const isSignUp = route?.params?.isSignUp;
  const addPets = route?.params?.addPets;
  const navigation = useNavigation();
  const styles = useAddPetsStyle();
  const dispatch = useAppDispatch();
  const { formik, isLoading } = useAddPets({
    resolve: (data) => handelAddPets(data),
  });

  // console.log('----asdf', addPets);
  // console.log('formik===', formik.values);

  const { values, errors, handleChange, handleSubmit, touched, resetForm } =
    formik;
  // console.log('values=========', values);

  const [pets, setPets] = useState([]);
  const [isEditPet, setIsEditPet] = useState(false);
  const [editingPetId, setEditingPetId] = useState(null);

  const genderData = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];

  // console.log('values?.images====', values?.images?.length);

  const handelAddPets = (response) => {
    console.log('responce==========', response);
    if (values?.images?.length > 12) {
      showToast('error', 'Only select 12 images');
    } else if (response?.error) {
      showToast('error', `${response?.error?.data?.message}`);
    } else {
      showToast('success', 'Pet has been added successfully');
    }
  };

  const inputs = Object.entries(values).slice(1);

  const getPlaceholder = (inputType) => {
    if (inputType === 'name') {
      return 'Enter pet name';
    } else if (inputType === 'age') {
      return 'Enter pet age';
    } else if (inputType === 'gender') {
      return 'Enter pet gender';
    } else if (inputType === 'size') {
      return 'Enter pet size';
    } else if (inputType === 'breed') {
      return 'Enter pet breed';
    }
  };

  const editPet = (id) => {
    const petToEdit = pets.find((pet) => pet.id === id);

    if (petToEdit) {
      formik.setValues({
        images: petToEdit.images,
        name: petToEdit.name,
        age: petToEdit.age,
        gender: petToEdit.gender,
        size: petToEdit.size,
        breed: petToEdit.breed,
      });
      setEditingPetId(id);
      setIsEditPet(true);
    }
  };

  const imageOption = {
    mediaType: 'photo',
    // cropping: true,
    quality: 0.8,
    compressImageQuality: 0.8,
    compressImageMaxHeight: 1280,
    compressImageMaxWidth: 1280,
    multiple: true,
    forceJpg: true,
  };

  const onCameraPick = () => {
    try {
      onCamera({
        imageOption,
        handleChange: (result) => {
          formik.setValues({
            ...values,
            images: [...values.images, result],
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onGalleryPick = () => {
    try {
      onGallery({
        imageOption,
        handleChange: (result) => {
          formik.setValues({
            ...values,
            images: [...values.images, ...result],
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePet = (id) => {
    if (editingPetId === id) {
      formik.setValues({
        images: [],
        name: '',
        age: '',
        gender: '',
        size: '',
        breed: '',
      });
      setPets(pets.filter((i) => i.id !== id));
    } else {
      setPets(pets.filter((i) => i.id !== id));
    }
  };

  const deleteImage = (path) => {
    formik.setValues({
      ...values,
      images: values.images.filter((i) => i.path !== path),
    });
  };

  const handlePets = () => {
    const hasEmptyFields = Object.values(values).some((value) => !value);

    if (hasEmptyFields) {
      console.log('Please fill out all required fields');
      handleSubmit();
    } else {
      if (isEditPet) {
        const updatedPets = pets.map((pet) =>
          pet.id === editingPetId ? { ...pet, ...values } : pet
        );
        // console.log('updatedPets=========', updatedPets);

        setPets(updatedPets);
        setIsEditPet(false);
        setTimeout(() => {
          formik.resetForm();
        }, 200);
      } else {
        setPets([...pets, { id: pets.length + 1, ...values }]);
        setTimeout(() => {
          formik.resetForm();
        }, 200);

        // formik.setValues({
        //   images: [],
        //   name: '',
        //   age: '',
        //   gender: '',
        //   size: '',
        //   breed: '',
        // });
      }

      handleSubmit();
    }
  };

  // console.log('pets=====', pets.lastIndexOf());

  const renderPetsList = useCallback(
    ({ item, index }) => {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.petContainer}>
            <View style={styles.petNameContainer}>
              <CustomText label={item.name} fontSize={14} />
            </View>
            <View style={styles.icons}>
              <Svgs.editIcon
                height={metrics.height(20)}
                style={styles.icon}
                onPress={() => editPet(item.id)}
              />
              <Svgs.DeleteIcon
                height={metrics.height(20)}
                style={styles.icon}
                onPress={() => deletePet(item.id)}
              />
            </View>
          </View>
          {index === pets.length - 1 && (
            <TouchableOpacity
              onPress={handlePets}
              activeOpacity={0.6}
              style={styles.addPetContainer}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <>
                  <Svgs.pawoutline />
                  <CustomText
                    label={`${isEditPet ? 'Update' : 'Add'} Pet`}
                    color={Colors.white}
                    fontSize={13}
                    marginLeft={metrics.width(10)}
                  />
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      );
    },
    [deletePet, values]
  );

  return (
    <AuthInformation
      petsArray={pets}
      isAddPets={addPets}
      title="Add Pets"
      subTitle="Add your pets. You can also add them later in settings."
      bottomTitle={'Not an Owner? '}
      bottomSubTitle={'Sign up as an Evuro™ Talent'}
      disabled={pets?.length > 0 ? false : true}
      onButtonPress={() => {
        if (pets?.length > 0) {
          dispatch(setShowDrawer(true));

          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'TabStack',
                params: { isSignUp },
              },
            ],
          });
        }
      }}
      onPress={() => {}}
      width="100%"
    >
      {pets.length > 0 ? (
        <FlatList
          horizontal
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          data={pets}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPetsList}
        />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={styles.petContainer}>
            <CustomText label={'No pets added yet'} fontSize={14} />
          </View>
          <TouchableOpacity
            onPress={handlePets}
            activeOpacity={0.6}
            style={styles.addPetContainer}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <>
                <Svgs.pawoutline />
                <CustomText
                  label={`${isEditPet ? 'Update' : 'Add'} Pet`}
                  color={Colors.white}
                  fontSize={13}
                  marginLeft={metrics.width(10)}
                />
              </>
            )}
          </TouchableOpacity>
        </View>
      )}

      <View>
        <AddMedia
          heading="Attach image your pets "
          onCameraPress={onCameraPick}
          onGalleryPress={onGalleryPick}
          images={values.images}
          OndeleteImage={deleteImage}
          borderColor={
            touched.images && errors.images && values.images.length === 0
              ? Colors.red
              : Colors.lightGray
          }
        />
        {touched.images && errors.images && values.images.length === 0 && (
          <CustomText
            label={errors.images.toString()}
            color={Colors.red}
            fontSize={13}
            marginLeft={metrics.width(12)}
            marginTop={metrics.height(5)}
          />
        )}

        <View style={styles.inputs}>
          {inputs.map(([key, value], i) => {
            return (
              <View style={styles.input} key={i}>
                {key === 'gender' ? (
                  <CustomDropdown
                    label={'Select Pet Gender'}
                    value={value.toString()}
                    setValue={(e) => handleChange(key)(e)}
                    data={genderData}
                    errorMessage={
                      formik.touched[key] && formik.errors[key]
                        ? formik.errors[key]
                        : ''
                    }
                    borderColor={
                      formik.touched[key] && formik.errors[key]
                        ? Colors.red
                        : Colors.lightGray
                    }
                  />
                ) : (
                  <AnimatedInput
                    keyboardType={
                      key === 'age' || key === 'size' ? 'numeric' : 'default'
                    }
                    value={value.toString()}
                    onChange={(e) => handleChange(key)(e)}
                    placeholder={getPlaceholder(key)}
                    errorMessage={
                      touched[key] && errors[key] ? errors[key] : ''
                    }
                    borderColor={
                      touched[key] && errors[key]
                        ? Colors.red
                        : Colors.lightGray
                    }
                  />
                )}
              </View>
            );
          })}
        </View>
      </View>
    </AuthInformation>
  );
};

export default AddPets;
