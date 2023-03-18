import React, { useEffect } from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { navigateAndSimpleReset } from '@/Navigators/utils'

const StartupContainer = () => {
  const { Layout, Gutters, Fonts, Images, MetricsSizes, Colors } = useTheme()

  const { t } = useTranslation()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 1000),
    )
    navigateAndSimpleReset('Main')
  }

  const login = () => {
    navigateAndSimpleReset('Main')
  }

  // useEffect(() => {
  //   init()
  // })

  return (
    <ImageBackground source={Images.splash_image} style={[Layout.fill]}>
      <View
        style={[
          Layout.fill,
          Gutters.smallHPadding,
          // eslint-disable-next-line react-native/no-inline-styles
          { justifyContent: 'flex-end' },
        ]}
      >
        <Text style={[Fonts.titleLarge, { marginBottom: MetricsSizes.large }]}>
          Khám phá thế giới truyện tranh
        </Text>
        <Text
          style={[
            Fonts.textSmall,
            { marginBottom: MetricsSizes.regular * 1.5 },
          ]}
        >
          Đọc truyện online, đọc truyện chữ, truyện full, truyện hay. Tổng hợp
          đầy đủ và cập nhật liên tục.
        </Text>
        <TouchableOpacity
          style={[
            Layout.center,
            Gutters.smallVPadding,
            {
              backgroundColor: Colors.primary,
              borderRadius: MetricsSizes.regular,
              marginBottom: MetricsSizes.regular,
            },
          ]}
          onPress={login}
        >
          <Text style={[Fonts.titleSmall]}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[Layout.center]}>
          <Text
            style={[
              Fonts.titleSmall,
              { marginBottom: MetricsSizes.large * 1.5 },
            ]}
          >
            Tạo tài khoản
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default StartupContainer
