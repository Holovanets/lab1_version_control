import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Button, Animated, Easing } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Circle, Region, Marker } from 'react-native-maps';
import { scale } from 'react-native-size-matters';
import { Colors, SCREEN_WIDTH, mapJSON } from '@/constants';

interface IProps{
  center: Region
  strokeWidth: number
  strokeColor: string
  fillColor: string
}

const AnimatedCircle : FC<IProps> = ({ center, strokeWidth, strokeColor, fillColor }) => {
  const scaleAnimationRef = useRef(new Animated.Value(0)).current
  const opacityAnimationRef = useRef(new Animated.Value(1)).current
    useEffect(()=>{
      console.log(center);
      
    },[center])
    useEffect(() => {
      Animated.loop(
        Animated.timing(scaleAnimationRef, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear
        })
      ).start()
    }, [scaleAnimationRef])
  
    useEffect(() => {
      Animated.loop(
        Animated.timing(opacityAnimationRef, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear
        })
      ).start()
    }, [opacityAnimationRef])
  

  return (
    <Marker
              coordinate={center}
            >
              <Animated.View style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Animated.View
                  style={[
                    {
                      width: 400,
                      height: 400,
                      borderRadius: 100,
                      backgroundColor: 'rgba(193,39,45, 0.4)',
                      borderWidth: 1,
                      borderColor: 'rgba(193,39,45, 0.6)',
                      opacity: 1
                    },
                    { opacity: opacityAnimationRef },
                    { transform: [{ scale: scaleAnimationRef }] }
                  ]}
                />
                <View style={{
                   width: 8,
                   height: 8,
                   borderRadius: 4,
                   backgroundColor: 'rgba(193,39,45, 0.9)',
                   position: 'absolute'
                }} />
              </Animated.View>
            </Marker>
  )
};
export default AnimatedCircle