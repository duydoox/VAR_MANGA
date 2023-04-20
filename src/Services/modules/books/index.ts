import { apiBook } from '@/Services/api'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { store } from '@/Store'

export type BookT = {
  title: string
  content: string
  shortDescription?: string
  categories?: string
  tags?: string
  thumbnail?: string
  thumbnailUrl?: string
  name?: string
}

const handleSearchBook = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    { content: BookT[] },
    {
      categories?: string
      title?: string
      callback?: (response?: { content: BookT[] }) => void
    }
  >({
    query: ({ ...params }) => ({
      url: store.getState().config.apiUrl + '/book/v1/search',
      method: 'GET',
      params: params,
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

export const bookApi = apiBook.injectEndpoints({
  endpoints: build => ({
    handleSearchBook: handleSearchBook(build),
  }),
  overrideExisting: false,
})

export const { useHandleSearchBookQuery } = bookApi
