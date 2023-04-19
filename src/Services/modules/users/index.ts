import { api } from '@/Services/api'
import fetchOne from './fetchOne'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { store } from '@/Store'

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

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    fetchOne: fetchOne(build),
    register: register(build),
  }),
  overrideExisting: false,
})

export const { useLazyFetchOneQuery, useRegisterMutation } = userApi
