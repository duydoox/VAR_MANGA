/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import { useTheme } from '@/Hooks'
import { useAppSelector } from '@/Hooks/useApp'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import MessageItem from './components/MessageItem'
import { useDispatch } from 'react-redux'
import { setMessage as setMessagesStore } from '@/Store/Global'

export type MessageProviderT = {
  pushMessage: (message: string) => void
}

export const MessageContext = React.createContext<Partial<MessageProviderT>>({})

const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const { Layout } = useTheme()
  const [messages, setMessages] = useState<{ text: string; key: number }[]>([])
  const { message } = useAppSelector(state => state.global)

  const pushMessage = useCallback((message: string) => {
    setMessages(pre => [...pre, { text: message, key: Math.random() }])
    setTimeout(() => {
      setMessages(pre => pre.slice(1, pre.length))
    }, 4000)
  }, [])

  const value = useMemo<MessageProviderT>(
    () => ({ pushMessage }),
    [pushMessage],
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (message) {
      pushMessage(message)
      dispatch(setMessagesStore({ message: undefined }))
    }
  }, [dispatch, message, pushMessage])

  return (
    <MessageContext.Provider value={value}>
      <View style={[Layout.fill]}>
        {children}
        <View
          style={[
            Layout.center,
            {
              position: 'absolute',
              top: 50,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0,0,0,0)',
            },
          ]}
          pointerEvents="none"
        >
          {messages.map(msg => (
            <MessageItem m={msg.text} key={msg.key} />
          ))}
        </View>
      </View>
    </MessageContext.Provider>
  )
}

export default MessageProvider
