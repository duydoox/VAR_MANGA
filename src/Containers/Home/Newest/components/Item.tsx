/* eslint-disable react/require-default-props */
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import { NewestStoryT } from '@/Containers/__mock__'

type Props = {
  story: NewestStoryT
  width: number
  marginRight: number
  isEnd?: boolean
  fontSize?: 'large' | 'tiny'
}

const Item = ({
  story,
  width,
  marginRight,
  isEnd,
  fontSize = 'tiny',
}: Props) => {
  const { MetricsSizes, Layout, Fonts, Colors, Images, Gutters } = useTheme()
  return (
    <TouchableOpacity
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: Colors.white,
          marginRight: isEnd ? MetricsSizes.regular : marginRight,
          width: width,
          borderRadius: MetricsSizes.small,
          overflow: 'hidden',
          elevation: 5,
          paddingBottom: MetricsSizes.tiny,
          marginBottom: MetricsSizes.regular,
        },
      ]}
    >
      <Image
        source={{ uri: story.coverImage }}
        style={{
          width,
          height: (width * 3) / 4,
          borderRadius: MetricsSizes.small,
        }}
        resizeMode="cover"
      />
      <View style={[Gutters.tinyHPadding, Gutters.tinyTPadding, Layout.fill]}>
        <View style={[Layout.row]}>
          {Array.from(new Array(5), (_, x) => x).map(v => {
            return (
              <Image
                source={Images.star}
                style={{
                  width:
                    fontSize === 'tiny'
                      ? MetricsSizes.small
                      : MetricsSizes.small * 1.5,
                  height:
                    fontSize === 'tiny'
                      ? MetricsSizes.small
                      : MetricsSizes.small * 1.5,
                  marginRight: MetricsSizes.tiny / 2,
                  tintColor: v <= story?.star! ? Colors.yellow : Colors.grey1,
                }}
                resizeMode="contain"
              />
            )
          })}
        </View>
        <Text
          style={[
            fontSize === 'tiny' ? Fonts.titleSmall : Fonts.titleRegular,
            { color: Colors.black },
          ]}
          numberOfLines={2}
        >
          {story?.name}
        </Text>
        <View style={[Layout.rowHCenter, { marginTop: MetricsSizes.tiny / 2 }]}>
          <Image
            source={Images.pin}
            style={[
              Gutters.tinyRMargin,
              { width: MetricsSizes.regular, height: MetricsSizes.regular },
            ]}
            resizeMode="contain"
          />
          <Text
            style={[
              fontSize === 'tiny' ? Fonts.textTiny : Fonts.textSmall,
              { color: Colors.text4 },
            ]}
          >
            {story?.chapter ? 'Tập ' + story?.chapter : '??'}
          </Text>
        </View>
        <View style={[Layout.fill]} />
        <Text
          style={[
            Fonts.textSmall,
            Gutters.tinyTMargin,
            { color: Colors.text4 },
          ]}
        >
          {story?.price && story?.price !== 0 ? story?.price + ' đ' : 'FREE'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Item
