import { RootState } from '@/Store'
import { setToken } from '@/Store/Auth'
import { setMessage, setPaymentUrl, setShowModalSetup } from '@/Store/Global'
import { isRejectedWithValue } from '@reduxjs/toolkit'
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
  baseUrl: '',
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

export const apiDefault = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  reducerPath: 'apiDefault',
})

export const apiAuth = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  reducerPath: 'apiAuth',
})

export const apiBook = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  reducerPath: 'apiBook',
  tagTypes: ['Rating'],
})

export const apiCategory = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  reducerPath: 'apiCategory',
})

export const setUpApi = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
})

let status: any
setUpApi.middleware =
  ({ dispatch }) =>
  next =>
  action => {
    if (
      action.payload?.status === 200 &&
      action?.meta?.arg?.endpointName === 'login'
    ) {
      status = action.payload.status
      return next(action)
    }
    if (isRejectedWithValue(action) && action.payload.status !== status) {
      if (action.payload.status === 'FETCH_ERROR') {
        dispatch(
          setMessage({
            message: 'Lỗi kết nối server. Vui lòng thiết lập lại domain',
          }),
        )
        dispatch(setToken({ token: undefined }))
        dispatch(setShowModalSetup({ showModalSetup: true }))
      } else if (action.payload.status === 'PARSING_ERROR') {
        if (
          action.payload?.data?.includes(
            'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
          )
        ) {
          dispatch(setPaymentUrl({ paymentUrl: action.payload?.data }))
        }
      } else if (action.payload.status === 401) {
        dispatch(setMessage({ message: 'Sai mật khẩu' }))
      } else if (action.payload.status === 403) {
        dispatch(setMessage({ message: 'Phiên đăng nhập của bạn đã hết' }))
        dispatch(setToken({ token: undefined }))
        status = action.payload.status
      } else {
        console.log(action.payload, '----------response errors---------')
        dispatch(
          setMessage({
            message:
              action.payload.data?.errors?.[0]?.message ||
              action.payload.data?.message ||
              action.payload.data?.error ||
              action.payload?.error,
          }),
        )
      }
    }
    return next(action)
  }
