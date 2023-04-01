import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'global',
  initialState: { message: undefined } as GlobalT,
  reducers: {
    setMessage: (state, { payload: { message } }: GlobalPayload) => {
      state.message = message
    },
  },
})

export const { setMessage } = slice.actions

export default slice.reducer

export type GlobalT = {
  message?: string
}

type GlobalPayload = {
  payload: Partial<GlobalT>
}
