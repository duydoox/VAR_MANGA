/* eslint-disable react-native/no-inline-styles */
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTheme } from '@/Hooks'
import { useHandleSearchBookQuery } from '@/Services/modules/books'
import usePopup from '@/Hooks/usePopup'
import { ScrollView } from 'react-native-gesture-handler'

const SearchBook = () => {
  const { MetricsSizes, Layout, Gutters, Colors, Images, Fonts } = useTheme()
  const [title, setTitle] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [layout, setLayout] = useState({ height: 0, width: 0, x: 0, y: 0 })

  const popup = usePopup()

  const debounce = useCallback(
    (t: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
      if (t === '') {
        setTitle(t)
        popup?.onClose?.()
      }
      debounceRef.current = setTimeout(() => {
        setTitle(t)
      }, 1000)
    },
    [popup],
  )

  const resSearchBook = useHandleSearchBookQuery(
    {
      title: title,
    },
    {
      skip: title.trim() === '',
    },
  )

  useEffect(() => {
    if (!resSearchBook.isFetching) {
      if (resSearchBook?.data?.content) {
        popup.onShow?.(
          <View
            style={[
              Gutters.smallVPadding,
              Gutters.smallHPadding,
              {
                position: 'absolute',
                top: layout.y + layout.height + 40,
                left: layout.x,
                width: layout.width,
                backgroundColor: Colors.white,
                elevation: 10,
                borderRadius: MetricsSizes.small,
                maxHeight: MetricsSizes.large * 8,
              },
            ]}
          >
            {!resSearchBook?.data?.content?.length && (
              <View style={[Layout.rowCenter]}>
                <Image
                  source={Images.empty}
                  style={[
                    {
                      width: MetricsSizes.large * 1.6,
                      height: MetricsSizes.large * 1.4,
                    },
                  ]}
                  resizeMode="contain"
                />
                <Text>Không tìm thấy</Text>
              </View>
            )}
            <ScrollView>
              {resSearchBook?.data?.content?.map((b, i) => (
                <TouchableOpacity
                  key={i}
                  style={[Layout.row, Gutters.smallVMargin]}
                >
                  <Image
                    source={
                      b?.thumbnailUrl ? { uri: b?.thumbnailUrl } : Images.manga
                    }
                    style={{
                      width: MetricsSizes.large * 1.5,
                      height: MetricsSizes.regular * 1.5,
                      borderRadius: MetricsSizes.small,
                      marginTop: MetricsSizes.tiny / 2,
                    }}
                    resizeMode="contain"
                  />
                  <View style={[Layout.fill]}>
                    <Text style={[Fonts.titleRegular, { color: Colors.black }]}>
                      {b.title}
                    </Text>
                    <Text
                      numberOfLines={4}
                      style={[Fonts.textSmall, { color: Colors.black }]}
                    >
                      {b.shortDescription}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>,
        )
      } else {
        popup?.onClose?.()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resSearchBook?.data?.content, resSearchBook.isFetching])

  return (
    <View
      style={[
        Layout.rowHCenter,
        Gutters.regularHMargin,
        Gutters.smallHPadding,
        Gutters.largeTMargin,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: Colors.f5,
          borderRadius: MetricsSizes.regular * 2,
          elevation: 11,
        },
      ]}
      onLayout={e => {
        setLayout(e.nativeEvent.layout)
      }}
    >
      <Image
        source={Images.search}
        style={{
          height: MetricsSizes.regular * 1.5,
          width: MetricsSizes.regular * 1.5,
        }}
        resizeMode="contain"
      />
      <TextInput
        style={[Layout.fill]}
        placeholder="Tìm kiếm"
        onChangeText={debounce}
      />
      <TouchableOpacity
        onPress={() => {
          popup?.onClose?.()
        }}
      >
        <Image
          source={Images.options}
          style={{
            height: MetricsSizes.regular * 1.5,
            width: MetricsSizes.regular * 1.5,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchBook
