import { PopupContext } from '@/Providers/PopupProvider'
import { useContext } from 'react'

const usePopup = () => {
  return useContext(PopupContext)
}

export default usePopup
