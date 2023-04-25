import { Config } from '@/Config'
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'config',
  initialState: {
    apiUrl: Config.API_URL,
  } as ConfigT,
  reducers: {
    setApiUrl: (state, { payload: { apiUrl } }: ConfigPayload) => {
      state.apiUrl = apiUrl
    },
    setDefaultUsername: (
      state,
      { payload: { defaultUsername } }: ConfigPayload,
    ) => {
      state.defaultUsername = defaultUsername
    },
  },
})

export const { setApiUrl, setDefaultUsername } = slice.actions

export default slice.reducer

export type ConfigT = {
  apiUrl?: string
  defaultUsername?: string
}

type ConfigPayload = {
  payload: Partial<ConfigT>
}
