/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/require-default-props */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native'
import React, {useMemo, useRef, useState } from 'react'
import { useTheme } from '@/Hooks'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList, goBack } from '@/Navigators/utils'
import Animated from 'react-native-reanimated'
import {
  useHandleGetChapterQuery,
  useHandleSearchChapterQuery,
} from '@/Services/modules/chapters'

const BookReading = () => {
  const { MetricsSizes, Layout, Fonts, Colors, Images, Gutters } = useTheme()
  const heightBottom = MetricsSizes.large * 2
  const route = useRoute<RouteProp<RootStackParamList, 'BookReading'>>()
  const book = useMemo(() => route.params?.book, [route.params?.book])
  const [showAllChapter, setShowAllChapter] = useState(false)
  const chapterNumber = useMemo(
    () => route.params?.chapter,
    [route.params?.chapter],
  )
  const [curChapterNumber, setCurChapterNumber] = useState(chapterNumber)
  const resListChapter = useHandleSearchChapterQuery({ book: book?.bookId! })
  const resChapter = useHandleGetChapterQuery({ id: curChapterNumber })
  const scrollY = useRef(new Animated.Value(0)).current
  const bottom = useMemo(
    () =>
      Animated.interpolateNode(Animated.diffClamp(scrollY, 0, heightBottom), {
        inputRange: [0, 10, heightBottom],
        outputRange: [0, 0, -heightBottom],
      }),
    [heightBottom, scrollY],
  )

  const opacity = useMemo(
    () =>
      Animated.interpolateNode(Animated.diffClamp(scrollY, 0, 10), {
        inputRange: [0, 5, 6, 9, 10],
        outputRange: [1, 1, 1, 1, 0],
      }),
    [scrollY],
  )

  return (
    <View style={[Layout.fill]}>
      <Animated.View
        style={[
          Layout.row,
          Layout.alignItemsStart,
          Layout.justifyContentBetween,
          Layout.justifyContentBetween,
          Gutters.regularHPadding,
          {
            position: 'absolute',
            top: 40,
            left: 0,
            right: 0,
            zIndex: 5,
            opacity,
          },
        ]}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          style={[
            {
              backgroundColor: Colors.white,
              borderRadius: 300,
              elevation: 5,
            },
          ]}
          onPress={() => {
            goBack()
          }}
        >
          <Image
            source={Images.back2}
            style={[
              Gutters.smallHMargin,
              Gutters.smallVMargin,
              {
                height: MetricsSizes.regular * 1.2,
                width: MetricsSizes.regular * 1.2,
              },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={[Layout.fill, Layout.center]} pointerEvents="none">
          <View
            style={[
              Gutters.regularHPadding,
              Gutters.smallHMargin,
              Gutters.smallVPadding,
              { backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 30 },
            ]}
          >
            <Text style={[Fonts.titleRegular, { color: Colors.black }]}>
              {resChapter.data?.title}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            { backgroundColor: Colors.white, borderRadius: 300, elevation: 5 },
          ]}
        >
          <Image
            source={Images.heart}
            style={[
              Gutters.smallHMargin,
              Gutters.smallVMargin,
              {
                height: MetricsSizes.regular * 1.2,
                width: MetricsSizes.regular * 1.2,
              },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[Gutters.regularVPadding]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        onScrollBeginDrag={() => setShowAllChapter(false)}
      >
        <View style={{ paddingBottom: heightBottom }}>
          <View>
            <Image
              source={
                book?.thumbnailUrl
                  ? { uri: route.params?.book?.thumbnailUrl }
                  : Images.manga
              }
              style={{
                width: Dimensions.get('window').width,
                height: (Dimensions.get('window').width * 3) / 4,
              }}
              resizeMode="contain"
            />
            <Image
              source={
                book?.thumbnailUrl
                  ? { uri: route.params?.book?.thumbnailUrl }
                  : Images.manga
              }
              style={{
                width: Dimensions.get('window').width,
                height: (Dimensions.get('window').width * 3) / 4,
              }}
              resizeMode="contain"
            />
            <Image
              source={
                book?.thumbnailUrl
                  ? { uri: route.params?.book?.thumbnailUrl }
                  : Images.manga
              }
              style={{
                width: Dimensions.get('window').width,
                height: (Dimensions.get('window').width * 3) / 4,
              }}
              resizeMode="contain"
            />
            <Image
              source={
                book?.thumbnailUrl
                  ? { uri: route.params?.book?.thumbnailUrl }
                  : Images.manga
              }
              style={{
                width: Dimensions.get('window').width,
                height: (Dimensions.get('window').width * 3) / 4,
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </Animated.ScrollView>
      {showAllChapter && (
        <View
          style={[
            {
              position: 'absolute',
              bottom: heightBottom - 3,
              backgroundColor: Colors.white,
              elevation: 5,
              zIndex: 5,
              left: 100,
              right: 100,
            },
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ maxHeight: 300 }}
          >
            {resListChapter?.data?.content?.map(c => (
              <TouchableOpacity
                style={[
                  Gutters.smallVPadding,
                  Layout.center,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.grey4,
                    backgroundColor:
                      c.chapterNumber === curChapterNumber
                        ? Colors.blue
                        : Colors.white,
                  },
                ]}
                onPress={() => {
                  setCurChapterNumber(c.chapterNumber)
                  setShowAllChapter(false)
                }}
              >
                <Text
                  style={[
                    Fonts.textSmall,
                    Gutters.smallRMargin,
                    { color: Colors.primary },
                  ]}
                >
                  Tập {c.chapterNumber}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      <Animated.View
        style={[
          Layout.rowCenter,
          Gutters.largeHPadding,
          {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: bottom,
            backgroundColor: Colors.primary,
            height: heightBottom,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            Gutters.smallVPadding,
            Layout.rowCenter,
            {
              backgroundColor: Colors.white,
              width: MetricsSizes.large * 4,
              borderRadius: MetricsSizes.large,
            },
          ]}
          onPress={() => {
            setShowAllChapter(s => !s)
          }}
        >
          <Text
            style={[
              Fonts.textRegular,
              Gutters.smallRMargin,
              { color: Colors.primary },
            ]}
          >
            Tập {curChapterNumber}
          </Text>
          <Image
            source={Images.right_arrow}
            style={[
              {
                height: MetricsSizes.regular * 1.5,
                width: MetricsSizes.regular * 1.5,
                tintColor: Colors.primary,
                transform: [{ rotateZ: '90deg' }],
              },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default BookReading
