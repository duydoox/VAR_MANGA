import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'global',
  initialState: { message: undefined, showModalSetup: false } as GlobalT,
  reducers: {
    setMessage: (state, { payload: { message } }: GlobalPayload) => {
      state.message = message
    },
    setShowModalSetup: (
      state,
      { payload: { showModalSetup } }: GlobalPayload,
    ) => {
      state.showModalSetup = showModalSetup
    },
    setUsernameRegisted: (
      state,
      { payload: { usernameRegisted } }: GlobalPayload,
    ) => {
      state.usernameRegisted = usernameRegisted
    },
    setPaymentUrl: (state, { payload: { paymentUrl } }: GlobalPayload) => {
      state.paymentUrl = paymentUrl
    },
  },
})

export const {
  setMessage,
  setShowModalSetup,
  setUsernameRegisted,
  setPaymentUrl,
} = slice.actions

export default slice.reducer

export type GlobalT = {
  message?: string
  showModalSetup?: boolean
  usernameRegisted?: string
  paymentUrl?: string
}

type GlobalPayload = {
  payload: Partial<GlobalT>
}
