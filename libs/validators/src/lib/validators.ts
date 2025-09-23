// export function validators(): string {
//   return 'validators';
// }

import * as Yup from 'yup';
import moment from 'moment';
import { FILE } from 'dns';
import { useDeleteUserMutation } from '@evuro-frontend/store';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

const ageRegex = /^[0-9]+$/;
const sizeRegex = /^[0-9]+(?:\.[0-9]+)?$/;

// Email validation schema
export const emailSchema = Yup.string()
  .matches(emailRegex, 'Invalid email address')
  .required('Email is required');

// Password validation schema
export const passwordSchema = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .matches(
    passwordRegex,
    'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character'
  )
  .required('Password is required');

export const confirmPassword = Yup.string()
  .required('Confirm Password is required')
  .oneOf([Yup.ref('password'), null], 'Passwords must match');

export const CurrentPassword = Yup.string().required(
  'Current Password is required'
);

export const signUpimageSchema = Yup.string().required('Image is required');
const imageSchema = Yup.object().shape({}).required('Image is required');

export const fullNameSchema = Yup.string()
  .min(2)
  .max(30)
  .required('User name is required');

// export const locationSchema = Yup.object()
//   .shape({})
//   .required('Location is required');

export const locationSchema = Yup.object()
  .shape({
    latitude: Yup.number().required('Location is required'),
    longitude: Yup.number().required('Location is required'),
  })
  .test('location', 'Invalid location details', function (value) {
    const { latitude, longitude } = value || {};
    if (!latitude || !longitude) {
      return this.createError({
        path: 'location',
        message: 'Location is required',
      });
    }
    return true;
  });

export const otpSchema = Yup.string().min(4).required('OTP is required');

export const petNameSchema = Yup.string()
  .min(2)
  .max(30)
  .required('Pet name is required');

export const petAgeSchema = Yup.string()
  .matches(ageRegex, 'Invalid age address')
  .required('Age is required');

export const GenderSchema = Yup.object().shape({
  label: Yup.string().required('Gender is required'),
  value: Yup.string().required('Gender is required'),
});

export const sizeSchema = Yup.string()
  .matches(sizeRegex, 'Invalid size address')
  .required('Size is required');

export const ratePerHour = Yup.string()
  .matches(sizeRegex, 'Invalid rate')
  .required('Rate is required');

export const petBreedSchema = Yup.string()
  .min(2)
  .max(30)
  .required('Pet breed is required');

export const additionalBreedSchema = Yup.string()
  .min(2)
  .max(30)
  .required('Breed name is required');

export const gigVideoSchema = Yup.object().required('Gig video is required');

export const bioSchema = Yup.string().min(2).required('Bio is required');

export const loginSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = Yup.object().shape({
  image: signUpimageSchema,
  fullName: fullNameSchema,
  email: emailSchema,
  password: passwordSchema,
  location: locationSchema,
});

export const imageValidator = Yup.mixed().test(
  'isNotNull',
  'Image is required',
  (value) => {
    return value !== null;
  }
);

export const updateProfileSchema = Yup.object().shape({
  image: imageSchema,
  name: fullNameSchema,
  email: emailSchema,
  address: Yup.string().required('Address is required'),
});

export const updateAdminProfileSchema = Yup.object().shape({
  image: imageValidator,
  name: fullNameSchema,
});

export const validationPassword = Yup.object().shape({
  password: passwordSchema,
  confirmPassword: confirmPassword,
});

export const validationResetPassword = Yup.object().shape({
  password: passwordSchema,
  confirmPassword: confirmPassword,
});

export const validationChangePassword = Yup.object().shape({
  currentPassword: CurrentPassword,
  password: passwordSchema,
  confirmPassword: confirmPassword,
});

export const forgotPasswordSchema = Yup.object().shape({
  email: emailSchema,
});

export const validOtpSchema = Yup.object().shape({
  otp: otpSchema,
});

export const validAddPetsSchema = Yup.object().shape({
  images: Yup.array().of(imageSchema).min(1, 'At least one image is required'),
  name: petNameSchema,
  age: petAgeSchema,
  // gender: GenderSchema,
  gender: Yup.string().required('Gender is required'),
  size: sizeSchema,
  breed: petBreedSchema,
});

export const validAdditionalInformationSchema = Yup.object().shape({
  bio: bioSchema,
  breedName: additionalBreedSchema,
  age: petAgeSchema,
  ratePerHour: ratePerHour,
  video: gigVideoSchema,
  images: Yup.array().of(imageSchema).min(1, 'At least one image is required'),
});

export const validBillingAddressSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Name must be at least 3 length')
    .max(30)
    .required('User name is required'),
  address1: Yup.string()
    .min(3, 'Address must be at least 3 length')
    .max(50)
    .required('Address1 is required'),

  city: Yup.string().min(2).max(30).required('City is required'),
  mobileNo: Yup.string().min(2).max(30).required('Mobile no. is required'),
  state: Yup.string().min(2).max(30).required('State is required'),
  zipCode: Yup.string().min(2).max(30).required('ZipCode is required'),
});

export const dateSchema = Yup.string()
  .required('Date is required')
  .test('is-iso-date', 'Invalid date format', (value) => {
    return moment(value, moment.ISO_8601, true).isValid();
  });

export const addAdminProductSchema = Yup.object().shape({
  productName: Yup.string().required('Product is required'),
  availability: Yup.boolean().required('Availability is required'),
  price: Yup.number().required('Price is required'),
  standardDelivery: Yup.number().required('Delivery Charges are required'),
  duration: Yup.number().required('Please enter delivery days'),
  productDescription: Yup.string().required('Product description is required'),
  quantity: Yup.number()
    .min(1, 'Minimum Quantity is 1')
    .required('Quantity is required'),
  image: Yup.mixed().required('File is  required'),
});
export const useDeleteUser = () => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const deleteUserAsync = async () => {
    try {
      const res = await deleteUser();
      console.log('res======', res);
      return res;
    } catch (error) {
      console.log('error=====', error);
      throw error;
    }
  };

  return { deleteUserAsync, isLoading };
};
