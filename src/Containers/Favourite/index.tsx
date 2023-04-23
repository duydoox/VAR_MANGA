import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import { useHandleSearchBookQuery } from '@/Services/modules/books'
import ListItems from '../Home/Newest/components/ListItems'
import Header from '@/Components/Header'

const Favourite = () => {
  const { Gutters, Layout, Fonts, Colors } = useTheme()

  const resSearchBook = useHandleSearchBookQuery({})
  return (
    <View style={[Layout.fill, { backgroundColor: Colors.white }]}>
      <Header />
      <View
        style={[
          Layout.rowHCenter,
          Gutters.regularHPadding,
          Layout.justifyContentBetween,
        ]}
      >
        <Text
          style={[
            Fonts.titleLarge,
            Gutters.smallTMargin,
            Gutters.regularBMargin,
            { color: Colors.black },
          ]}
        >
          Danh sách truyện đã thích
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

export default Favourite
