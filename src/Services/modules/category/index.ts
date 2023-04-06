import { apiCategory } from '@/Services/api'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { store } from '@/Store'

export type CategoryT = {
  id: number
  name: string
  description: string
}

const handleSearchCategorys = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    { content: CategoryT[] },
    {
      categories?: string
      callback?: (response?: { content: CategoryT[] }) => void
    }
  >({
    query: ({ ...params }) => ({
      url:
        `http://${store.getState().config.apiUrl}:8080/api` +
        '/category/v1/search',
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

export const categoryApi = apiCategory.injectEndpoints({
  endpoints: build => ({
    handleSearchCategorys: handleSearchCategorys(build),
  }),
  overrideExisting: false,
})

export const { useHandleSearchCategorysQuery } = categoryApi
