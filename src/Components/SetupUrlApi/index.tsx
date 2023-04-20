/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/require-default-props */
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useTheme } from '@/Hooks'
import { useAppSelector } from '@/Hooks/useApp'
import { useDispatch } from 'react-redux'
import { setApiUrl } from '@/Store/Config'
import { setShowModalSetup } from '@/Store/Global'
import RadioButton from '../RadioButton'
import { Config } from '@/Config'

const SetupUrlApi = () => {
  const { Fonts, Colors, Layout, Gutters } = useTheme()
  const { showModalSetup } = useAppSelector(state => state.global)
  const { apiUrl } = useAppSelector(state => state.config)
  const [isDefault, setIsDefault] = useState(false)
  const [value, onChangeText] = useState(
    apiUrl?.replace('https://', '').replace('http://', '').replace('/api', ''),
  )
  const dispatch = useDispatch()

  const onAgree = useCallback(() => {
    if (isDefault || value !== '') {
      /** check ip */
      const customValue =
        value?.includes('http://') || value?.includes('https://')
          ? `${value}/api`
          : /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(value!)
          ? `http://${value}/api`
          : `https://${value}/api`
      dispatch(
        setApiUrl({
          apiUrl: isDefault ? Config.API_URL : customValue,
        }),
      )
      dispatch(setShowModalSetup({ showModalSetup: false }))
    }
  }, [dispatch, isDefault, value])
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
          <View style={[Layout.rowHCenter, Gutters.smallBMargin]}>
            <RadioButton checked={isDefault} onChange={setIsDefault} />
            <Text
              style={[
                Fonts.textRegular,
                Gutters.smallLMargin,
                { color: Colors.black },
              ]}
            >
              Default server
            </Text>
          </View>
          <Text style={[Fonts.textRegular, { color: Colors.black }]}>
            Nhập địa chỉ ip hoặc domain của server:
          </Text>
          <TextInput
            placeholder="VD: 192.168.10.20:8080"
            style={[Gutters.smallHPadding]}
            value={value}
            onChangeText={onChangeText}
            editable={!isDefault}
          />
          <TouchableOpacity
            style={(Gutters.smallVMargin, { alignItems: 'flex-end' })}
            onPress={onAgree}
          >
            <Text>Đồng ý</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default SetupUrlApi
