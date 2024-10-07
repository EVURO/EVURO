import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginData: {},
  alert: { visible: false, variant: '', message: '' },
  token: '',
  tempImage: null,
  signUpData: {},
  additionalInfoData: {},
  showUserTypeModal: false,
  isLoading: false,
  isVisitor: false,
  showDrawer: false,
  saveAddress: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.loginData = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    setTempImage: (state, action) => {
      state.tempImage = action.payload;
    },
    setSignUpData: (state, action) => {
      state.signUpData = action.payload;
    },
    setAdditionalInfoData: (state, action) => {
      state.additionalInfoData = action.payload;
    },
    setShowUserTypeModal: (state, action) => {
      state.showUserTypeModal = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsVisitor: (state, action) => {
      state.isVisitor = action.payload;
    },
    setShowDrawer: (state, action) => {
      state.showDrawer = action.payload;
    },
    setOrderAddress: (state, action) => {
      state.saveAddress = action.payload;
    },
  },
});

export const {
  setLoginData,
  setToken,
  setTempImage,
  setSignUpData,
  setAdditionalInfoData,
  setShowUserTypeModal,
  setAlert,
  setIsLoading,
  setIsVisitor,
  setShowDrawer,
  setOrderAddress,
} = userSlice.actions;
export default userSlice.reducer;
