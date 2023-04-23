/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/require-default-props */
import { View, ActivityIndicator } from 'react-native'
import React, { useMemo, useState } from 'react'
import FastImage, { Source, FastImageProps } from 'react-native-fast-image'
import { useTheme } from '@/Hooks'

type Props = FastImageProps & {
  source: number | Source
  width: number
  height?: string | number
  autoHeight?: boolean
}

const FastImg = ({
  source,
  height = 200,
  width,
  autoHeight = false,
  ...props
}: Props) => {
  const { Images } = useTheme()
  const [control, setControl] = useState({
    loading: true,
    error: false,
  })

  const [calcHeight, setCalcHeight] = useState(height)

  const [loadRate, setLoadRate] = useState(0)

  const controlSource = useMemo(
    () => (control.error ? Images.manga : source),
    [Images.manga, control.error, source],
  )

  return (
    <View>
      <FastImage
        {...props}
        source={controlSource}
        style={{ width: width, height: calcHeight }}
        onLoad={e => {
          if (autoHeight) {
            setCalcHeight(
              (e.nativeEvent?.height / e.nativeEvent?.width) * width,
            )
          }
        }}
        onError={() => {
          setControl(pre => ({ ...pre, error: true }))
        }}
        onLoadEnd={() => {
          setControl(pre => ({ ...pre, loading: false }))
        }}
        onProgress={e => {
          if (e.nativeEvent.loaded / e.nativeEvent.total <= 0.5) {
            setLoadRate(e.nativeEvent.loaded / e.nativeEvent.total)
          }
        }}
      />
      {control.loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: `${100 - loadRate * 100}%`,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          />
          <ActivityIndicator color={'bule'} />
        </View>
      )}
    </View>
  )
}

export default FastImg
