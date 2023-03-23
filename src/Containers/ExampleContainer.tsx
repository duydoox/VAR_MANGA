import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Text, View } from 'react-native'
import HomeTopTabs from '@/Components/HomeTopTabs'

const Tab = createMaterialTopTabNavigator()

const Test = () => {
  return (
    <View>
      <Text>a</Text>
    </View>
  )
}

// @refresh reset
const ExampleContainer = () => {
  return (
    <Tab.Navigator tabBar={props => <HomeTopTabs {...props} />}>
      <Tab.Screen name="a" component={Test} />
      <Tab.Screen name="b" component={Test} />
      <Tab.Screen name="c" component={Test} />
    </Tab.Navigator>
  )
}

export default ExampleContainer
