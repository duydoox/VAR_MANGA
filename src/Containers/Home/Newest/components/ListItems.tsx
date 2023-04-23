/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/require-default-props */
import { View, Dimensions, ScrollView, Image, Text } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from '@/Hooks'
import Item from './Item'
import { BookT } from '@/Services/modules/books'

type Props = {
  numberItemInWidth: number
  horizontal?: boolean
  books?: BookT[]
  showEmpty?: boolean
}

const ListItems = ({
  numberItemInWidth,
  horizontal = false,
  books,
  showEmpty = true,
}: Props) => {
  const { MetricsSizes, Layout, Images } = useTheme()

  const widthItem = useMemo(
    () =>
      (Dimensions.get('window').width -
        MetricsSizes.regular * 2 -
        MetricsSizes.small * (numberItemInWidth - 1)) /
      numberItemInWidth,
    [MetricsSizes.regular, MetricsSizes.small, numberItemInWidth],
  )

  const heightItem = useMemo(
    () => (widthItem * 3) / 4 + MetricsSizes.large * (7 - numberItemInWidth),
    [MetricsSizes.large, numberItemInWidth, widthItem],
  )
  return (
    <View
      style={{
        height: horizontal ? heightItem : undefined,
        marginTop: MetricsSizes.small,
        marginBottom: horizontal ? 0 : MetricsSizes.regular,
      }}
    >
      {books?.length! > 0 ? (
        <ScrollView
          horizontal={horizontal}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: MetricsSizes.regular,
          }}
        >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {books?.map((v, i) => (
              <Item
                book={v}
                marginRight={MetricsSizes.small}
                width={widthItem}
                fontSize={numberItemInWidth > 2.5 ? 'tiny' : 'large'}
                isEnd={i === books.length - 1}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        showEmpty && (
          <View style={[Layout.rowCenter]}>
            <Image
              source={Images.empty}
              style={[
                {
                  width: MetricsSizes.large * 1.6,
                  height: MetricsSizes.large * 1.4,
                },
              ]}
              resizeMode="contain"
            />
            <Text>Không tìm thấy</Text>
          </View>
        )
      )}
    </View>
  )
}

export default ListItems
