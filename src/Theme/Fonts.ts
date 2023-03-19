/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'
import { ThemeVariables } from './theme'

export default function ({ FontSize, Colors }: ThemeVariables) {
  return StyleSheet.create({
    textMini: {
      fontSize: FontSize.mini,
      color: Colors.text,
    },
    textTiny: {
      fontSize: FontSize.tiny,
      color: Colors.text,
    },
    textSmall: {
      fontSize: FontSize.small,
      color: Colors.text,
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: Colors.text,
    },
    textLarge: {
      fontSize: FontSize.large,
      color: Colors.text,
    },
    textMaxSize: {
      fontSize: FontSize.maxSize,
      color: Colors.text,
    },
    titleMini: {
      fontSize: FontSize.mini,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleTiny: {
      fontSize: FontSize.tiny,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleSmall: {
      fontSize: FontSize.small,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleRegular: {
      fontSize: FontSize.regular,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleLarge: {
      fontSize: FontSize.large,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleMaxSize: {
      fontSize: FontSize.maxSize,
      fontWeight: 'bold',
      color: Colors.text,
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
  })
}
