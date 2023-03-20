import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import { navigate } from '@/Navigators/utils'

const StartupContainer = () => {
  const { Layout, Gutters, Fonts, Images, MetricsSizes, Colors } = useTheme()

  const login = () => {
    navigate('Login', {})
  }

  const register = () => {
    navigate('Register', {})
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
        <Text
          style={[Fonts.titleMaxSize, { marginBottom: MetricsSizes.large }]}
        >
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
            {
              backgroundColor: Colors.primary,
              borderRadius: MetricsSizes.regular,
              marginBottom: MetricsSizes.regular,
              paddingVertical: MetricsSizes.regular,
            },
          ]}
          onPress={login}
        >
          <Text style={[Fonts.titleSmall]}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[Layout.center]} onPress={register}>
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
