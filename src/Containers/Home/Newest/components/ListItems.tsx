/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/require-default-props */
import { View, Dimensions, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from '@/Hooks'
import Item from './Item'
import { BookT } from '@/Services/modules/books'

type Props = {
  numberItemInWidth: number
  horizontal?: boolean
  books?: BookT[]
}

const ListItems = ({ numberItemInWidth, horizontal = false, books }: Props) => {
  const { MetricsSizes } = useTheme()

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
    </View>
  )
}

export default ListItems
