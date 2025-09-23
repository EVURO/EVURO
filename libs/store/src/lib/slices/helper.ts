import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseQueryRtk = fetchBaseQuery({
  baseUrl: API_ROUTES.BASE_URL,
  credentials: 'same-origin',
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem('isAuth');
    // console.log('token=======', token);

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
