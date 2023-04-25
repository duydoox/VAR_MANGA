import { View } from 'react-native'
import React, { useEffect } from 'react'
import Header from '@/Components/Header'
import { useHandleGetPaymentQuery } from '@/Services/modules/users'
import { useAppSelector } from '@/Hooks/useApp'
import WebView from 'react-native-webview'
import { useDispatch } from 'react-redux'
import { setPaymentUrl } from '@/Store/Global'

const Payment = () => {
  const { userId } = useAppSelector(state => state.auth)

  const { paymentUrl } = useAppSelector(state => state.global)

  useHandleGetPaymentQuery(
    { userId: userId! },
    { skip: !userId, refetchOnMountOrArgChange: true },
  )

  const dispatch = useDispatch()

  useEffect(
    () => () => {
      dispatch(setPaymentUrl({ paymentUrl: undefined }))
    },
    [dispatch],
  )
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header />
      <WebView source={{ uri: paymentUrl ?? '' }} />
    </View>
  )
}

export default Payment
