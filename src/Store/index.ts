import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import {
  api,
  apiAuth,
  setUpApi,
  apiBook,
  apiCategory,
  apiDefault,
} from '@/Services/api'
import theme from './Theme'
import auth from './Auth'
import story from './Story'
import global from './Global'
import config from './Config'

const reducers = combineReducers({
  theme,
  api: api.reducer,
  setup: setUpApi.reducer,
  apiBook: apiBook.reducer,
  apiCategory: apiCategory.reducer,
  apiDefault: apiDefault.reducer,
  auth: auth,
  story: story,
  global: global,
  config: config,
  [apiAuth.reducerPath]: apiAuth.reducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'auth', 'config'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(apiDefault.middleware)
      .concat(setUpApi.middleware)
      .concat(api.middleware)
      .concat(apiAuth.middleware)
      .concat(apiBook.middleware)
      .concat(apiCategory.middleware)

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
    }

    return middlewares
  },
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
