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
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '@/Hooks'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '@/Navigators/utils'
import Animated from 'react-native-reanimated'
import ViewMoreText from '@/Components/ViewMoreText'

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
  const bottom = Animated.interpolateNode(
    Animated.diffClamp(scrollY, 0, heightBottom),
    {
      inputRange: [0, heightBottom],
      outputRange: [0, -heightBottom],
    },
  )

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
  return (
    <View style={[Layout.fill]}>
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
        contentContainerStyle={[
          Gutters.regularHPadding,
          Gutters.regularVPadding,
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      >
        <View style={{ paddingBottom: heightBottom }}>
          <Text style={[Fonts.titleLarge, { color: Colors.black }]}>
            {book?.title}
          </Text>
          <View style={[Layout.rowHCenter]}>
            {Array.from(new Array(5), (_, x) => x).map(v => {
              return (
                <Image
                  source={Images.star}
                  style={{
                    width: MetricsSizes.small * 1.5,
                    height: MetricsSizes.small * 1.5,
                    marginRight: MetricsSizes.tiny / 2,
                    tintColor: v <= book?.star! ? Colors.yellow : Colors.grey1,
                  }}
                  resizeMode="contain"
                />
              )
            })}
            <Text>(1980)</Text>
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
            <Text style={[Fonts.textSmall, { color: Colors.text4 }]}>
              {book?.chapter ? 'Tập ' + book?.chapter : '??'}
            </Text>
          </View>
          <View style={[Layout.rowHCenter, Gutters.regularBMargin]}>
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

          <View style={[{ minHeight: MetricsSizes.large * 4 }]}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              // scrollEnabled={false}
              pagingEnabled
              ref={tabRef}
              onScroll={onScrollTab}
            >
              <View style={[{ width: widthTab }]}>
                <ViewMoreText text={book?.shortDescription} numberOfLines={5} />
              </View>
              <View style={[{ width: widthTab }]}>
                <Text>Tác giả: {book?.name}</Text>
              </View>
              <View style={[{ width: widthTab }]}>
                <Text>Thể loại: {book?.categories}</Text>
              </View>
            </ScrollView>
          </View>
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
          {book?.price && book?.price !== 0 ? book?.price : 'FREE'}
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
        >
          <Text style={[Fonts.textRegular, { color: Colors.primary }]}>
            Đọc
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default BookScreen
