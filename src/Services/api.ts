import { Config } from '@/Config'
import { RootState } from '@/Store'
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

const prepareHeaders = (headers: Headers, { getState }: any) => {
  // getState() giúp lấy ra toàn bộ state trong store
  const state = getState() as RootState
  const token = state.auth.token
  // Nếu có token thì thêm vào headers
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  } else {
    headers.delete('Authorization')
  }

  return headers
}

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: prepareHeaders,
})

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
  }
  return result
}

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
})

export const apiAuth = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  reducerPath: 'apiAuth',
})
