import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    // baseUrl: 'https://job-circular-server.vercel.app/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ["circulars", "auth", "bookmark", "notice"],
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: (params) => {
        return {
          url: "/circulars",
          method: "GET",
          params: params,
        }
      },
      providesTags: ['circulars'],
      keepUnusedDataFor: 300,
    }),
    createJob: builder.mutation({
      query: (data) => {
        return {
          url: "/circulars/post-circular",
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: ["circulars"]
    }),
    updateJob: builder.mutation({
      query: (data) => {
        return {
          url: `/circulars/update/${data._id}`,
          method: "PATCH",
          body: data,
        }
      },
      invalidatesTags: ["circulars"]
    }),
    getSingleJob: builder.query({
      query: (slug) => {
        return {
          url: `/circulars/single/${slug}`,
          method: "GET",
        }
      },
      providesTags: ["circulars"]
    }),
    deleteJob: builder.mutation({
      query: (jobId) => {
        return {
          url: `/circulars/delete/${jobId}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["circulars"]
    }),
    updateViews: builder.mutation({
      query: (id) => {
        return {
          url: `/circulars/views/${id}`,
          method: "POST",
        }
      },
      invalidatesTags: ["circulars"]
    }),
    analytics: builder.query({
      query: () => {
        return {
          url: `/circulars/analytics`,
          method: "GET",
        }
      },
      providesTags: ["circulars"]
    }),
    //Auth route
    registerUser: builder.mutation({
      query: (formData) => {
        console.log(formData);
        return {
          url: `/auth/register`,
          method: "POST",
          body: formData
        }
      },
      invalidatesTags: ["auth"]
    }),
    loginUser: builder.mutation({
      query: (formData) => {
        // console.log(data);
        return {
          url: `/auth/login`,
          method: "POST",
          body: formData
        }
      },
      invalidatesTags: ["auth"]
    }),
    forgetPassword: builder.mutation({
      query: (data) => {
        // console.log(email);
        return {
          url: `/auth/forget-password`,
          method: "POST",
          body: data
        }
      },
      invalidatesTags: ["auth"]
    }),
    resetPassword: builder.mutation({
      query: ({ email, newPassword, token }: { email: string; newPassword: string; token: string }) => {
        // console.log(email);
        return {
          url: `/auth/reset-password`,
          method: "POST",
          body: { email, newPassword },
          headers: {
            Authorization: `${token}`
          }
        }
      },
      invalidatesTags: ["auth"]
    }),
    getBookmark: builder.query({
      query: (userId) => {
        // console.log("API",userId);
        return {
          url: `/user/bookmark/${userId}`,
          method: "GET",
        }
      },
      providesTags: ["bookmark"]
    }),
    addBookmark: builder.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: `/user/bookmark/add/${data.userId}`,
          method: "PATCH",
          body: { jobId: data.jobId }
        }
      },
      invalidatesTags: ["bookmark"]
    }),
    removeBookmark: builder.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: `/user/bookmark/remove/${data.userId}`,
          method: "PATCH",
          body: { jobId: data.jobId }
        }
      },
      invalidatesTags: ["bookmark"]
    }),
    // Notice
    addNotice: builder.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: "/notice/create-notice",
          method: "POST",
          body: data
        }
      },
      invalidatesTags: ["notice"]
    }),
    allNotice: builder.query({
      query: () => "/notice",
      providesTags: ["notice"],
      keepUnusedDataFor: 300,       // ৫ মিনিট ক্যাশ রাখবে
    }),
  }),
});


export const {
  //job route
  useGetAllJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useGetSingleJobQuery,
  useUpdateViewsMutation,
  useDeleteJobMutation,
  //auth route
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  //bookmark route
  useGetBookmarkQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
  //Notice
  useAddNoticeMutation,
  useAllNoticeQuery,
  //Dashboard analytics
  useAnalyticsQuery,
} = baseApi;