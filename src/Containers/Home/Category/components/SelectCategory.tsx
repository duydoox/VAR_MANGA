/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTheme } from '@/Hooks'
import { categories, CategoryStoryT } from '@/Containers/__mock__'
import { useAppSelector } from '@/Hooks/useApp'
import { useDispatch } from 'react-redux'
import { setCategory } from '@/Store/Story'
import { useBottomSheet } from '@gorhom/bottom-sheet'

const SelectCategory = () => {
  const { Layout, Fonts, Colors, Gutters } = useTheme()
  const [categorySelected, setCategorySelected] = useState<CategoryStoryT>()
  const { category } = useAppSelector(state => state.story)
  const dispatch = useDispatch()
  const bottomSheet = useBottomSheet()

  useEffect(() => {
    setCategorySelected(category)
  }, [category])

  const onSelect = useCallback(() => {
    bottomSheet?.close?.()
    dispatch(setCategory({ category: categorySelected }))
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
      <View
        style={[
          Layout.row,
          { flexWrap: 'wrap', justifyContent: 'space-between' },
        ]}
      >
        {categories?.map(c => (
          <TouchableOpacity
            style={[
              Layout.center,
              Gutters.tinyVPadding,
              Gutters.tinyVMargin,
              {
                width: '32%',
                backgroundColor:
                  categorySelected?.id === c.id ? Colors.primary : Colors.grey3,
                borderRadius: 3,
              },
            ]}
            onPress={() => setCategorySelected(c)}
          >
            <Text
              style={[
                Fonts.textSmall,
                {
                  color:
                    categorySelected?.id === c.id ? Colors.white : Colors.black,
                },
              ]}
            >
              {c.name}
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
