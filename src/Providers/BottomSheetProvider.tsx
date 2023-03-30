/* eslint-disable react/no-unstable-nested-components */
import { useTheme } from '@/Hooks'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export type BottomSheetT = {
  onShow: (c: React.ReactNode) => void
  onClose: () => void
}

export const BottomSheetContext = React.createContext<Partial<BottomSheetT>>({})

const BottomSheetProvider = ({ children }: { children: React.ReactNode }) => {
  const { Layout } = useTheme()
  const [child, setChild] = useState<React.ReactNode>()
  const bottomSheetRef = useRef<BottomSheet>(null)

  const onShow = useCallback((c: React.ReactNode) => {
    setChild(c)
    bottomSheetRef.current?.collapse()
  }, [])

  const onClose = useCallback(() => {
    bottomSheetRef.current?.close()
  }, [])

  const value = useMemo<BottomSheetT>(
    () => ({ onShow, onClose }),
    [onClose, onShow],
  )
  return (
    <BottomSheetContext.Provider value={value}>
      <View style={[Layout.fill]}>
        <GestureHandlerRootView style={[Layout.fill]}>
          {children}
          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['60%']}
            enablePanDownToClose
            bottomInset={1}
            backdropComponent={props => (
              <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
            )}
          >
            <View style={[Layout.fill]}>{child}</View>
          </BottomSheet>
        </GestureHandlerRootView>
      </View>
    </BottomSheetContext.Provider>
  )
}

export default BottomSheetProvider
