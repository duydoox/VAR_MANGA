import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'

const Premium = () => {
  const { Gutters, Layout, Fonts, Colors, MetricsSizes, Images } = useTheme()

  return (
    <View
      style={[
        Layout.rowHCenter,
        Gutters.smallVPadding,
        Gutters.largeTMargin,
        { backgroundColor: Colors.blue, borderRadius: MetricsSizes.regular },
      ]}
    >
      <View style={[Layout.rowHCenter, Gutters.regularHPadding, Layout.fill]}>
        <View>
          <View style={[Layout.rowHCenter]}>
            <Image
              source={Images.premium}
              style={[
                Gutters.smallRMargin,
                { height: MetricsSizes.large, width: MetricsSizes.large },
              ]}
              resizeMode="contain"
            />
            <Text style={[Fonts.titleLarge, { color: Colors.primary }]}>
              Mua Premium
            </Text>
          </View>
          <Text style={[Fonts.textRegular, { color: Colors.primary }]}>
            Mua Premium để xem được nhiều truyện hơn
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <Image
          source={Images.add}
          style={[
            Gutters.regularRMargin,
            { height: MetricsSizes.large, width: MetricsSizes.large },
          ]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  )
}

export default Premium
