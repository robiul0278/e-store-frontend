import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:5000/api/v1',
    baseUrl: 'https://e-store-backend-rho.vercel.app/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ["products", "auth", "orders"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (params) => {
        return {
          url: "/products",
          method: "GET",
          params: params,
        }
      },
      providesTags: ['products'],
    }),
    createProduct: builder.mutation({
      query: (data) => {
        return {
          url: "/products/create",
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: ["products"]
    }),
    updateProduct: builder.mutation({
      query: (FormData) => {
        return {
          url: `/products/update`,
          method: "PATCH",
          body: FormData,
        }
      },
      invalidatesTags: ["products"]
    }),
    getSingleProduct: builder.query({

      query: (slug) => {
        console.log(slug);
        return {
          url: `/products/single/${slug}`,
          method: "GET",
        }
      },
      providesTags: ["products"]
    }),
    deleteProduct: builder.mutation({
      query: (jobId) => {
        return {
          url: `/products/delete/${jobId}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["products"]
    }),
    updateProductStatus: builder.mutation({
      query: (Status) => {
        return {
          url: `/products/update-status/${Status.id}`,
          method: "PATCH",
          body: Status
        }
      },
      invalidatesTags: ["products"]
    }),
    dashboardAnalytics: builder.query({
      query: () => {
        return {
          url: `/products/analytics`,
          method: "GET",
        }
      },
      providesTags: ["products","auth","orders"]
    }),
    //Manage Auth route ✅
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
    getAllUsers: builder.query({
      query: (params) => {
        return {
          url: "/auth",
          method: "GET",
          params: params,
        }
      },
      providesTags: ['auth'],
    }),
    deleteUser: builder.mutation({
      query: (userId) => {
        return {
          url: `/auth/delete/${userId}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["auth"]
    }),
    updateRole: builder.mutation({
      query: (userData) => {
        return {
          url: `/auth/update/${userData.id}`,
          method: "PATCH",
          body: userData,
        }
      },
      invalidatesTags: ["auth"]
    }),
    // Manage Order Route ✅
    getAllOrders: builder.query({
      query: (params) => {
        return {
          url: `/orders`,
          method: "GET",
          params: params
        }
      },
      providesTags: ["orders"]
    }),
    createOrders: builder.mutation({
      query: (orderData) => {
        return {
          url: `/orders/create`,
          method: "POST",
          body: orderData
        }
      },
      invalidatesTags: ["orders"]
    }),
    deleteOrder: builder.mutation({
      query: (userId) => {
        return {
          url: `/orders/delete/${userId}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["orders"]
    }),
    updateOrderStatus: builder.mutation({
      query: (status) => {
        return {
          url: `/orders/update/${status.id}`,
          method: "PATCH",
          body: status
        }
      },
      invalidatesTags: ["orders"]
    }),
  }),
});


export const {
  //job route
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
  useDashboardAnalyticsQuery,
  //auth route
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateRoleMutation,
  //Order route
  useGetAllOrdersQuery,
  useCreateOrdersMutation,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation
} = baseApi;