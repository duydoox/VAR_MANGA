import { View, Text, Image } from 'react-native'
import React from 'react'
import Header from '@/Components/Header'
import { useTheme } from '@/Hooks'
import { TextInput } from 'react-native-gesture-handler'
import HomeTopTabs from '@/Components/HomeTopTabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Newest from './Newest'
import Category from './Category'
import Hot from './Hot'
import Vip from './Vip'

const Tab = createMaterialTopTabNavigator()

const Home = () => {
  const { Colors, MetricsSizes, Layout, Gutters, Images, Fonts } = useTheme()
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
          Hãy tìm kiếm truyện của bạn
        </Text>
        <View
          style={[
            Layout.rowHCenter,
            Gutters.regularHMargin,
            Gutters.smallHPadding,
            Gutters.largeTMargin,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: Colors.f5,
              borderRadius: MetricsSizes.regular * 2,
              elevation: 11,
            },
          ]}
        >
          <Image
            source={Images.search}
            style={{
              height: MetricsSizes.regular * 1.5,
              width: MetricsSizes.regular * 1.5,
            }}
            resizeMode="contain"
          />
          <TextInput style={[Layout.fill]} placeholder="Tìm kiếm" />
          <Image
            source={Images.options}
            style={{
              height: MetricsSizes.regular * 1.5,
              width: MetricsSizes.regular * 1.5,
            }}
            resizeMode="contain"
          />
        </View>
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
