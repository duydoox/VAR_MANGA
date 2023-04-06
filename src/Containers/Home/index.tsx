import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/Components/Header'
import { useTheme } from '@/Hooks'
import HomeTopTabs from '@/Components/HomeTopTabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Newest from './Newest'
import Category from './Category'
import Hot from './Hot'
import Vip from './Vip'
import SearchBook from './components/SearchBook'

const Tab = createMaterialTopTabNavigator()

const Home = () => {
  const { Colors, Layout, Gutters, Fonts } = useTheme()
  return (
    <View style={[Layout.fill, { backgroundColor: Colors.white }]}>
      <Header />
      <View style={[Layout.fill]}>
        <Text
          style={[
            Gutters.tinyTMargin,
            Gutters.regularHMargin,
            Fonts.titleMaxSize,
            { color: Colors.black },
          ]}
        >
          Xin chào!
        </Text>
        <Text
          style={[
            Gutters.regularHMargin,
            Fonts.textSmall,
            { color: Colors.text4 },
          ]}
        >
          Chào mừng bạn đến thế giới truyện tranh của VAR
        </Text>

        <SearchBook />

        <Tab.Navigator
          tabBar={
            // eslint-disable-next-line react/no-unstable-nested-components
            props => <HomeTopTabs {...props} />
          }
          screenOptions={{ swipeEnabled: false }}
        >
          <Tab.Screen name="Newest" component={Newest} />
          <Tab.Screen name="Category" component={Category} />
          <Tab.Screen name="Hot" component={Hot} />
          <Tab.Screen name="Vip" component={Vip} />
        </Tab.Navigator>
      </View>
    </View>
  )
}

export default Home
