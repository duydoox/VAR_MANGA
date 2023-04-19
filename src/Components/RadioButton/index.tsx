/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/require-default-props */
import { View, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTheme } from '@/Hooks'

type Props = {
  checked?: boolean
  onChange?: (status: boolean) => void
}

const RadioButton = ({ checked, onChange }: Props) => {
  const { Colors, MetricsSizes } = useTheme()
  const [status, setStatus] = useState(true)

  useEffect(() => {
    if (typeof checked !== 'undefined') {
      setStatus(checked)
    }
  }, [checked])

  const onPress = useCallback(() => {
    if (typeof onChange !== 'undefined') {
      onChange(!status)
    } else {
      setStatus(!status)
    }
  }, [onChange, status])

  return (
    <TouchableOpacity
      style={[
        {
          borderRadius: 1000,
          width: MetricsSizes.regular,
          height: MetricsSizes.regular,
          padding: MetricsSizes.tiny / 2,
          borderWidth: 1,
          borderColor: Colors.primary,
        },
      ]}
      onPress={onPress}
    >
      {status && (
        <View
          style={[
            { borderRadius: 1000, backgroundColor: Colors.primary, flex: 1 },
          ]}
        />
      )}
    </TouchableOpacity>
  )
}

export default RadioButton
