/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTheme } from '@/Hooks'
import { useAppSelector } from '@/Hooks/useApp'
import { useDispatch } from 'react-redux'
import { setCategory } from '@/Store/Story'
import { useBottomSheet } from '@gorhom/bottom-sheet'
import {
  CategoryT,
  useHandleSearchCategorysQuery,
} from '@/Services/modules/category'

const SelectCategory = () => {
  const { Layout, Fonts, Colors, Gutters } = useTheme()
  const [categorySelected, setCategorySelected] = useState<CategoryT[]>([])
  const { categorys } = useAppSelector(state => state.story)
  const dispatch = useDispatch()
  const bottomSheet = useBottomSheet()

  const resSeatchCategory = useHandleSearchCategorysQuery({})

  console.log(categorySelected, 'l')

  useEffect(() => {
    setCategorySelected(categorys ?? [])
  }, [categorys])

  const selectCategory = useCallback((c: CategoryT) => {
    setCategorySelected(pre => {
      const find = pre.find(p => p.categoryId === c.categoryId)
      if (find) {
        return pre.filter(f => f.categoryId !== find.categoryId)
      } else {
        return [...pre, c]
      }
    })
  }, [])

  const onSelect = useCallback(() => {
    bottomSheet?.close?.()
    dispatch(setCategory({ categorys: categorySelected }))
  }, [bottomSheet, categorySelected, dispatch])

  return (
    <View style={[Gutters.regularHPadding, Layout.fill]}>
      <Text
        style={[
          Fonts.titleRegular,
          Gutters.regularBMargin,
          { color: Colors.black },
        ]}
      >
        Thể loại
      </Text>
      <View style={[Layout.row, { flexWrap: 'wrap' }]}>
        {resSeatchCategory?.data?.content?.map(c => (
          <TouchableOpacity
            style={[
              Layout.center,
              Gutters.tinyVPadding,
              Gutters.tinyVMargin,
              {
                width: '32%',
                marginRight: '2%',
                backgroundColor: categorySelected?.find(
                  p => p.categoryId === c.categoryId,
                )
                  ? Colors.primary
                  : Colors.grey3,
                borderRadius: 3,
              },
            ]}
            onPress={() => selectCategory(c)}
          >
            <Text
              style={[
                Fonts.textSmall,
                {
                  color: categorySelected?.find(
                    p => p.categoryId === c.categoryId,
                  )
                    ? Colors.white
                    : Colors.black,
                },
              ]}
            >
              {c.categoryName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={Layout.fill} />
      <TouchableOpacity
        style={[
          Gutters.regularBMargin,
          Gutters.smallVPadding,
          { alignItems: 'center' },
        ]}
        onPress={onSelect}
      >
        <Text style={[Fonts.titleRegular, { color: Colors.black }]}>
          Xác nhận
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectCategory
