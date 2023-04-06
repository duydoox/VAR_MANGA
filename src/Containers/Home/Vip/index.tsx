import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import ListItems from '../Newest/components/ListItems'
import { useHandleSearchBookQuery } from '@/Services/modules/books'

const Vip = () => {
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
          Truyện VIP
        </Text>
      </View>
      <ListItems
        books={resSearchBook?.data?.content ?? []}
        numberItemInWidth={3}
      />
    </View>
  )
}

export default Vip
