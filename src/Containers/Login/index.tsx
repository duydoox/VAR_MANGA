/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/Hooks'
import Header from '@/Components/Header'
import { useAppDispatch } from '@/Hooks/useApp'
import { setToken } from '@/Store/Auth'
import { TextInput } from 'react-native-gesture-handler'

const Login = () => {
  const { MetricsSizes, Fonts, Colors, Layout, Gutters, FontSize, Images } =
    useTheme()
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useAppDispatch()

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
        <TextInput
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
        <TouchableOpacity
          onPress={() => dispatch(setToken({ token: 'abc' }))}
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
          <TouchableOpacity>
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
