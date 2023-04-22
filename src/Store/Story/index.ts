import { CategoryT } from '@/Services/modules/category'
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'story',
  initialState: { category: undefined } as Partial<StoryT>,
  reducers: {
    setCategory: (state, { payload: { categorys } }: StoryPayload) => {
      state.categorys = categorys
    },
    toggleCategory: (state, { payload: { category } }: StoryPayload) => {
      const findIndex = (state.categorys ?? []).findIndex(
        c => c.categoryId === category?.categoryId,
      )
      if (findIndex >= 0) {
        state.categorys?.splice(findIndex, 1)
      } else {
        state.categorys = [...(state.categorys ?? []), category!]
      }
    },
  },
})

export const { setCategory, toggleCategory } = slice.actions

export default slice.reducer

export type StoryT = {
  categorys: CategoryT[]
}

type StoryPayload = {
  payload: Partial<StoryT> & { category?: CategoryT }
}
