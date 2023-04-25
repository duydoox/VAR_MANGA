import { View } from 'react-native'
import React from 'react'
import Header from '@/Components/Header'
import { useHandleGetPaymentQuery } from '@/Services/modules/users'
import { useAppSelector } from '@/Hooks/useApp'
import WebView from 'react-native-webview'

const Payment = () => {
  const { userId } = useAppSelector(state => state.auth)

  const resGetPayment = useHandleGetPaymentQuery(
    { userId: userId! },
    { skip: !userId, refetchOnMountOrArgChange: true },
  )

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header />
      <WebView source={{ uri: resGetPayment?.error?.data ?? '' }} />
    </View>
  )
}

export default Payment
