import { Animated, View, TouchableOpacity } from 'react-native'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import React, { useMemo } from 'react'
import { useTheme } from '@/Hooks'

const HomeTopTabs = ({
  state,
  descriptors,
  navigation,
}: //   position,
MaterialTopTabBarProps) => {
  const { Images, Fonts, Colors, Layout, Gutters } = useTheme()

  const icons = useMemo(
    () => [
      { name: 'Mới nhất', icon: Images.home },
      { name: 'Thể loại', icon: Images.heart },
      { name: 'Hot', icon: Images.user_icon },
      { name: 'Truyện VIP', icon: Images.user_icon },
    ],
    [Images.heart, Images.home, Images.user_icon],
  )
  return (
    <View
      style={[Layout.row, Layout.justifyContentAround, Gutters.regularVPadding]}
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

        // const inputRange = state.routes.map((_, i) => i)
        // const opacity = position.interpolate({
        //   inputRange,
        //   outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        // })

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Animated.Text
              style={[
                Fonts.titleRegular,
                {
                  color: isFocused ? Colors.primary : Colors.text4,
                  // opacity: opacity
                },
              ]}
            >
              {icons[index].name}
            </Animated.Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default HomeTopTabs
