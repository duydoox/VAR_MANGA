import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import { useHandleGetHistoryBookQuery } from '@/Services/modules/books'
import ListItems from '../Home/Newest/components/ListItems'
import Header from '@/Components/Header'

const ReadingHistory = () => {
  const { Gutters, Layout, Fonts, Colors } = useTheme()

  const resReadingHistory = useHandleGetHistoryBookQuery({})
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
          Lịch sử
        </Text>
      </View>
      <ListItems
        books={resReadingHistory?.data?.content?.map(h => h.book) ?? []}
        numberItemInWidth={3}
        showEmpty={resReadingHistory.isFetching ? false : true}
      />
    </View>
  )
}

export default ReadingHistory
