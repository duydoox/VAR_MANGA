import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text, ImageBackground } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'

const StartupContainer = () => {
  const { Layout, Gutters, Fonts, Images } = useTheme()

  const { t } = useTranslation()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 10000),
    )
    await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset('Main')
  }

  useEffect(() => {
    init()
  })

  return (
    <ImageBackground source={Images.splash_image} style={[Layout.fill]}>
      <View style={[Layout.fill, Layout.colCenter]}>
        <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
        <Text style={Fonts.textCenter}>{t('welcome')}</Text>
      </View>
    </ImageBackground>
  )
}

export default StartupContainer
