import { apiDefault } from '@/Services/api'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { store } from '@/Store'

export type TagsT = {
  tagId: number
  tagNametagName: string
  description: string
}

const handleSearchTags = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    { content: TagsT[] },
    {
      name?: string
      callback?: (response?: { content: TagsT[] }) => void
    }
  >({
    query: ({ ...params }) => ({
      url: store.getState().config.apiUrl + '/tag/v1/search',
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

export const categoryApi = apiDefault.injectEndpoints({
  endpoints: build => ({
    handleSearchTags: handleSearchTags(build),
  }),
  overrideExisting: false,
})

export const { useHandleSearchTagsQuery } = categoryApi
