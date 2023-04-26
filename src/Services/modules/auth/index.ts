import { apiAuth } from '@/Services/api'
import { setToken } from '@/Store/Auth'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { store } from '@/Store'
import jwtDecode from 'jwt-decode'
import { setDefaultUsername } from '@/Store/Config'

export type authT = {
  accessToken: string
  refreshToken: string
  username: string
}

const login = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    { responseData: authT },
    {
      username: string
      password: string
      callback?: (response?: { responseData: authT }) => void
    }
  >({
    query: ({ ...post }) => ({
      url: store.getState().config.apiUrl + '/auth/v1/login',
      method: 'POST',
      body: post,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.(response)
      return response
    },
    // The 2nd parameter is the destructured `MutationLifecycleApi`

    async onQueryStarted(args, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        const decode: { userId: number } = jwtDecode(
          data?.responseData.accessToken,
        )
        dispatch(
          setToken({
            token: data?.responseData.accessToken,
            username: data?.responseData.username,
            userId: decode?.userId,
          }),
        )
        dispatch(
          setDefaultUsername({
            defaultUsername: args.username,
          }),
        )
      } catch {
      } finally {
        args.callback?.()
      }
    },
  })

const registerEmail = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    any,
    {
      username: string
      password: string
      callback?: (response?: any) => void
    }
  >({
    query: ({ ...post }) => ({
      url: store.getState().config.apiUrl + '/auth/v1/register',
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

export const authService = apiAuth.injectEndpoints({
  endpoints: build => ({
    login: login(build),
    registerEmail: registerEmail(build),
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useRegisterEmailMutation } = authService
