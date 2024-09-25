import { CustomButton, OTPInputField } from '@/atoms'
import { Colors } from '@/constants'
import { useAuth } from '@/context'
import { authentificateRequest } from '@/services'
import { Octicons } from '@expo/vector-icons'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { FC, useEffect, useRef, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, KeyboardEvent, Platform, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import { useToast } from 'react-native-toast-notifications'

const Authentificate: FC = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    function onKeyboardDidShow(e: KeyboardEvent) { // Remove type here if not using TypeScript
      setKeyboardHeight(e.endCoordinates.height);
    }

    function onKeyboardDidHide() {
      setKeyboardHeight(0);
    }

    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const goBack = () => {
    navigation.goBack()
  }
  const {phone} = useLocalSearchParams<{phone: string}>()
  const [code, setCode] = useState('')
  const [pinReady, setPinReady] = useState(false)
  const MAX_CODE_LENGTH = 4

  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const {updateAuthToken, setRefreshToken} = useAuth()
  const authMe = async () =>{
    setIsLoading(true)
    if(pinReady){
      try{
        const res = await authentificateRequest({phone, code})
        if(res.nameNeeded){
          router.push({pathname: '/(auth)/enterName', params:{phone, code}} )
        }else{
          // setRefreshToken(res.tokens.refresh_token)
          await updateAuthToken(res.tokens.auth_token, res.tokens.refresh_token)
        }
        
      }catch(err){
        toast.show(`Щось не так з кодом...`,{
          type: 'danger',
          placement: 'top',
          duration: 3000, 
        })
      }finally{
        setIsLoading(false)
      }
    }else{
      toast.show(`Щось не так з кодом`,{
        type: 'warning',
        placement: 'top',
        duration: 3000, 
      })
      setIsLoading(false)
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={{flex: 1, backgroundColor: Colors.darky, paddingTop: insets.top+30, paddingHorizontal: scale(15)}}>
       <CustomButton callback={() => goBack()}>
					<Octicons name='chevron-left' size={scale(32)} color={Colors.accentRed} />
			</CustomButton>
      <View style={{
        marginVertical: scale(60),
        justifyContent:'center',
        alignItems:'center',
        gap:scale(15)
      }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize:scale(14)}}>Код надіслано на</Text>
          <Text style={{color:Colors.mDark, fontSize: scale(16)}}> {phone}</Text>
        </View>
        <OTPInputField {...{setPinReady, code, setCode}} maxLength={MAX_CODE_LENGTH}/>
      </View>
      <Pressable onPress={()=>authMe()} style={[{position: 'absolute', left:0, right:0, justifyContent: 'center', alignItems:"center", padding: scale(15)}, pinReady ? {backgroundColor: Colors.mDark} : {backgroundColor: Colors.mDark15},
      Platform.OS === 'ios' ? {bottom: 0 + keyboardHeight} : {bottom: 0 + insets.bottom}
    ]}>
        <Text style={{color:'white', fontSize: scale(16)}}>
        {isLoading ? 'Секунду...' : 'Продовжити'}
        </Text>
        </Pressable>

    </View>
    </TouchableWithoutFeedback>
  )
}

export default Authentificate