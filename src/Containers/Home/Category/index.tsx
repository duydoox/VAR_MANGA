/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { useTheme } from '@/Hooks'
import ListItems from '../Newest/components/ListItems'
import useBottomSheet from '@/Hooks/useBottomSheet'
import { useAppSelector } from '@/Hooks/useApp'
import SelectCategory from './components/SelectCategory'
import { useHandleSearchBookQuery } from '@/Services/modules/books'

const Category = () => {
  const { MetricsSizes, Layout, Fonts, Colors, Gutters, Images } = useTheme()
  const { categorys } = useAppSelector(state => state.story)
  const bottomSheet = useBottomSheet()
  const showMenu = useCallback(() => {
    bottomSheet?.onShow?.(<SelectCategory />)
  }, [bottomSheet])

  const resSearchBook = useHandleSearchBookQuery(
    {
      categories: categorys?.map(c => c.categoryId).join(','),
    },
    { refetchOnMountOrArgChange: true },
  )

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
          {categorys?.map(c => c.categoryName).join(', ') ?? 'Tất cả'}
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
      <ListItems
        books={resSearchBook?.data?.content ?? []}
        numberItemInWidth={3}
      />
    </View>
  )
}

export default Category
