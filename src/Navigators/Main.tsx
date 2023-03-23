import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ExampleContainer } from '@/Containers'
import TabsBar from '@/Components/TabsBar'
import Home from '@/Containers/Home'
import User from '@/Containers/User'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <TabsBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favourite" component={ExampleContainer} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  )
}

export default MainNavigator
