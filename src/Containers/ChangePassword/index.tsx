/* eslint-disable react-native/no-inline-styles */
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useTheme } from '@/Hooks'
import Header from '@/Components/Header'
import {
  useHandleChangePasswordMutation,
  useHandleGetUserInfoQuery,
} from '@/Services/modules/users'
import { Controller, useForm } from 'react-hook-form'
import { useAppDispatch } from '@/Hooks/useApp'
import { setMessage } from '@/Store/Global'

const ChangePassword = () => {
  const { Gutters, Layout, Fonts, Colors, MetricsSizes, Images, FontSize } =
    useTheme()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  const [handleChangePassword] = useHandleChangePasswordMutation()
  const resUserInfo = useHandleGetUserInfoQuery({})

  const dispatch = useAppDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
  } = useForm({
    defaultValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
  })

  const clickRegister = useCallback(
    (data: {
      oldPassword: string
      password: string
      confirmPassword: string
    }) => {
      handleChangePassword({
        currentPassword: data.oldPassword,
        newPassword: data.password,
        usernameOrEmail: resUserInfo?.data?.email ?? '',
        callback() {
          dispatch(
            setMessage({
              message: 'Đổi mật khẩu thành công',
            }),
          )
          resetField('confirmPassword')
          resetField('oldPassword')
          resetField('password')
        },
      })
    },
    [dispatch, handleChangePassword, resUserInfo?.data?.email, resetField],
  )

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.white }]}>
      <Header title="Đổi mật khẩu" />
      <View
        style={[Gutters.regularHPadding, { marginTop: MetricsSizes.large * 3 }]}
      >
        <Controller
          name="oldPassword"
          control={control}
          rules={{
            required: true,
            maxLength: 24,
            minLength: 4,
            pattern: /(?=.*[A-Za-z])(?=.*[0-9])/,
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <View
              style={[
                Layout.rowHCenter,
                {
                  marginTop: MetricsSizes.large,
                  borderBottomWidth: 1,
                  borderColor: Colors.placeHolder,
                },
              ]}
            >
              <TextInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Mật khẩu cũ"
                secureTextEntry={!showOldPassword}
                placeholderTextColor={Colors.placeHolder}
                style={[Layout.fill]}
              />
              <TouchableOpacity
                onPress={() => setShowOldPassword(!showPassword)}
                style={[Gutters.tinyVPadding, Gutters.tinyHPadding]}
              >
                <Image
                  source={showOldPassword ? Images.eye_open : Images.eye}
                  style={{
                    height: MetricsSizes.regular,
                    width: MetricsSizes.regular,
                    tintColor: Colors.primary,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {errors &&
          (errors.oldPassword?.type === 'required' ||
            errors.oldPassword?.type === 'maxLength' ||
            errors.oldPassword?.type === 'minLength' ||
            errors.oldPassword?.type === 'pattern') && (
            <Text style={[Fonts.textTiny, { color: 'red' }]}>
              Password từ 4 - 24 kí tự, bao gồm số và chữ
            </Text>
          )}

        <Controller
          control={control}
          name="password"
          rules={{
            required: true,
            maxLength: 24,
            minLength: 4,
            pattern: /(?=.*[A-Za-z])(?=.*[0-9])/,
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <View
              style={[
                Layout.rowHCenter,
                {
                  marginTop: MetricsSizes.large,
                  borderBottomWidth: 1,
                  borderColor: Colors.placeHolder,
                },
              ]}
            >
              <TextInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Mật khẩu mới"
                secureTextEntry={!showPassword}
                placeholderTextColor={Colors.placeHolder}
                style={[Layout.fill]}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={[Gutters.tinyVPadding, Gutters.tinyHPadding]}
              >
                <Image
                  source={showPassword ? Images.eye_open : Images.eye}
                  style={{
                    height: MetricsSizes.regular,
                    width: MetricsSizes.regular,
                    tintColor: Colors.primary,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {errors &&
          (errors.password?.type === 'required' ||
            errors.password?.type === 'maxLength' ||
            errors.password?.type === 'minLength' ||
            errors.password?.type === 'pattern') && (
            <Text style={[Fonts.textTiny, { color: 'red' }]}>
              Password từ 4 - 24 kí tự, bao gồm số và chữ
            </Text>
          )}

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: true,
            validate: value =>
              value === watch('password', '') || 'Nhập lại password',
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <View
              style={[
                Layout.rowHCenter,
                {
                  marginTop: MetricsSizes.large,
                  borderBottomWidth: 1,
                  borderColor: Colors.placeHolder,
                },
              ]}
            >
              <TextInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Xác nhận mật khẩu"
                secureTextEntry={!showRePassword}
                placeholderTextColor={Colors.placeHolder}
                style={[Layout.fill]}
              />
              <TouchableOpacity
                onPress={() => setShowRePassword(!showRePassword)}
                style={[Gutters.tinyVPadding, Gutters.tinyHPadding]}
              >
                <Image
                  source={showRePassword ? Images.eye_open : Images.eye}
                  style={{
                    height: MetricsSizes.regular,
                    width: MetricsSizes.regular,
                    tintColor: Colors.primary,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {errors &&
          (errors.confirmPassword?.type === 'required' ||
            errors.confirmPassword?.type === 'validate') && (
            <Text style={[Fonts.textTiny, { color: 'red' }]}>
              Nhập lại password
            </Text>
          )}
      </View>
      <TouchableOpacity
        onPress={handleSubmit(clickRegister)}
        style={[
          Layout.center,
          {
            backgroundColor: Colors.primary,
            marginHorizontal: MetricsSizes.large * 2,
            borderRadius: MetricsSizes.large,
            paddingVertical: MetricsSizes.small,
            marginTop: MetricsSizes.large * 1.5,
          },
        ]}
      >
        <Text style={[Fonts.titleLarge, { fontSize: FontSize.large * 1.3 }]}>
          Đổi mật khẩu
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChangePassword
