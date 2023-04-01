import { MessageContext } from '@/Providers/MessageProvider'
import { useContext } from 'react'

const useMessage = () => {
  return useContext(MessageContext)
}

export default useMessage
