import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryRtk } from '../helper';
import { API_ROUTES } from '../../routes';

export const UserApi = createApi({
  reducerPath: 'UserApi',
  tagTypes: ['User'],
  baseQuery: baseQueryRtk,
  endpoints: (build) => ({
    SignUP: build.mutation({
      query: (payload) => {
        const url = API_ROUTES.signUp;
        console.log('SignUP_Url=====', url, payload);
        // console.log('payload===', payload);
        return {
          url: url,
          method: 'POST',
          body: payload,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
    }),
    Login: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.login,
          method: 'POST',
          body: payload,
        };
      },
    }),
    forgotPassword: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.forgotPassword,
          method: 'POST',
          body: payload,
        };
      },
    }),
    verifyOtp: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.verifyOtp,
          method: 'POST',
          body: payload,
        };
      },
    }),
    resendOtp: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.resendOtp,
          method: 'POST',
          body: payload,
        };
      },
    }),
    resetPassword: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.resetPassword,
          method: 'POST',
          body: payload,
        };
      },
    }),
    addPets: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.addPets,
          method: 'POST',
          body: payload,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
    }),
    updatePet: build.mutation({
      query: (id) => {
        return {
          url: `${API_ROUTES.updatePet}/${id}`,
          method: 'PUT',
        };
      },
    }),
    getUsers: build.query({
      query: (id) => {
        const url = `${API_ROUTES.users}?userId=${id}`;
        // console.log('getUsers_url====', url);
        return {
          url: url,
          method: 'GET',
        };
      },
      providesTags: ['User'],
    }),
    getUserReports: build.query({
      query: () => {
        const url = `${API_ROUTES.getUserReports}`;
        return {
          url: url,
          method: 'GET',
        };
      },
      providesTags: ['User'],
    }),
    getProducts: build.query({
      query: (id) => {
        const url = id
          ? `${API_ROUTES.getProductsByID}?productId=${id}`
          : `${API_ROUTES.getProducts}`;

        return {
          url: url,
          method: 'GET',
        };
      },
    }),

    getImageUrl: build.query({
      query: (image) => {
        const url = `${API_ROUTES.getImageUrl}?filename=${image}`;
        return {
          url: url,
          method: 'GET',
        };
      },
    }),
    getPetVideoUrl: build.query({
      query: (image) => {
        const url = `${API_ROUTES.getPetVideo}?filename=${image}`;
        return {
          url: url,
          method: 'GET',
        };
      },
    }),
    getTalents: build.query({
      query: (id) => {
        const url = id
          ? `${API_ROUTES.getTalents}?userId=${id}`
          : `${API_ROUTES.getTalents}`;

        return {
          url: url,
          method: 'GET',
        };
      },
    }),
    logoutUser: build.mutation({
      query: () => {
        return {
          url: API_ROUTES.logoutUser,
          method: 'POST',
        };
      },
    }),
    changePassword: build.mutation({
      query: (payload) => {
        console.log('change password payload==', payload);
        return {
          url: API_ROUTES.changePassword,
          method: 'PATCH',
          body: payload,
        };
      },
    }),

    getPets: build.query({
      query: () => {
        const url = `${API_ROUTES.getPets}`;
        return {
          url: url,
          method: 'GET',
        };
      },
    }),
    createPetWalkerPlan: build.mutation({
      query: ({ payload }) => {
        console.log('create walk payload======', payload);
        return {
          url: API_ROUTES.createPetWalkerPlan,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['User'],
    }),
    getAllPets: build.query({
      query: (id) => {
        const url = id
          ? `${API_ROUTES.getAllPets}?petId=${id}`
          : `${API_ROUTES.getAllPets}`;

        return {
          url: url,
          method: 'GET',
        };
      },
    }),
    additionalInfo: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.additionalInfo,
          method: 'POST',
          body: payload,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
      invalidatesTags: ['User'],
    }),
    deleteUser: build.mutation({
      query: () => {
        return {
          url: API_ROUTES.deleteUser,
          method: 'DELETE',
        };
      },
    }),
    updateUserProfle: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.editUserProfile,
          method: 'PATCH',
          body: payload,
        };
      },
    }),
    getPetWalkerPlan: build.query({
      query: ({ startDate, endDate, status }) => {
        let url = `${API_ROUTES.getPetWalkerPlan}`;
        if (startDate || endDate) {
          url += `?fromDate=${startDate || ''}&toDate=${
            endDate || ''
          }&status=${status}`;
        } else if (status) {
          url += `?status=${status}`;
        }

        // console.log('url=====', url);

        return {
          url: url,
          method: 'GET',
        };
      },
    }),
    getMyWalkerPlan: build.query({
      query: (status) => {
        const url = `${API_ROUTES.getMyWalkerPlan}?status=${status}`;
        // console.log('url===', url);

        return {
          url: url,
          method: 'GET',
        };
      },
    }),

    updateWalkerPlanStatus: build.mutation({
      query: ({ payload, planId }) => {
        return {
          url: `${API_ROUTES.updateWalkerPlanStatus}/${planId}`,
          method: 'PATCH',
          body: payload,
        };
      },
      invalidatesTags: ['User'],
    }),

    getVideoUrl: build.query({
      query: () => {
        const url = `${API_ROUTES.dashBoard}`;
        return {
          url: url,
          method: 'GET',
        };
      },
    }),
    toggleFavoriteTalent: build.mutation({
      query: (id) => {
        const url = `${API_ROUTES.toggleFavoriteTalent}/${id}`;
        console.log('toggleFavoriteTalent_url======', url);
        return {
          url: url,
          method: 'POST',
        };
      },
    }),
    getFavoriteTalents: build.query({
      query: () => {
        const url = `${API_ROUTES.getFavoriteTalents}`;
        return {
          url: url,
          method: 'GET',
        };
      },
    }),
    searchDogWalkers: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.searchDogWalkers,
          method: 'POST',
          body: payload,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    acceptOrRejectWalkerPlan: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.acceptOrRejectWalkerPlan,
          method: 'POST',
          body: payload,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
  }),
});

export const {
  useSignUPMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useAddPetsMutation,
  useUpdatePetMutation,
  useGetUsersQuery,
  useGetUserReportsQuery,
  useGetProductsQuery,
  useGetImageUrlQuery,
  useGetPetVideoUrlQuery,
  useGetTalentsQuery,
  useLogoutUserMutation,
  useGetPetsQuery,
  useAdditionalInfoMutation,
  useChangePasswordMutation,
  useDeleteUserMutation,
  useCreatePetWalkerPlanMutation,
  useGetPetWalkerPlanQuery,
  useGetMyWalkerPlanQuery,
  useGetAllPetsQuery,
  useGetVideoUrlQuery,
  useUpdateUserProfleMutation,
  useSearchDogWalkersMutation,
  useAcceptOrRejectWalkerPlanMutation,
  useUpdateWalkerPlanStatusMutation,
} = UserApi;
