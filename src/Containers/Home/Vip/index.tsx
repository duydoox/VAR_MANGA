import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'

const Vip = () => {
  const { MetricsSizes, Layout, Fonts, Colors } = useTheme()
  return (
    <View style={[Layout.fill, { backgroundColor: Colors.white }]}>
      <Text>Vip</Text>
    </View>
  )
}

export default Vip
