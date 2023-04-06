/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { useTheme } from '@/Hooks'
import { newestStory } from '@/Containers/__mock__'
import ListItems from '../Newest/components/ListItems'
import useBottomSheet from '@/Hooks/useBottomSheet'
import { useAppSelector } from '@/Hooks/useApp'
import SelectCategory from './components/SelectCategory'

const Category = () => {
  const { MetricsSizes, Layout, Fonts, Colors, Gutters, Images } = useTheme()
  const { category } = useAppSelector(state => state.story)
  const bottomSheet = useBottomSheet()
  const showMenu = useCallback(() => {
    bottomSheet?.onShow?.(<SelectCategory />)
  }, [bottomSheet])

  const data = useMemo(() => {
    if (category?.id) {
      return newestStory?.filter(n =>
        n.categories.find(v => v?.id === category?.id),
      )
    }
    return newestStory
  }, [category?.id])

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.white }]}>
      <View
        style={[
          Layout.rowHCenter,
          Gutters.regularHPadding,
          Layout.justifyContentBetween,
        ]}
      >
        <Text style={[Fonts.titleRegular, { color: Colors.black }]}>
          {category?.name ?? 'Tất cả'}
        </Text>
        <TouchableOpacity
          onPress={showMenu}
          style={[Gutters.tinyTPadding, Gutters.smallLPadding]}
        >
          <Image
            source={Images.icon_menu}
            style={{
              width: MetricsSizes.regular,
              height: MetricsSizes.regular,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {/* <ListItems data={data} numberItemInWidth={3} /> */}
    </View>
  )
}

export default Category
