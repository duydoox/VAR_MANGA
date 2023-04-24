import { View, Text, Image, Alert } from 'react-native'
import React from 'react'
import Header from '@/Components/Header'
import { useTheme } from '@/Hooks'
import { useDispatch } from 'react-redux'
import { setToken } from '@/Store/Auth'
import { useAppSelector } from '@/Hooks/useApp'
import Premium from './components/Premium'
import ItemUser from './components/ItemUser'
import { navigate } from '@/Navigators/utils'

const User = () => {
  const { Layout, Colors, Gutters, Images, MetricsSizes, Fonts } = useTheme()
  const dispatch = useDispatch()
  const { username } = useAppSelector(state => state.auth)
  return (
    <View style={[Layout.fill, Gutters.regularHPadding]}>
      <Header />
      <Image
        source={Images.user}
        style={[
          Gutters.regularHMargin,
          Gutters.regularVMargin,
          Gutters.largeTMargin,
          {
            height: MetricsSizes.large * 2.4,
            width: MetricsSizes.large * 2.4,
            borderRadius: MetricsSizes.large * 1.2,
          },
        ]}
        resizeMode="contain"
      />
      <Text
        style={[
          Fonts.titleLarge,
          Gutters.regularLMargin,
          { color: Colors.black },
        ]}
      >
        {username}
      </Text>

      <Premium />

      <View style={{ height: MetricsSizes.regular }} />
      <ItemUser
        items={[
          {
            name: 'Lịch sử',
            onPress: () => {
              navigate('ReadingHistory', {})
            },
          },
        ]}
      />
      <ItemUser
        items={[
          {
            name: 'Ưa thích',
            onPress: () => {
              navigate('FavouriteScreen', {})
            },
          },
        ]}
      />

      <View style={{ height: MetricsSizes.regular }} />
      <ItemUser
        items={[
          { name: 'Cài đặt' },
          { name: 'Trợ giúp' },
          { name: 'Phản hồi' },
        ]}
      />

      <View style={{ height: MetricsSizes.regular }} />
      <ItemUser
        items={[
          {
            name: 'Đăng xuất',
            onPress: () => {
              Alert.alert('Xác nhận', 'Bạn chắc chắn muốn đăng xuất?', [
                { style: 'cancel', text: 'Không' },
                {
                  text: 'Có',
                  onPress: () => {
                    dispatch(setToken({ token: undefined }))
                  },
                },
              ])
            },
          },
        ]}
      />
    </View>
  )
}

export default User
