/* eslint-disable react-native/no-inline-styles */
import { useTheme } from '@/Hooks'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React, { useMemo } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'

function TabsBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { Layout, Gutters, Images, MetricsSizes, Colors } = useTheme()
  const icons = useMemo(
    () => [
      { name: 'home', icon: Images.home },
      { name: 'favourite', icon: Images.heart },
      { name: 'user', icon: Images.user_icon },
    ],
    [Images.heart, Images.home, Images.user_icon],
  )
  return (
    <View
      style={[
        Layout.row,
        Layout.justifyContentAround,
        Gutters.regularVPadding,
        {
          backgroundColor: Colors.white,
          elevation: 22,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Image
              source={icons[index].icon}
              style={[
                {
                  width: MetricsSizes.regular * 2,
                  height: MetricsSizes.regular * 2,
                  tintColor: isFocused ? Colors.primary : Colors.black,
                },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default TabsBar
