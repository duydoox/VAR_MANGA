/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/require-default-props */
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/Hooks'
import { useAppSelector } from '@/Hooks/useApp'
import { useDispatch } from 'react-redux'
import { setApiUrl } from '@/Store/Config'
import { setShowModalSetup } from '@/Store/Global'

const SetupUrlApi = () => {
  const { Fonts, Colors, Layout, Gutters } = useTheme()
  const { showModalSetup } = useAppSelector(state => state.global)
  const { apiUrl } = useAppSelector(state => state.config)
  const [value, onChangeText] = useState(apiUrl)
  const dispatch = useDispatch()
  return (
    <Modal
      visible={showModalSetup}
      statusBarTranslucent={true}
      transparent={true}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />

      <View style={[Layout.center, Layout.fill]}>
        <View
          style={[
            Gutters.largeHMargin,
            Gutters.regularVPadding,
            Gutters.regularHPadding,
            { backgroundColor: Colors.white, width: '90%', borderRadius: 10 },
          ]}
        >
          <Text style={[Fonts.textRegular, { color: Colors.black }]}>
            Nhập địa chỉ ip hoặc domain của server:
          </Text>
          <TextInput
            placeholder="VD: 192.168.10.20"
            style={[Gutters.smallHPadding]}
            value={value}
            onChangeText={onChangeText}
          />
          <TouchableOpacity
            style={(Gutters.smallVMargin, { alignItems: 'flex-end' })}
            onPress={() => {
              dispatch(setApiUrl({ apiUrl: value }))
              dispatch(setShowModalSetup({ showModalSetup: false }))
            }}
          >
            <Text>Đồng ý</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default SetupUrlApi
