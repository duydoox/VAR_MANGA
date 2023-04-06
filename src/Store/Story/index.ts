import { CategoryT } from '@/Services/modules/category'
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'story',
  initialState: { category: undefined } as Partial<StoryT>,
  reducers: {
    setCategory: (state, { payload: { category } }: StoryPayload) => {
      state.category = category
    },
  },
})

export const { setCategory } = slice.actions

export default slice.reducer

export type StoryT = {
  category: CategoryT
}

type StoryPayload = {
  payload: Partial<StoryT>
}
