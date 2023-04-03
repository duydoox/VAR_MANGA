/* eslint-disable react/require-default-props */
import { View, Text } from 'react-native'
import React from 'react'
// import { useTheme } from '@/Hooks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
  title?: string
}

const Header = ({ title }: Props) => {
  // const { MetricsSizes, Fonts, Colors } = useTheme()
  const inset = useSafeAreaInsets()
  return (
    <View style={{ paddingTop: inset.top }}>
      {title && <Text>{title}</Text>}
    </View>
  )
}

export default Header
