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
import Register from '@/Containers/Register'
import OneSignal from 'react-native-onesignal'
import BookScreen from '@/Containers/BookScreen'
import BookReading from '@/Containers/BookReading'

// OneSignal Initialization
OneSignal.setAppId('b97724c5-54af-4a9b-b802-25fb97a1b75d')

// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
OneSignal.promptForPushNotificationsWithUserResponse()

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(
  notificationReceivedEvent => {
    console.log(
      'OneSignal: notification will show in foreground:',
      notificationReceivedEvent,
    )
    let notification = notificationReceivedEvent.getNotification()
    console.log('notification: ', notification)
    const data = notification.additionalData
    console.log('additionalData: ', data)
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification)
  },
)

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log('OneSignal: notification opened:', notification)
})

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
            <Stack.Screen name="Register" component={Register} />
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
            <Stack.Screen
              name="BookScreen"
              component={BookScreen}
              options={{
                animationEnabled: true,
              }}
            />
            <Stack.Screen
              name="BookReading"
              component={BookReading}
              options={{
                animationEnabled: true,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </View>
  )
}

export default ApplicationNavigator
