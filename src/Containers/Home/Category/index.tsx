import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'

const Category = () => {
  const { MetricsSizes, Layout, Fonts, Colors } = useTheme()
  return (
    <View style={[Layout.fill, { backgroundColor: Colors.white }]}>
      <Text>Category</Text>
    </View>
  )
}

export default Category
