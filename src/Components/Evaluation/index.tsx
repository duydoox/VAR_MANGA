/* eslint-disable react/require-default-props */
import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'

type Props = {
  rating?: number
  getStar?: (star: number) => void
  size?: 'tiny' | 'large'
}

const Evaluation = ({ rating = 0, getStar, size = 'tiny' }: Props) => {
  const { MetricsSizes, Colors, Layout, Images } = useTheme()
  return (
    <View style={[Layout.rowHCenter]}>
      {Array.from(new Array(5), (_, x) => x).map(v => {
        return (
          <TouchableOpacity
            disabled={!getStar}
            onPress={() => {
              getStar?.(v + 1)
            }}
          >
            <Image
              source={Images.star}
              style={{
                width:
                  size === 'large'
                    ? MetricsSizes.small * 1.5
                    : MetricsSizes.small,
                height:
                  size === 'large'
                    ? MetricsSizes.small * 1.5
                    : MetricsSizes.small,
                marginRight: MetricsSizes.tiny / 2,
                tintColor: v + 1 <= rating ? Colors.yellow : Colors.grey1,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Evaluation
