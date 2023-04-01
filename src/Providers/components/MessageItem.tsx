/* eslint-disable react-native/no-inline-styles */
import { Text, Animated, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useTheme } from '@/Hooks'

const MessageItem = ({ m }: { m: string }) => {
  const { Layout, Gutters, Fonts, Colors } = useTheme()
  const fadeAnim = useRef(
    new Animated.Value(-Dimensions.get('window').width),
  ).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: -Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }, 3400)
  }, [fadeAnim])
  return (
    <Animated.View
      style={[
        Layout.center,
        Gutters.tinyVPadding,
        Gutters.smallHPadding,
        Gutters.tinyVMargin,
        Gutters.regularHMargin,
        {
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 5,
          transform: [{ translateX: fadeAnim }],
        },
      ]}
    >
      <Text style={[Fonts.textTiny, Fonts.textCenter, { color: Colors.grey3 }]}>
        {m}
      </Text>
    </Animated.View>
  )
}

export default MessageItem
