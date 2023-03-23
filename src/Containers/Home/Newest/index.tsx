import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import { newestStory } from '@/Containers/__mock__'
import ListItems from './components/ListItems'

const Newest = () => {
  const { Layout, Fonts, Colors, Gutters } = useTheme()

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
        <ListItems data={newestStory} numberItemInWidth={2} horizontal />

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
        <ListItems data={newestStory} numberItemInWidth={3} horizontal />
      </ScrollView>
    </View>
  )
}

export default Newest
