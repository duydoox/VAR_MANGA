import { apiBook } from '@/Services/api'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { store } from '@/Store'
import { TagsT } from '../tags'
import { CategoryT } from '../category'
import { ChapterT } from '../chapters'

export type LatestChaptersT = {
  id: number
  title?: string
  chapterNumber?: number
  bookId: number
}

export type BookT = {
  bookId: number
  title: string
  content: string
  shortDescription?: string
  categories?: CategoryT[]
  tags?: TagsT[]
  thumbnail?: string
  thumbnailUrl?: string
  author?: string
  latestChapters?: LatestChaptersT[]
  viewCount?: number
  likeCount?: number
  averageRating?: number
  premium?: boolean
}

export type BookRatingT = {
  id: number
  createdBy: string
  createdDate: string
  modifiedBy: number
  modifiedDate: string
  bookId: number
  comment: string
  rating: number
  userId: number
  name: number
}

export type HistoryBookT = {
  id: number
  book: BookT
  recentlyChapter: ChapterT
}

const handleSearchBook = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    { content: BookT[] },
    {
      categories?: string
      title?: string
      tags?: string
      isPremium?: boolean
      callback?: (response?: { content: BookT[] }) => void
    }
  >({
    query: ({ ...params }) => ({
      url: store.getState().config.apiUrl + '/book/v1/search',
      method: 'GET',
      params: { ...params, detail: true },
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

const handleSearchBookRating = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    { content: BookRatingT[]; totalElements: number },
    {
      book?: number
      user?: number
      callback?: (response?: {
        content: BookRatingT[]
        totalElements: number
      }) => void
    }
  >({
    query: ({ ...params }) => ({
      url:
        store.getState().config.apiUrl +
        '/book-rating/v1/search?sortType=createdDate',
      method: 'GET',
      params: { ...params },
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

const handleAddBookRating = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    { content: BookRatingT[] },
    {
      bookId: number
      userId: number
      rating: number
      comment: string
      callback?: (response?: { content: BookRatingT[] }) => void
    }
  >({
    query: ({ ...body }) => ({
      url: store.getState().config.apiUrl + '/book-rating/v1',
      method: 'POST',
      body: { ...body },
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

const handleGetHotBook = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    {
      content: BookT[]
    },
    {
      callback?: (response?: { content: BookT[] }) => void
    }
  >({
    query: () => ({
      url: store.getState().config.apiUrl + '/book/v1/ratingCount',
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

export const bookApi = apiBook.injectEndpoints({
  endpoints: build => ({
    handleSearchBook: handleSearchBook(build),
    handleSearchBookRating: handleSearchBookRating(build),
    handleAddBookRating: handleAddBookRating(build),
    handleGetHistoryBook: handleGetHistoryBook(build),
    handleGetHotBook: handleGetHotBook(build),
  }),
  overrideExisting: false,
})

export const {
  useHandleSearchBookQuery,
  useHandleSearchBookRatingQuery,
  useHandleAddBookRatingMutation,
  useHandleGetHistoryBookQuery,
  useHandleGetHotBookQuery,
} = bookApi
