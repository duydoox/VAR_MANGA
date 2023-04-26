/* eslint-disable react/require-default-props */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { goBack } from '@/Navigators/utils'

type Props = {
  title?: string
}

const Header = ({ title }: Props) => {
  const { Gutters, Fonts, Colors, Layout, Images, MetricsSizes } = useTheme()
  const inset = useSafeAreaInsets()
  return (
    <View style={{ paddingTop: inset.top }}>
      {title && (
        <View style={[Layout.rowHCenter]}>
          <TouchableOpacity onPress={goBack}>
            <Image
              source={Images.back}
              style={[
                Gutters.regularHMargin,
                {
                  height: MetricsSizes.regular,
                  width: MetricsSizes.regular,
                },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={[Fonts.titleLarge, { color: Colors.black }]}>
            {title}
          </Text>
        </View>
      )}
    </View>
  )
}

export default Header
