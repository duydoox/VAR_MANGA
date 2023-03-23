import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'

const Hot = () => {
  const { MetricsSizes, Layout, Fonts, Colors } = useTheme()
  return (
    <View style={[Layout.fill, { backgroundColor: Colors.white }]}>
      <Text>Hot</Text>
    </View>
  )
}

export default Hot
