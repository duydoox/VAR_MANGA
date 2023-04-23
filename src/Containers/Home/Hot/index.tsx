import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import ListItems from '../Newest/components/ListItems'
import { useHandleSearchBookQuery } from '@/Services/modules/books'

const Hot = () => {
  const { Gutters, Layout, Fonts, Colors } = useTheme()

  const resSearchBook = useHandleSearchBookQuery({})
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
          Đang hot
        </Text>
      </View>
      <ListItems
        books={resSearchBook?.data?.content ?? []}
        numberItemInWidth={3}
        showEmpty={resSearchBook.isFetching ? false : true}
      />
    </View>
  )
}

export default Hot
