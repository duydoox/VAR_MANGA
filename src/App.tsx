import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import ApplicationNavigator from '@/Navigators/Application'
import './Translations'
import { LogBox } from 'react-native'
import BottomSheetProvider from './Providers/BottomSheetProvider'
import MessageProvider from './Providers/MessageProvider'
import PopupProvider from './Providers/PopupProvider'
LogBox.ignoreAllLogs()

const App = () => (
  <Provider store={store}>
    {/**
     * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
     * and saved to redux.
     * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
     * for example `loading={<SplashScreen />}`.
     * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
     */}
    <PersistGate loading={null} persistor={persistor}>
      <MessageProvider>
        <PopupProvider>
          <BottomSheetProvider>
            <ApplicationNavigator />
          </BottomSheetProvider>
        </PopupProvider>
      </MessageProvider>
    </PersistGate>
  </Provider>
)

export default App
