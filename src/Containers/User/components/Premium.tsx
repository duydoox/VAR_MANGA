/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { useTheme } from '@/Hooks'
import { useAppSelector } from '@/Hooks/useApp'
import {
  useHandleGetUserInfoQuery,
  useLazyHandleOpenPremiumQuery,
} from '@/Services/modules/users'

const Premium = () => {
  const { Gutters, Layout, Fonts, Colors, MetricsSizes, Images } = useTheme()

  const { userId } = useAppSelector(state => state.auth)

  const [handleOpenPremium, resOpenPremium] = useLazyHandleOpenPremiumQuery()

  const resUserInfo = useHandleGetUserInfoQuery({})

  useEffect(() => {
    if (resOpenPremium.error?.data === 'Open success premium') {
      resUserInfo.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resOpenPremium.error?.data])

  const roleVIP = useMemo(
    () => resUserInfo?.data?.roles?.find(r => r === 'ROLE_USER_VIP'),
    [resUserInfo?.data?.roles],
  )

  return (
    <View
      style={[
        Layout.rowHCenter,
        Gutters.smallVPadding,
        Gutters.largeTMargin,
        { backgroundColor: Colors.blue, borderRadius: MetricsSizes.regular },
      ]}
    >
      <View style={[Layout.rowHCenter, Gutters.regularHPadding, Layout.fill]}>
        <View>
          <View style={[Layout.rowHCenter]}>
            <Image
              source={roleVIP ? Images.crown : Images.premium}
              style={[
                Gutters.smallRMargin,
                { height: MetricsSizes.large, width: MetricsSizes.large },
              ]}
              resizeMode="contain"
            />
            <Text style={[Fonts.titleLarge, { color: Colors.primary }]}>
              {roleVIP ? 'Đã kịch hoạt Premium' : 'Mua Premium'}
            </Text>
          </View>
          <Text style={[Fonts.textRegular, { color: Colors.primary }]}>
            {roleVIP
              ? 'Giờ đây bạn có thể đọc những gì mà bạn thích'
              : 'Mua Premium để xem được nhiều truyện hơn'}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (userId !== undefined) {
            handleOpenPremium({
              userId: userId,
              callback() {
                console.log('nạp coin thành công')
              },
            })
          }
        }}
        style={{ opacity: roleVIP ? 0 : 1 }}
      >
        <Image
          source={Images.add}
          style={[
            Gutters.regularRMargin,
            { height: MetricsSizes.large, width: MetricsSizes.large },
          ]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  )
}

export default Premium
