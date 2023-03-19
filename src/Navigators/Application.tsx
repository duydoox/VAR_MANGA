import React, { useEffect, useState } from 'react'
import { View, StatusBar, BackHandler, Alert } from 'react-native'
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
  const [canExitApp, setCanExitApp] = useState(true)

  /**exit app handler android*/
  useEffect(() => {
    const backAction = () => {
      if (canExitApp) {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ])
      }
      return canExitApp
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )

    return () => backHandler.remove()
  }, [canExitApp])

  return (
    <View style={[Layout.fill]}>
      <NavigationContainer
        theme={NavigationTheme}
        ref={navigationRef}
        onStateChange={state => {
          setCanExitApp(state?.index === 0)
        }}
      >
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
