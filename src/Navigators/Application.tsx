import React from 'react'
import { View, StatusBar, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StartupContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, NavigationTheme } = useTheme()

  return (
    <View style={[Layout.fill]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'rgba(0,0,0,0)'}
          translucent={true}
        />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupContainer} />
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default ApplicationNavigator
