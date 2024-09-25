import { StatusBar, Pressable, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { MotiView } from 'moti';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Colors } from '@/constants';

const _colors = {
  on: Colors.mDark,
  off: 'rgba(255,255,255,0.3)',
};
interface IProps {
  size: number
  onValueChange?: (value: boolean) => void
  value?: boolean
  disabled?: boolean
}
const SimpleSwitch: FC<IProps> = ({ size = 64, onValueChange, value = false, disabled = false }) => {
  
  const [switchState, setSwitchState] = useState(value);
  const switchStateValue = useSharedValue(value ? 1 : 0);
  const _onPress = useCallback(() => {
    // onValueChange?.(!switchState);
    // setSwitchState(!switchState);
    // switchStateValue.value = withSpring(!switchState ? 1 : 0);
  }, [onValueChange, value, switchState]);
  useEffect(()=>{
    onValueChange?.(!switchState);
    setSwitchState(!switchState);
    switchStateValue.value = withSpring(!switchState ? 1 : 0);
  },[value])

  const v = useDerivedValue(() => {
    return interpolateColor(switchStateValue.value, [0, 1], [_colors.off, _colors.on]);
  });

  const stylez = useAnimatedStyle(() => {
    return {
      backgroundColor: '#070707',
    };
  });

  const _sizes = useMemo(
    () => ({
      track: size,
      thumb: size / 2,
      border: size / 6,
    }),
    [size],
  );

  return (
    <Pressable disabled={disabled} onPress={_onPress} >
      <Animated.View
        // animate={{
        //   backgroundColor: switchState ? _colors.on : _colors.off,
        //   shadowColor: switchState ? _colors.on : _colors.off
        // }}
        // transition={{
        //   type: 'timing',
        //   easing: Easing.linear
        // }}
        style={[
          {
            width: _sizes.track,
            height: _sizes.track,
            borderRadius: _sizes.track / 2,
            justifyContent: 'center',
            alignItems: 'center',
          },
          stylez,
        ]}
      >
        <MotiView
          animate={{
            width: switchState ? 0 : _sizes.thumb,
            borderWidth: switchState ? _sizes.border * 0.67 : _sizes.border,
            borderColor: switchState ? _colors.off : _colors.on,
          }}
          style={{ height: _sizes.thumb, borderRadius: _sizes.thumb / 2 }}
        />
      </Animated.View>
    </Pressable>
  );
}

export default SimpleSwitch