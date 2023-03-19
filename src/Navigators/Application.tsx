import React from 'react'
import { View, StatusBar, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StartupContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'
import { useAppSelector } from '@/Hooks/useApp'
import Login from '@/Containers/Login'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, NavigationTheme } = useTheme()
  const token = useAppSelector(state => state.auth.token)

  return (
    <View style={[Layout.fill]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'rgba(0,0,0,0)'}
          translucent={true}
        />
        {!token ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Startup" component={StartupContainer} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Main"
              component={MainNavigator}
              options={{
                animationEnabled: false,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </View>
  )
}

export default ApplicationNavigator
