import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://44d1a7ae-backend.brazilservergame96.workers.dev',
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if(token){
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
})

const userRoute = "/api/v1/user";
const blogRoute = "/api/v1/blog";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery,

  endpoints: (builder) => ({

    // For Users
    getUsers: builder.query({
      query: () => userRoute
    }),

    getProfile: builder.query({
      query: () => `${userRoute}/me`
    }),

    userSignUp: builder.mutation({
      query: (data) => ({
        url: `${userRoute}/signup`,
        method: 'POST',
        body: data
      })
    }),

    userSignIn: builder.mutation({
      query: (data) => ({
        url: `${userRoute}/signin`,
        method: 'POST',
        body: data
      })
    }),

    // For Blogs 
    getAllBlogs: builder.query({
      query: () => `${blogRoute}/bulk`
    }),

    getUserBlog: builder.query({
      query: () => `${blogRoute}/my-blogs`
    }),

    getBlog: builder.query({
      query: (id) => `${blogRoute}/${id}`
    }),

    newBlog: builder.mutation({
      query: (data) => ({
        url: blogRoute,
        method: 'POST',
        body: data
      })
    }),

    updateBlog: builder.mutation({
      query: (data) => ({
        url: blogRoute,
        method: 'PUT',
        body: data
      })
    })
  })
});

export const {
  useGetUsersQuery,
  useGetProfileQuery,
  useUserSignUpMutation,
  useUserSignInMutation,
  useGetAllBlogsQuery,
  useGetUserBlogQuery,
  useGetBlogQuery,
  useNewBlogMutation,
  useUpdateBlogMutation
} = blogApi;