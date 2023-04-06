/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import { useTheme } from '@/Hooks'
import React, { useCallback, useMemo, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

export type PopupProviderT = {
  onShow: (c: React.ReactNode) => void
  onShowTouchClose: (c: React.ReactNode) => void
  onClose: () => void
}

export const PopupContext = React.createContext<Partial<PopupProviderT>>({})

const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const { Layout } = useTheme()
  const [child, setChild] = useState<React.ReactNode>()
  const [showPopup, setShowPopup] = useState<
    undefined | 'TOUCH_CLOSE' | 'NORMAL'
  >(undefined)

  const onShow = useCallback((c: React.ReactNode) => {
    setChild(c)
    setShowPopup('NORMAL')
  }, [])

  const onClose = useCallback(() => {
    setShowPopup(undefined)
  }, [])

  const onShowTouchClose = useCallback((c: React.ReactNode) => {
    setChild(c)
    setShowPopup('TOUCH_CLOSE')
  }, [])

  const value = useMemo<PopupProviderT>(
    () => ({ onShow, onClose, onShowTouchClose }),
    [onClose, onShow, onShowTouchClose],
  )
  return (
    <PopupContext.Provider value={value}>
      <View style={[Layout.fill]}>
        {children}
        {showPopup && (
          <View
            style={[
              Layout.fill,
              Layout.center,
              { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
            ]}
            pointerEvents="box-none"
          >
            {showPopup === 'TOUCH_CLOSE' && (
              <TouchableOpacity
                style={[
                  Layout.fill,
                  {
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                  },
                ]}
                onPress={onClose}
              />
            )}
            {child}
          </View>
        )}
      </View>
    </PopupContext.Provider>
  )
}

export default PopupProvider
