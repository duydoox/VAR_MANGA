import { apiAuth } from '@/Services/api'
import { setToken } from '@/Store/Auth'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { store } from '@/Store'
import jwtDecode from 'jwt-decode'

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
      } catch {
      } finally {
        args.callback?.()
      }
    },
  })

export const authService = apiAuth.injectEndpoints({
  endpoints: build => ({
    login: login(build),
  }),
  overrideExisting: false,
})

export const { useLoginMutation } = authService
