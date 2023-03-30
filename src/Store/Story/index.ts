import { CategoryStoryT } from '@/Containers/__mock__'
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
  category: CategoryStoryT
}

type StoryPayload = {
  payload: Partial<StoryT>
}
