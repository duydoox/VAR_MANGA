import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: { token: undefined } as AuthT,
  reducers: {
    setToken: (state, { payload: { token } }: AuthPayload) => {
      state.token = token
    },
  },
})

export const { setToken } = slice.actions

export default slice.reducer

export type AuthT = {
  token?: string
}

type AuthPayload = {
  payload: Partial<AuthT>
}
