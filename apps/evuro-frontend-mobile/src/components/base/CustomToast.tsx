import React from 'react';
import { Platform } from 'react-native';
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';
import { Colors } from '@evuro-frontend/assets';
/*
  1. Create the config
*/
export const toastConfig = {
  /*
        Overwrite 'success' type,
        by modifying the existing `BaseToast` component
      */
  success: ({ ...props }) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: Colors.success,
        borderLeftColor: Colors.success,
        marginTop: Platform.OS === 'ios' ? 10 : -40,
        width: '90%',
      }}
      text1Style={{
        fontSize: 15,
        color: Colors.white,
      }}
      text2Style={{
        fontSize: 12,
        color: Colors.white,
      }}
    />
  ),
  /*
        Overwrite 'error' type,
        by modifying the existing `ErrorToast` component
      */
  error: ({ text1Style, text2Style, ...props }) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: Colors.error,
        borderLeftColor: Colors.error,
        marginTop: Platform.OS === 'ios' ? 10 : -40,
        width: '90%',
        zIndex: 1,
      }}
      text1Style={{
        fontSize: 15,
        color: Colors.white,
      }}
      text2Style={{
        fontSize: 12,
        color: Colors.white,
      }}
    />
  ),
  /*
        Overwrite 'info' type,
        by modifying the existing `InfoToast` component
      */
  info: ({ text1Style, text2Style, ...props }) => (
    <InfoToast
      {...props}
      style={{
        backgroundColor: Colors.info,
        borderLeftColor: Colors.info,
        marginTop: Platform.OS === 'ios' ? 10 : -40,
        width: '90%',
      }}
      text1Style={{
        fontSize: 15,
        color: Colors.white,
      }}
      text2Style={{
        fontSize: 12,
        color: Colors.white,
      }}
    />
  ),
};

export const showToast = (
  type: string,
  heading: string,
  description?: string
) => {
  // let heading =
  //   type == "success" ? "Success!" : type == "error" ? "Error!" : "info!";

  Toast.show({
    type: type,
    text1: heading,
    text2: description,
  });
};
