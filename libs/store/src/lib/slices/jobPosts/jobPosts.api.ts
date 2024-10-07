import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryRtk } from '../helper';
import { API_ROUTES } from '../../routes';

export const JobPostsApi = createApi({
  reducerPath: 'JobPostsApi',
  tagTypes: ['jobPosts'],
  baseQuery: baseQueryRtk,
  endpoints: (build) => ({
    createJob: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.createJob,
          method: 'POST',
          body: payload,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
      invalidatesTags: ['jobPosts'],
    }),
    getAllJobs: build.query({
      query: () => {
        return {
          url: API_ROUTES.getAvailableJobs,
          method: 'GET',
        };
      },
      providesTags: ['jobPosts'],
    }),
    getJobs: build.query({
      query: () => {
        return {
          url: API_ROUTES.getPostedJobs,
          method: 'GET',
        };
      },
      providesTags: ['jobPosts'],
    }),
    applyForJob: build.mutation({
      query: ({ id }) => {
        const payload = { jobId: id };
        return {
          url: `${API_ROUTES.applyForJob}/${id}`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['jobPosts'],
    }),
    getApplicationsForJob: build.query({
      query: (id) => {
        return {
          url: `${API_ROUTES.getApplicationsForJob}/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['jobPosts'],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetApplicationsForJobQuery,
  useGetJobsQuery,
  useGetAllJobsQuery,
  useApplyForJobMutation,
} = JobPostsApi;
