import { Alert, BackHandler, View } from 'react-native'
import React, { useEffect } from 'react'
import Header from '@/Components/Header'
import { useHandleGetPaymentQuery } from '@/Services/modules/users'
import { useAppSelector } from '@/Hooks/useApp'
import WebView from 'react-native-webview'
import { goBack } from '@/Navigators/utils'

const Payment = () => {
  const { userId } = useAppSelector(state => state.auth)

  const resGetPayment = useHandleGetPaymentQuery(
    { userId: userId! },
    { skip: !userId, refetchOnMountOrArgChange: true },
  )

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Cảnh báo', 'Bạn có chắc muốn thoát khỏi trang thanh toán', [
        {
          text: 'không',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'rời đi', onPress: () => goBack() },
      ])
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )

    return () => backHandler.remove()
  }, [])

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header />
      <WebView source={{ uri: resGetPayment?.error?.data ?? '' }} />
    </View>
  )
}

export default Payment
