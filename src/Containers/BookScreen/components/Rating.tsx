/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/require-default-props */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useTheme } from '@/Hooks'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList, goBack, navigate } from '@/Navigators/utils'
import Animated from 'react-native-reanimated'
import ViewMoreText from '@/Components/ViewMoreText'
import { useHandleSearchBookQuery } from '@/Services/modules/books'
import {
  ChapterT,
  useLazyHandleGetChapterQuery,
} from '@/Services/modules/chapters'

const Rating = () => {
  const { MetricsSizes, Layout, Fonts, Colors, Images, Gutters } = useTheme()
  return (
    <View>
      <ScrollView
        style={{ maxHeight: 300 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View />
      </ScrollView>
    </View>
  )
}

export default Rating
