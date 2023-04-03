import { apiAuth } from '@/Services/api'
import { setToken } from '@/Store/Auth'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { store } from '@/Store'

export type authT = {
  accessToken: string
  refreshToken: string
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
      url:
        `http://${store.getState().config.apiUrl}:8080/api` + '/auth/v1/login',
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
        dispatch(
          setToken({
            token: data?.responseData.accessToken,
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
