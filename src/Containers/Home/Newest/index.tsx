import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import ListItems from './components/ListItems'
import {
  useHandleGetHistoryBookQuery,
  useHandleSearchBookQuery,
} from '@/Services/modules/books'

const Newest = () => {
  const { Layout, Fonts, Colors, Gutters } = useTheme()
  const resSearchBook = useHandleSearchBookQuery({})
  console.log(resSearchBook?.data?.content?.[0], 'search book')

  const resReadingHistory = useHandleGetHistoryBookQuery({})

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.white }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={[
            Fonts.titleRegular,
            Gutters.regularLMargin,
            { color: Colors.black },
          ]}
        >
          Truyện mới
        </Text>
        <ListItems
          books={resSearchBook?.data?.content}
          numberItemInWidth={2}
          horizontal
          showEmpty={resSearchBook.isFetching ? false : true}
        />

        <View style={[Gutters.regularTMargin, Layout.rowHCenter]}>
          <Text
            style={[
              Fonts.titleRegular,
              Gutters.regularLMargin,
              { color: Colors.black },
            ]}
          >
            Gần đây
          </Text>
        </View>
        <ListItems
          books={resReadingHistory?.data?.content?.map(h => h.book)}
          numberItemInWidth={3}
          horizontal
          showEmpty={resReadingHistory.isFetching ? false : true}
        />
      </ScrollView>
    </View>
  )
}

export default Newest
