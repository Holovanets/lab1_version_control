import { StatusBar, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { MotiView, MotiText } from 'moti';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

const numZeroToNine = [...Array(10).keys()];

// Hook
function usePrevious(value:number) {
  const ref = useRef<number>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

interface TickProps{
  num: number
  textSize: number
  

}
const Tick:FC<TickProps> = ({ num, textSize }) => {
  const xxx = usePrevious(num);
  return (
    <MotiView style={{ height: textSize, overflow: 'hidden' }}>
      <MotiView
        from={{ translateY: -textSize * (xxx ?? 0) }}
        animate={{ translateY: -textSize * num }}
        transition={{
          type: 'timing',
          duration: 500,
          delay: 80,
        }}>
        {numZeroToNine.map((number, index) => {
          return (
            <MotiText
              key={index}
              style={[
                // textStyle,
                {
                  height: textSize,
                  fontSize: textSize,
                  lineHeight: textSize * 1.1,
                  textAlign: 'center',
                  color:'white'
                },
              ]}>
              {number}
            </MotiText>
          );
        })}
      </MotiView>
    </MotiView>
  );
};
interface TickerProps{
  number: number
  textSize: number
  

}
const Ticker:FC<TickerProps> = ({ number, textSize }) => {
  const numArray = useMemo(() => String(number).split(''), [number]);
  return (
    <MotiView style={{ flexDirection: 'row' }}>
      {numArray.map((num, index) => {
        return (
          <Tick
            key={index}
            num={parseFloat(num)}
            textSize={textSize}
          />
        );
      })}
    </MotiView>
  );
};

export default Ticker