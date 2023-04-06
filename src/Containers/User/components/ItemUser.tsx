/* eslint-disable react/require-default-props */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'

type Props = {
  items: {
    name: string
    onPress?: () => void
  }[]
}

const ItemUser = ({ items }: Props) => {
  const { Gutters, Layout, Fonts, Colors, MetricsSizes, Images } = useTheme()

  return (
    <View
      style={[
        Gutters.tinyVMargin,
        {
          backgroundColor: Colors.white,
          borderRadius: MetricsSizes.regular,
        },
      ]}
    >
      {items.map((v, i) => (
        <TouchableOpacity
          key={i}
          style={[Layout.rowHCenter, Gutters.smallVPadding]}
          onPress={v.onPress}
        >
          <View
            style={[Layout.rowHCenter, Gutters.regularHPadding, Layout.fill]}
          >
            <Text style={[Fonts.textRegular, { color: Colors.black }]}>
              {v.name}
            </Text>
          </View>
          <Image
            source={Images.right_arrow}
            style={[
              Gutters.regularRMargin,
              {
                height: MetricsSizes.large * 0.7,
                width: MetricsSizes.large * 0.7,
                tintColor: Colors.text3,
              },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default ItemUser
