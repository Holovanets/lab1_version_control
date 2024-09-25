import { Colors } from '@/constants'
import { FC, useEffect, useRef, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { scale } from 'react-native-size-matters'

interface IProps{
  setPinReady : (pinReady: boolean) => void
  setCode: (code: string) => void
  code: string
  maxLength: number
}

const OTPInputField: FC<IProps> = ({setPinReady, setCode, code, maxLength}) => {
  const[inputContainerIsFocused, setInputContainerIsFocused] = useState(false)
  const textInputRef = useRef<TextInput | null>(null)
  const handleOnBlur = () =>{
    setInputContainerIsFocused(false)
  }
  const handleOnPress = ()=>{
    setInputContainerIsFocused(true)
    textInputRef.current?.focus()
  }
  useEffect(()=>{
    setPinReady(code.length === maxLength)
    return ()=> setPinReady(false)
  },[code])
  const toCodeDigitInput = (_value: string, index: number) =>{
    const emptyInputChar = " "
    const digit = code[index] || emptyInputChar

    const isCurrentDigit = index === code.length
    const isLastDigit = index === maxLength - 1
    const isCodeFull = code.length === maxLength

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull)

    const StyledOTPInput = inputContainerIsFocused && isDigitFocused
    return (
      <View key={index} style={[
        {
          borderColor: Colors.mDark,
          minWidth: '15%',
          borderWidth: scale(2),
          borderRadius: scale(5),
          padding: scale(12)
        },
        StyledOTPInput ? {backgroundColor: Colors.mDark15} : null
      ]}>
        <Text style={{
          fontSize: scale(18),
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'white',
        }}>
          {digit}
        </Text>

      </View>
    )
  }
  const codeDigitsArray = new Array(maxLength).fill(0)

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    }}>

      <Pressable
        onPress={handleOnPress}
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </Pressable>
      <TextInput
        style={{
          position:'absolute',
          width: 1,
          height: 1,
          opacity:0
        }}
        // style={{backgroundColor: Colors.mDark15, borderColor: Colors.mDark, borderWidth: scale(2), borderRadius: scale(5), color: 'white', padding: scale(15), width: '100%', fontSize: scale(16), fontWeight: 'bold'}}
        value={code}
        onChangeText={text=>{
          setCode(text)
        }}
        maxLength={maxLength}
        returnKeyType='done'
        selectionColor={Colors.mDark}
        keyboardType='number-pad'
        autoComplete="sms-otp"
        textContentType="oneTimeCode"
        ref={textInputRef}
        onBlur={handleOnBlur}
      />
      <Text>OTPInputField</Text>
    </View>
  )
}

export default OTPInputField