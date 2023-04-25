/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/require-default-props */
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/Hooks'
import {
  BookT,
  useHandleAddBookRatingMutation,
  useHandleSearchBookRatingQuery,
} from '@/Services/modules/books'
import Evaluation from '@/Components/Evaluation'
import { TextInput } from 'react-native'
import { useAppSelector } from '@/Hooks/useApp'

type Props = {
  book: BookT
}

const Rating = ({ book }: Props) => {
  const { Layout, Fonts, Colors, Gutters } = useTheme()

  const resSearchBookRating = useHandleSearchBookRatingQuery(
    { book: book.bookId },
    { skip: !book.bookId },
  )
  const { userId } = useAppSelector(state => state.auth)
  const [currentRating, setCurrentRating] = useState(0)
  const [evalua, setEvalua] = useState('')

  const [handleAddRating, { isLoading: loadingAddRating }] =
    useHandleAddBookRatingMutation()
  return (
    <View style={[Gutters.regularHPadding]}>
      <View style={[Layout.rowHCenter]}>
        <Text
          style={[
            Fonts.titleRegular,
            Gutters.smallRMargin,
            { color: Colors.black },
          ]}
        >
          Nhận xét
        </Text>
        {resSearchBookRating?.isFetching && (
          <ActivityIndicator color={Colors.primary} />
        )}
      </View>
      <ScrollView
        style={{ maxHeight: 300, marginTop: 10 }}
        contentContainerStyle={{ flexGrow: 1 }}
        nestedScrollEnabled
      >
        {resSearchBookRating?.data?.content
          ?.slice()
          ?.sort(
            (a, b) =>
              new Date(b.modifiedDate).getTime() -
              new Date(a.modifiedDate).getTime(),
          )
          .map(r => (
            <View style={[Gutters.tinyBMargin]}>
              <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
                <Text style={[Fonts.textSmall, { color: Colors.black }]}>
                  {r.createdBy}
                </Text>
                <Text style={[Fonts.textSmall, { color: Colors.black }]}>
                  {new Date(r.modifiedDate!)?.toLocaleString()}
                </Text>
              </View>
              <Evaluation rating={r.rating} size="tiny" />
              <Text style={[Fonts.textSmall, { color: Colors.text4 }]}>
                {r.comment}
              </Text>
            </View>
          ))}
      </ScrollView>
      <View
        style={[
          Gutters.regularTMargin,
          Gutters.smallTPadding,
          Gutters.tinyBPadding,
          Gutters.smallHPadding,
          { borderWidth: 1, borderColor: Colors.placeHolder },
        ]}
      >
        <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
          <Evaluation
            rating={currentRating}
            getStar={setCurrentRating}
            size="large"
          />
          {loadingAddRating && <ActivityIndicator color={Colors.primary} />}
        </View>
        <View style={[Layout.rowHCenter]}>
          <View style={[Layout.fill]}>
            <TextInput
              placeholder="Hãy viết đánh giá của bạn"
              value={evalua}
              onChangeText={setEvalua}
            />
          </View>
          <TouchableOpacity
            disabled={loadingAddRating}
            onPress={() => {
              if (currentRating) {
                handleAddRating({
                  bookId: book.bookId,
                  rating: currentRating,
                  userId: userId!,
                  comment: evalua,
                  callback() {
                    setCurrentRating(0)
                    setEvalua('')
                  },
                })
              } else {
                Alert.alert('Thông báo', 'Hãy chọn sao để gửi đánh giá của bạn')
              }
            }}
          >
            <View
              style={[
                Gutters.regularHPadding,
                { borderLeftWidth: 1, borderLeftColor: Colors.placeHolder },
              ]}
            >
              <Text style={[Fonts.titleRegular, { color: Colors.black }]}>
                Gửi
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Rating
