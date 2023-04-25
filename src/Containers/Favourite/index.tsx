import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import ListItems from '../Home/Newest/components/ListItems'
import Header from '@/Components/Header'
import { useHandleGetBookLikedQuery } from '@/Services/modules/users'
import { useAppSelector } from '@/Hooks/useApp'

const Favourite = () => {
  const { Gutters, Layout, Fonts, Colors } = useTheme()

  const { userId } = useAppSelector(state => state.auth)
  const resBookLiked = useHandleGetBookLikedQuery(
    { userId: userId! },
    { skip: !userId },
  )

  console.log(resBookLiked?.data, 'book-liked')
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
        // books={
        //   resBookLiked?.data?.content?.length! > 0
        //     ? resBookLiked?.data?.content
        //     : resSearchBook?.data?.content ?? []
        // }
        books={resBookLiked?.data?.content}
        numberItemInWidth={3}
        showEmpty={resBookLiked.isFetching ? false : true}
      />
    </View>
  )
}

export default Favourite
