/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTheme } from '@/Hooks'
import Header from '@/Components/Header'
import { TextInput } from 'react-native-gesture-handler'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/Navigators/utils'
import { useLoginMutation } from '@/Services/modules/auth'
import { useAppSelector } from '@/Hooks/useApp'

const Login = () => {
  const { MetricsSizes, Fonts, Colors, Layout, Gutters, FontSize, Images } =
    useTheme()
  const [showPassword, setShowPassword] = useState(false)

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>()

  const [handleLogin] = useLoginMutation()

  const { defaultUsername } = useAppSelector(state => state.config)
  const { usernameRegisted } = useAppSelector(state => state.global)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const clickLogin = useCallback(
    (data: { email: string; password: string }) => {
      handleLogin({ username: data.email, password: data.password })
    },
    [handleLogin],
  )

  const register = () => {
    navigation.replace('Register')
  }

  useEffect(() => {
    setValue('email', defaultUsername ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (usernameRegisted && usernameRegisted !== '') {
      setValue('email', usernameRegisted)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameRegisted])
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
          Welcome Back
        </Text>
        <Text style={[Fonts.textRegular, { color: Colors.text2 }]}>
          enter your email and password
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

        <TouchableOpacity
          onPress={handleSubmit(clickLogin)}
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
            Login
          </Text>
        </TouchableOpacity>
        <View style={[Layout.center, Gutters.tinyTMargin]}>
          <TouchableOpacity>
            <Text
              style={[
                Fonts.textSmall,
                Fonts.textCenter,
                { color: Colors.text3 },
              ]}
            >
              Forget password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={register}>
            <Text
              style={[
                Fonts.textSmall,
                Fonts.textCenter,
                { color: Colors.text3 },
              ]}
            >
              or create a new account
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
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

export default Login
