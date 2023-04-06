import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: { token: undefined } as AuthT,
  reducers: {
    setToken: (state, { payload: { token, username } }: AuthPayload) => {
      state.token = token
      state.username = username
    },
  },
})

export const { setToken } = slice.actions

export default slice.reducer

export type AuthT = {
  token?: string
  username?: string
}

type AuthPayload = {
  payload: Partial<AuthT>
}
