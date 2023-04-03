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
  },
})

export const { setMessage, setShowModalSetup } = slice.actions

export default slice.reducer

export type GlobalT = {
  message?: string
  showModalSetup?: boolean
}

type GlobalPayload = {
  payload: Partial<GlobalT>
}
