/* eslint-disable react/require-default-props */
import { View, Text, LayoutChangeEvent, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useTheme } from '@/Hooks'

type Props = {
  text?: string
  numberOfLines?: number
}

const ViewMoreText = ({ text, numberOfLines = 3 }: Props) => {
  const { MetricsSizes, Fonts, Colors, Layout, Gutters, Images } = useTheme()
  const lineHeight = MetricsSizes.regular * 1.2
  const [maxLine, setMaxLine] = useState(numberOfLines)
  const [showMore, setShowMore] = useState(true)
  const [isLong, setIsLong] = useState(false)

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const height = e.nativeEvent.layout.height
      const maxHeight = numberOfLines * lineHeight
      if (height >= maxHeight) {
        setIsLong(true)
      } else {
        setIsLong(false)
      }
    },
    [lineHeight, numberOfLines],
  )

  const onPress = useCallback(() => {
    setMaxLine(n => Math.abs(n - numberOfLines))
    setShowMore(s => !s)
  }, [numberOfLines])

  return (
    <View>
      {text && (
        <>
          <View onLayout={onLayout}>
            <Text
              numberOfLines={maxLine}
              style={[
                Fonts.textSmall,
                { lineHeight: lineHeight, color: Colors.text4 },
              ]}
            >
              {text}
            </Text>
          </View>
          {isLong && (
            <View style={[Layout.rowHCenter]}>
              <Text
                onPress={onPress}
                style={[Fonts.textRegular, { color: Colors.primary }]}
              >
                {showMore ? 'Xem thêm' : 'Thu gọn'}
              </Text>
              <Image
                source={Images.right_arrow}
                style={[
                  Gutters.tinyLMargin,
                  {
                    width: MetricsSizes.regular * 1.3,
                    height: MetricsSizes.regular * 1.3,
                    tintColor: Colors.primary,
                    transform: [{ rotateZ: showMore ? '90deg' : '-90deg' }],
                  },
                ]}
                resizeMode="contain"
              />
            </View>
          )}
        </>
      )}
    </View>
  )
}

export default ViewMoreText
