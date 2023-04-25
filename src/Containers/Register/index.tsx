/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useTheme } from '@/Hooks'
import Header from '@/Components/Header'
import { useAppDispatch } from '@/Hooks/useApp'
import { TextInput } from 'react-native-gesture-handler'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/Navigators/utils'
import { StackNavigationProp } from '@react-navigation/stack'
import { useRegisterMutation } from '@/Services/modules/users'
import { setMessage, setUsernameRegisted } from '@/Store/Global'

const Register = () => {
  const { MetricsSizes, Fonts, Colors, Layout, Gutters, FontSize, Images } =
    useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const [termed, setTermed] = useState(false)
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>()

  const [handleRegister, { isLoading }] = useRegisterMutation()

  const login = useCallback(() => {
    navigation.replace('Login')
  }, [navigation])

  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const clickRegister = useCallback(
    (data: { email: string; password: string; confirmPassword: string }) => {
      if (termed) {
        handleRegister({
          username: data.email,
          password: data.password,
          callback() {
            dispatch(setUsernameRegisted({ usernameRegisted: data.email }))
            dispatch(setMessage({ message: 'Đăng kí tài khoản thành công' }))
            login()
          },
        })
      } else {
        dispatch(
          setMessage({
            message: 'Vui lòng đồng ý điều khoản và chính sách của chúng tôi!',
          }),
        )
      }
    },
    [dispatch, handleRegister, login, termed],
  )
  return (
    <View style={[Layout.fill]}>
      <Header />
      <View
        style={{
          backgroundColor: Colors.blue,
          width: MetricsSizes.large * 11,
          height: MetricsSizes.large * 11,
          borderRadius: MetricsSizes.large * 20,
          position: 'absolute',
          bottom: MetricsSizes.large * 3,
          left: -MetricsSizes.large * 5,
        }}
      />
      <View
        style={{
          backgroundColor: Colors.blue,
          width: MetricsSizes.large * 14,
          height: MetricsSizes.large * 14,
          borderRadius: MetricsSizes.large * 20,
          position: 'absolute',
          bottom: -MetricsSizes.large * 5,
          left: -MetricsSizes.large * 2,
        }}
      />
      <View style={[Layout.fill, Gutters.largeHPadding]}>
        <Text
          style={[
            Fonts.titleMaxSize,
            Gutters.largeTMargin,
            { color: Colors.primary },
          ]}
        >
          Sygn up
        </Text>
        <Text style={[Fonts.textRegular, { color: Colors.text2 }]}>
          enter your username and password
        </Text>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              placeholder="Email"
              placeholderTextColor={Colors.placeHolder}
              style={[
                Gutters.regularTMargin,
                {
                  borderBottomWidth: 1,
                  borderColor: Colors.placeHolder,
                  marginTop: MetricsSizes.large * 1.5,
                },
              ]}
            />
          )}
        />
        {errors &&
          (errors.email?.type === 'required' ||
            errors.email?.type === 'pattern') && (
            <Text style={[Fonts.textTiny, { color: 'red' }]}>
              Email chưa đúng định dạng
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
                placeholder="Password"
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
                placeholder="Confirm password"
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

        <View style={[Layout.row, { marginTop: MetricsSizes.small }]}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.grey1,
              borderRadius: MetricsSizes.tiny / 2,
              width: MetricsSizes.regular * 1.5,
              height: MetricsSizes.regular * 1.5,
              marginRight: MetricsSizes.tiny,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setTermed(v => !v)}
          >
            {termed && (
              <Image
                source={Images.tick2}
                style={{
                  width: MetricsSizes.regular * 1.5,
                  height: MetricsSizes.regular * 1.5,
                  tintColor: Colors.primary,
                }}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
          <Text style={(Fonts.textSmall, { color: Colors.grey })}>
            Đồng ý với điều khoản và chính sách bảo mật
          </Text>
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
            Register
          </Text>
        </TouchableOpacity>
        <View style={[Layout.center, Gutters.tinyTMargin]}>
          <TouchableOpacity onPress={login} disabled={isLoading}>
            <Text
              style={[
                Fonts.textSmall,
                Fonts.textCenter,
                { color: Colors.text3 },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={Images.login_img}
            style={{
              height: MetricsSizes.large * 6,
              width: MetricsSizes.large * 6,
              marginTop: MetricsSizes.large * 2,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  )
}

export default Register
