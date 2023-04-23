import { apiDefault } from '@/Services/api'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { store } from '@/Store'

export type ChapterT = {
  id: number
  title: string
  bookId: number
  content?: string
  chapterNumber: number
}

export type ChapterImgT = {
  id: string
  fileUrl: string
  imgNumber: number
}

const handleSearchChapter = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    { content: ChapterT[] },
    {
      book: number
      callback?: (response?: { content: ChapterT[] }) => void
    }
  >({
    query: ({ ...params }) => ({
      url: store.getState().config.apiUrl + '/chapter/v1/search',
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

const handleGetChapter = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    ChapterT,
    {
      id: number
      callback?: (response?: ChapterT) => void
    }
  >({
    query: ({ ...params }) => ({
      url: store.getState().config.apiUrl + '/chapter/v1/' + params.id,
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

const handleGetChapterImg = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    {
      chapterId: number
      imgChapterList: {
        content: ChapterImgT[]
      }
    },
    {
      id: number
      callback?: (response?: {
        chapterId: number
        imgChapterList: {
          content: ChapterImgT[]
        }
      }) => void
    }
  >({
    query: ({ ...params }) => ({
      url:
        store.getState().config.apiUrl +
        `/chapterImg/v1/search/${params.id}?sort=imgNumber,asc`,
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

export const bookApi = apiDefault.injectEndpoints({
  endpoints: build => ({
    handleSearchChapter: handleSearchChapter(build),
    handleGetChapter: handleGetChapter(build),
    handleGetChapterImg: handleGetChapterImg(build),
  }),
  overrideExisting: false,
})

export const {
  useHandleSearchChapterQuery,
  useHandleGetChapterQuery,
  useLazyHandleGetChapterQuery,
  useHandleGetChapterImgQuery,
} = bookApi
