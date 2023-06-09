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
  Alert,
} from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '@/Hooks'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList, goBack, navigate } from '@/Navigators/utils'
import Animated from 'react-native-reanimated'
import ViewMoreText from '@/Components/ViewMoreText'
import {
  useHandleGetHistoryBookQuery,
  useHandleSearchBookQuery,
  useHandleSearchBookRatingQuery,
} from '@/Services/modules/books'
import ListItems from '../Home/Newest/components/ListItems'
import {
  ChapterT,
  useLazyHandleGetChapterQuery,
} from '@/Services/modules/chapters'
import Evaluation from '@/Components/Evaluation'
import {
  useHandleGetUserInfoQuery,
  useLazyHandleOpenPremiumQuery,
} from '@/Services/modules/users'
import { useAppSelector } from '@/Hooks/useApp'
import Rating from './components/Rating'
import Like from '@/Components/Like'

const BookScreen = () => {
  const { MetricsSizes, Layout, Fonts, Colors, Images, Gutters } = useTheme()
  const heightBottom = MetricsSizes.large * 2
  const route = useRoute<RouteProp<RootStackParamList, 'BookScreen'>>()
  const book = useMemo(() => route.params?.book, [route.params?.book])
  const [tab, setTab] = useState<'INTRODUCE' | 'AUTHOR' | 'CATEGORY'>(
    'INTRODUCE',
  )
  const widthTab = Dimensions.get('window').width - MetricsSizes.regular * 2
  const scrollY = useRef(new Animated.Value(0)).current
  const bottom = useMemo(
    () =>
      Animated.interpolateNode(Animated.diffClamp(scrollY, 0, heightBottom), {
        inputRange: [0, 10, heightBottom],
        outputRange: [0, 0, -heightBottom],
      }),
    [heightBottom, scrollY],
  )

  const { userId } = useAppSelector(state => state.auth)

  const tabRef = useRef<ScrollView>(null)

  const onScrollTab = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const width = e.nativeEvent.contentOffset.x
      if (width < widthTab * 0.5) {
        setTab('INTRODUCE')
      } else if (width >= widthTab * 0.5 && width <= widthTab * 1.5) {
        setTab('AUTHOR')
      } else {
        setTab('CATEGORY')
      }
    },
    [widthTab],
  )

  const resSearchBook = useHandleSearchBookQuery(
    {
      categories: book.categories?.[0]?.categoryId.toString(),
      tags: book.tags?.[0]?.tagId.toString(),
    },
    { skip: !book.categories?.[0] },
  )

  const resSearchBookRating = useHandleSearchBookRatingQuery(
    { book: book.bookId },
    { skip: !book.bookId },
  )

  const resReadingHistory = useHandleGetHistoryBookQuery({})

  const currentReadingChapter = useMemo(
    () =>
      resReadingHistory.data?.content?.find(h => h.book.bookId === book.bookId)
        ?.recentlyChapter,
    [book.bookId, resReadingHistory.data?.content],
  )

  const [handleGetChapter] = useLazyHandleGetChapterQuery()

  const [handleOpenPremium, resOpenPremium] = useLazyHandleOpenPremiumQuery()

  const resUserInfo = useHandleGetUserInfoQuery({})

  const roleVIP = useMemo(
    () => resUserInfo?.data?.roles?.find(r => r === 'ROLE_USER_VIP'),
    [resUserInfo?.data?.roles],
  )

  const onReadingChapter = useCallback(
    (chapter: ChapterT) => {
      handleGetChapter({
        id: chapter.id,
        callback() {
          navigate('BookReading', {
            book: book,
            chapter: chapter,
          })
        },
      })
    },
    [book, handleGetChapter],
  )

  const redirect = useCallback(() => {
    if (currentReadingChapter) {
      Alert.alert('Thông báo', 'Bạn muốn đọc tiếp hay đọc từ đầu', [
        {
          text: 'Đọc tiếp',
          onPress: () => {
            onReadingChapter(currentReadingChapter)
          },
        },
        {
          text: 'Đọc từ đầu',
          onPress: () => {
            navigate('BookReading', {
              book: book,
              chapter: undefined,
            })
          },
        },
      ])
    } else {
      navigate('BookReading', {
        book: book,
        chapter: undefined,
      })
    }
  }, [book, currentReadingChapter, onReadingChapter])

  const onBottom = useCallback(() => {
    if (!book?.latestChapters?.length) {
      Alert.alert('Chưa có chapter', 'Vui lòng chờ chapter mới', [
        { style: 'cancel', text: 'OK' },
      ])
      return
    }
    if (!book.premium || roleVIP) {
      redirect()
    } else {
      // hiển thị trang thanh toán
      if (userId !== undefined) {
        handleOpenPremium({
          userId: userId,
        })
      }
    }
  }, [
    book?.latestChapters?.length,
    book.premium,
    handleOpenPremium,
    redirect,
    roleVIP,
    userId,
  ])

  useEffect(() => {
    if (resOpenPremium.error?.data === 'Open success premium') {
      resUserInfo.refetch()
      redirect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resOpenPremium.error?.data])
  return (
    <View style={[Layout.fill]}>
      <View
        style={[
          Layout.rowHCenter,
          Layout.justifyContentBetween,
          Gutters.regularHPadding,
          {
            position: 'absolute',
            top: 40,
            left: 0,
            right: 0,
            zIndex: 5,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            { backgroundColor: Colors.white, borderRadius: 300, elevation: 5 },
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
        <Like bookId={book.bookId} />
      </View>
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
      </View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[Gutters.regularVPadding]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      >
        <View style={{ paddingBottom: heightBottom }}>
          <View style={[Gutters.regularHPadding]}>
            <Text style={[Fonts.titleLarge, { color: Colors.black }]}>
              {book?.title}
            </Text>
            <View style={[Layout.rowHCenter]}>
              <Evaluation rating={book?.averageRating} size="large" />
              {resSearchBookRating?.data?.totalElements! >= 0 && (
                <Text style={[{ color: 'black' }, Gutters.tinyLMargin]}>
                  ({resSearchBookRating?.data?.totalElements!})
                </Text>
              )}
            </View>
            <View
              style={[Layout.rowHCenter, { marginTop: MetricsSizes.tiny / 2 }]}
            >
              <Image
                source={Images.pin}
                style={[
                  Gutters.tinyRMargin,
                  { width: MetricsSizes.regular, height: MetricsSizes.regular },
                ]}
                resizeMode="contain"
              />
              {book?.latestChapters?.length ? (
                book?.latestChapters?.map(l => (
                  <TouchableOpacity
                    style={[Gutters.smallRMargin]}
                    onPress={() =>
                      onReadingChapter({
                        id: l.id,
                        chapterNumber: l.chapterNumber!,
                      } as ChapterT)
                    }
                  >
                    <Text style={[Fonts.textSmall, { color: Colors.text4 }]}>
                      Tập {l.chapterNumber}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={[Fonts.textSmall, { color: Colors.text4 }]}>
                  Chưa có
                </Text>
              )}
            </View>
          </View>
          <View
            style={[
              Layout.rowHCenter,
              Gutters.regularBMargin,
              Gutters.regularHPadding,
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setTab('INTRODUCE')
                tabRef.current?.scrollTo({ x: 0 })
              }}
              style={[Gutters.tinyVPadding]}
            >
              <Text
                style={[
                  Fonts.titleRegular,
                  Gutters.largeRMargin,
                  {
                    color: tab === 'INTRODUCE' ? Colors.primary : Colors.text4,
                  },
                ]}
              >
                Giới thiệu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTab('AUTHOR')
                tabRef.current?.scrollTo({ x: widthTab })
              }}
              style={[Gutters.tinyVPadding]}
            >
              <Text
                style={[
                  Fonts.titleRegular,
                  Gutters.largeRMargin,
                  {
                    color: tab === 'AUTHOR' ? Colors.primary : Colors.text4,
                  },
                ]}
              >
                Tác giả
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTab('CATEGORY')
                tabRef.current?.scrollTo({ x: widthTab * 2 })
              }}
              style={[Gutters.tinyVPadding]}
            >
              <Text
                style={[
                  Fonts.titleRegular,
                  Gutters.largeRMargin,
                  {
                    color: tab === 'CATEGORY' ? Colors.primary : Colors.text4,
                  },
                ]}
              >
                Thể loại
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              Gutters.regularHPadding,
              { minHeight: MetricsSizes.large * 4 },
            ]}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              pagingEnabled
              ref={tabRef}
              // onScroll={onScrollTab}
            >
              <View style={[{ width: widthTab }]}>
                <ViewMoreText text={book?.content} numberOfLines={5} />
              </View>
              <View style={[{ width: widthTab }]}>
                <Text>Tác giả: {book?.author}</Text>
              </View>
              <View style={[{ width: widthTab }]}>
                <Text>
                  Thể loại:{' '}
                  {book?.categories?.map(c => c.categoryName).join(', ')}
                </Text>
              </View>
            </ScrollView>
          </View>

          {resSearchBook?.data?.content.filter(b => b.bookId !== book.bookId)
            ?.length! > 0 && (
            <ListItems
              books={
                resSearchBook?.data?.content.filter(
                  b => b.bookId !== book.bookId,
                ) ?? []
              }
              numberItemInWidth={3}
              horizontal
              showEmpty={false}
            />
          )}
          <Rating book={book} />
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={[
          Layout.rowHCenter,
          Layout.justifyContentBetween,
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
        <Text style={[Fonts.titleLarge, { color: Colors.white }]}>
          {book?.premium ? 'PREMIUM' : 'FREE'}
        </Text>
        <TouchableOpacity
          style={[
            Gutters.smallVPadding,
            Layout.center,
            {
              backgroundColor: Colors.white,
              width: MetricsSizes.large * 4,
              borderRadius: MetricsSizes.large,
            },
          ]}
          onPress={onBottom}
        >
          <Text style={[Fonts.textRegular, { color: Colors.primary }]}>
            {book.premium && !roleVIP ? 'Kích hoạt' : 'Đọc'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default BookScreen
