import { apiDefault } from '@/Services/api'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { store } from '@/Store'
import { BookT } from '../books'

const register = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    any,
    {
      username: string
      password: string
      callback?: (response?: any) => void
    }
  >({
    query: ({ ...post }) => ({
      url: store.getState().config.apiUrl + '/user/v1/addUser',
      method: 'POST',
      body: { ...post, email: post.username },
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: response => {
      // arg.callback?.(response)
      return response
    },
    // The 2nd parameter is the destructured `MutationLifecycleApi`

    async onQueryStarted(args, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        args.callback?.(data)
      } catch {
      } finally {
      }
    },
  })

const handleForgotPassword = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    any,
    {
      callback?: (response?: any) => void
    }
  >({
    query: () => ({
      url: store.getState().config.apiUrl + '/user/v1/forgot-password',
      method: 'POST',
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: response => {
      // arg.callback?.(response)
      return response
    },
    // The 2nd parameter is the destructured `MutationLifecycleApi`

    async onQueryStarted(args, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        args.callback?.(data)
      } catch {
      } finally {
      }
    },
  })

const handleChangePassword = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    any,
    {
      usernameOrEmail: string
      password: string
      token: string
      callback?: (response?: any) => void
    }
  >({
    query: ({ ...post }) => ({
      url: store.getState().config.apiUrl + '/user/v1/get-books-liked',
      method: 'POST',
      body: { ...post },
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: response => {
      // arg.callback?.(response)
      return response
    },
    // The 2nd parameter is the destructured `MutationLifecycleApi`

    async onQueryStarted(args, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        args.callback?.(data)
      } catch {
      } finally {
      }
    },
  })

const handleLikeBook = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    any,
    {
      userid: number
      bookid: number
      callback?: (response?: any) => void
    }
  >({
    query: ({ ...body }) => ({
      url: store.getState().config.apiUrl + '/user/v1/like-book',
      method: 'POST',
      params: { userid: body.userid, bookid: body.bookid },
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: response => {
      // arg.callback?.(response)
      return response
    },
    // The 2nd parameter is the destructured `MutationLifecycleApi`

    async onQueryStarted(args, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        args.callback?.(data)
      } catch {
      } finally {
      }
    },
  })

const handleGetBookLiked = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    {
      content: BookT[]
    },
    {
      userid: number
      callback?: (response?: { content: BookT[] }) => void
    }
  >({
    query: ({ ...params }) => ({
      url: store.getState().config.apiUrl + '/user/v1/get-books-liked',
      method: 'GET',
      params: { ...params, page: 1, size: 100 },
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: response => {
      // arg.callback?.(response)
      return response
    },
    // The 2nd parameter is the destructured `MutationLifecycleApi`

    async onQueryStarted(args, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        args.callback?.(data)
      } catch {
      } finally {
      }
    },
  })

export const userApi = apiDefault.injectEndpoints({
  endpoints: build => ({
    // fetchOne: fetchOne(build),
    register: register(build),
    handleForgotPassword: handleForgotPassword(build),
    handleChangePassword: handleChangePassword(build),
    handleLikeBook: handleLikeBook(build),
    handleGetBookLiked: handleGetBookLiked(build),
  }),
  overrideExisting: false,
})

export const {
  useRegisterMutation,
  useHandleForgotPasswordQuery,
  useHandleChangePasswordMutation,
  useHandleGetBookLikedQuery,
  useHandleLikeBookMutation,
} = userApi
