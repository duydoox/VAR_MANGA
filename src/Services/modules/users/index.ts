import { apiDefault } from '@/Services/api'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { store } from '@/Store'
import { BookT } from '../books'
import { setMessage } from '@/Store/Global'

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
      bookId: number
      callback?: (response?: any) => void
    }
  >({
    query: ({ ...body }) => ({
      url: store.getState().config.apiUrl + '/user/v1/like-book',
      method: 'POST',
      body: { bookId: body.bookId },
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
    invalidatesTags: ['Like'],
  })

const handleUnLikeBook = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    any,
    {
      bookId: number
      callback?: (response?: any) => void
    }
  >({
    query: ({ ...body }) => ({
      url: store.getState().config.apiUrl + '/user/v1/unLike-book',
      method: 'POST',
      body: { bookId: body.bookId },
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
    invalidatesTags: ['Like'],
  })

const handleGetBookLiked = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    {
      content: BookT[]
    },
    {
      userId: number
      callback?: (response?: { content: BookT[] }) => void
    }
  >({
    query: ({ ...params }) => ({
      url: store.getState().config.apiUrl + '/user/v1/get-books-liked',
      method: 'GET',
      params: { ...params, userid: params.userId, page: 1, size: 100 },
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
    providesTags: ['Like'],
  })

const handleGetPayment = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    any,
    {
      userId: number
      coin?: number
      callback?: (response?: { content: BookT[] }) => void
    }
  >({
    query: ({ ...params }) => ({
      url: store.getState().config.apiUrl + '/user/v1/load-coin',
      method: 'GET',
      params: { coin: 100, ...params },
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
    keepUnusedDataFor: 1,
  })

const handleOpenPremium = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    any,
    {
      userId: number
      callback?: (response?: { content: BookT[] }) => void
    }
  >({
    query: ({ ...params }) => ({
      url: store.getState().config.apiUrl + '/user/v1/open-premium',
      method: 'GET',
      params: { userId: params.userId },
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

    async onQueryStarted(args, { queryFulfilled, dispatch }) {
      try {
        const { data } = await queryFulfilled
        dispatch(setMessage({ message: 'Bạn đã mở Premium thành công' }))
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
    handleGetPayment: handleGetPayment(build),
    handleOpenPremium: handleOpenPremium(build),
    handleUnLikeBook: handleUnLikeBook(build),
  }),
  overrideExisting: false,
})

export const {
  useRegisterMutation,
  useHandleForgotPasswordQuery,
  useHandleChangePasswordMutation,
  useHandleGetBookLikedQuery,
  useHandleLikeBookMutation,
  useHandleGetPaymentQuery,
  useLazyHandleOpenPremiumQuery,
  useHandleUnLikeBookMutation,
} = userApi
