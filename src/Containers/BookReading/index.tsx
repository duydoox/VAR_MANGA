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
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '@/Hooks'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList, goBack } from '@/Navigators/utils'
import Animated from 'react-native-reanimated'
import {
  useHandleGetChapterImgQuery,
  useHandleGetChapterQuery,
  useHandleSearchChapterQuery,
} from '@/Services/modules/chapters'
import FastImg from '@/Components/Image'
import { useHandleGetHistoryBookQuery } from '@/Services/modules/books'

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
  const [curChapter, setCurChapter] = useState(chapterNumber)
  const [isHeart, setIsHeart] = useState(false)
  const resListChapter = useHandleSearchChapterQuery({ book: book?.bookId! })
  const resChapter = useHandleGetChapterQuery(
    { id: curChapter?.id! },
    { skip: !curChapter?.id },
  )
  const resChapterImg = useHandleGetChapterImgQuery(
    { id: curChapter?.id! },
    { skip: !curChapter?.id },
  )
  const { refetch: refetchHistory } = useHandleGetHistoryBookQuery({})
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

  useEffect(() => {
    if (
      !route?.params?.chapter &&
      resListChapter?.data?.content?.find(c => c.chapterNumber === 1)
    ) {
      setCurChapter(
        resListChapter?.data?.content?.find(c => c.chapterNumber === 1),
      )
    }
  }, [resListChapter?.data?.content, route?.params?.chapter])

  useEffect(() => {
    if (resChapter.isSuccess) {
      refetchHistory()
    }
  }, [refetchHistory, resChapter.isSuccess])

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
        {resChapter.data?.title !== '' && (
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
        )}
        <TouchableOpacity
          style={[
            { backgroundColor: Colors.white, borderRadius: 300, elevation: 5 },
          ]}
          onPress={() => setIsHeart(v => !v)}
        >
          <Image
            source={isHeart ? Images.heart_red : Images.heart}
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
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        onScrollBeginDrag={() => setShowAllChapter(false)}
      >
        <View style={{ paddingBottom: heightBottom }}>
          <View>
            {resChapterImg?.data?.imgChapterList?.content?.map(img => (
              <FastImg
                source={{ uri: img?.fileUrl }}
                width={Dimensions.get('window').width}
                height={Dimensions.get('window').width}
                autoHeight
                resizeMode="stretch"
              />
            ))}
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
                      c.chapterNumber === curChapter?.chapterNumber
                        ? Colors.blue
                        : Colors.white,
                  },
                ]}
                onPress={() => {
                  setCurChapter(c)
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
            Tập {curChapter?.chapterNumber}
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
