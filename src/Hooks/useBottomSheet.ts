import { BottomSheetContext } from '@/Providers/BottomSheetProvider'
import { useContext } from 'react'

const useBottomSheet = () => {
  return useContext(BottomSheetContext)
}

export default useBottomSheet
