import { api } from '@/Services/api'
import fetchOne from './fetchOne'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { store } from '@/Store'
import { BookT } from '../books'
import { ChapterT } from '../chapters'

export type HistoryBookT = {
  id: number
  book: BookT
  recentlyChapter: ChapterT
}

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

const handleGetHistoryBook = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    {
      content: HistoryBookT[]
    },
    {
      callback?: (response?: { content: HistoryBookT[] }) => void
    }
  >({
    query: () => ({
      url: store.getState().config.apiUrl + '/user/v1/reading-history',
      method: 'GET',
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
    handleGetHistoryBook: handleGetHistoryBook(build),
  }),
  overrideExisting: false,
})

export const {
  useLazyFetchOneQuery,
  useRegisterMutation,
  useHandleGetHistoryBookQuery,
} = userApi
