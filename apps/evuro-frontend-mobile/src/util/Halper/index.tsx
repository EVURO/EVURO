import { openCamera, openPicker } from 'react-native-image-crop-picker';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const placeholderImage =
  'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const onCamera = ({ imageOption, handleChange }) => {
  try {
    setTimeout(async () => {
      const result = await openCamera(imageOption);
      if (result) {
        handleChange(result);
      }
    }, 500);
  } catch (error) {
    console.log('takePhotoFromCamera error', error);
  }
};

export const onGallery = async ({ imageOption, handleChange }) => {
  try {
    setTimeout(async () => {
      const result = await openPicker(imageOption);
      if (result) {
        handleChange(result);
      }
    }, 1000);
  } catch (error) {
    console.log('takePhotoFromLibrary error', error);
  }
};

export const handleLargerText = (
  text: string | undefined,
  textLength: number
): string => {
  if (text?.length > textLength) {
    return text.substring(0, textLength).concat('...');
  } else {
    return text || '';
  }
};

GoogleSignin.configure({
  webClientId:
    '18688854154-4m2pv5j1erp3cpmvk7hthvimmbo1qn8k.apps.googleusercontent.com',
  iosClientId:
    '18688854154-hl8b55rip17tkstotf1vg95s901c5e12.apps.googleusercontent.com',
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    GoogleSignin.signOut();
    return userInfo;
  } catch (error) {
    console.log('errorssssssssss===', error);
  }
};
