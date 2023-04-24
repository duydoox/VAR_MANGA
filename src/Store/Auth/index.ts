import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: { token: undefined } as AuthT,
  reducers: {
    setToken: (
      state,
      { payload: { token, username, userId } }: AuthPayload,
    ) => {
      state.token = token
      state.username = username
      state.userId = userId
    },
  },
})

export const { setToken } = slice.actions

export default slice.reducer

export type AuthT = {
  token?: string
  username?: string
  userId?: number
}

type AuthPayload = {
  payload: Partial<AuthT>
}
