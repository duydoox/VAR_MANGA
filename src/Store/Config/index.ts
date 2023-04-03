import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'config',
  initialState: { apiUrl: undefined } as ConfigT,
  reducers: {
    setApiUrl: (state, { payload: { apiUrl } }: ConfigPayload) => {
      state.apiUrl = apiUrl
    },
  },
})

export const { setApiUrl } = slice.actions

export default slice.reducer

export type ConfigT = {
  apiUrl?: string
}

type ConfigPayload = {
  payload: Partial<ConfigT>
}
