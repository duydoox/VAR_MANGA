/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/require-default-props */
import React, { useCallback, useEffect, useMemo } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import {
  useHandleGetBookLikedQuery,
  useHandleLikeBookMutation,
  useHandleUnLikeBookMutation,
} from '@/Services/modules/users'

type Props = {
  bookId?: number
}

const Like = ({ bookId }: Props) => {
  const { MetricsSizes, Colors, Gutters, Images } = useTheme()

  const resBookLiked = useHandleGetBookLikedQuery({})

  const book = useMemo(
    () => resBookLiked?.data?.content?.find(r => r.bookId === bookId),
    [bookId, resBookLiked?.data?.content],
  )

  const [handleLikeBook, { isLoading: loadLike, error: errLike }] =
    useHandleLikeBookMutation()
  const [handleUnLikeBook, { isLoading: loadUnLike, error: errUnLike }] =
    useHandleUnLikeBookMutation()

  const onPress = useCallback(() => {
    if (resBookLiked?.isSuccess && bookId !== undefined) {
      if (book) {
        handleUnLikeBook({ bookId: bookId })
      } else {
        handleLikeBook({ bookId: bookId })
      }
    }
  }, [book, bookId, handleLikeBook, handleUnLikeBook, resBookLiked?.isSuccess])

  useEffect(() => {
    if (
      !loadUnLike &&
      errUnLike?.data?.message?.includes('You already unLike this book')
    ) {
      resBookLiked.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errUnLike?.data?.message, loadUnLike])

  // useEffect(() => {
  //   if (!loadLike && errLike?.data?.includes('Liked success book')) {
  //     resBookLiked.refetch()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [errLike?.data?.message, loadLike])

  return (
    <TouchableOpacity
      style={[
        { backgroundColor: Colors.white, borderRadius: 300, elevation: 5 },
      ]}
      onPress={onPress}
      disabled={loadLike || loadUnLike || resBookLiked.isFetching}
    >
      <Image
        source={book ? Images.heart_red : Images.heart}
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
  )
}

export default Like
