import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import ListItems from './components/ListItems'
import { useHandleSearchBookQuery } from '@/Services/modules/books'

const Newest = () => {
  const { Layout, Fonts, Colors, Gutters } = useTheme()
  const resSearchBook = useHandleSearchBookQuery({})
  console.log(resSearchBook?.data?.content?.[0], 'search book')

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
        {/* <ListItems data={newestStory} numberItemInWidth={3} horizontal /> */}
      </ScrollView>
    </View>
  )
}

export default Newest
