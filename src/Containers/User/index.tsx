import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '@/Components/Header'
import { useTheme } from '@/Hooks'
import { useDispatch } from 'react-redux'
import { setToken } from '@/Store/Auth'

const User = () => {
  const { Layout } = useTheme()
  const dispatch = useDispatch()
  return (
    <View style={[Layout.center, Layout.fill]}>
      <Header />
      <TouchableOpacity
        onPress={() => {
          dispatch(setToken({ token: undefined }))
        }}
      >
        <Text> Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default User
