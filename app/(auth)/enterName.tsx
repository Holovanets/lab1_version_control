import { LoginScreen} from '@/components'
import { Colors } from '@/constants'
import { useAuth } from '@/context'
import { authentificateWithNameRequest } from '@/services/index'
import { router, useLocalSearchParams } from 'expo-router'
import { FC, useEffect, useRef, useState } from 'react'
import { Animated, Keyboard, KeyboardEvent, Platform, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import { useToast } from 'react-native-toast-notifications'




const EnterName: FC = () => {
  const {phone, code} = useLocalSearchParams<{phone: string, code: string}>()
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [formReady, setFormReady] = useState(false)
  const nameRef = useRef<TextInput | null>(null)
	const surnameRef = useRef<TextInput | null>(null)



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
  const insets = useSafeAreaInsets()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(()=>{
    setFormReady(surname.length > 2 && name.length > 2)
  },[surname, name])

  const {updateAuthToken, setRefreshToken} = useAuth()
  const toast = useToast()
  const authMe = async ()=>{
    setIsLoading(true)
    if(formReady) {
      try{
        const res = await authentificateWithNameRequest({phone, code,name, surname})
        if(res.done){
          await updateAuthToken(res.tokens.auth_token,res.tokens.refresh_token)
        }else{
          toast.show(`Якісь трабли... Спробуй спочатку`,{
            type: 'danger',
            placement: 'top',
            duration: 3000, 
          })
        }
      }catch(err){
        toast.show(`Якісь трабли... Спробуй спочатку`,{
          type: 'danger',
          placement: 'top',
          duration: 3000, 
        })
      }finally{
        setIsLoading(false)
      }
    }else{
      toast.show(`Ойой, ви не заповнили поля(`,{
        type: 'warning',
        placement: 'top',
        duration: 3000, 
      })
      setIsLoading(false)
    }
  }
	
	return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={{flex: 1, backgroundColor: Colors.darky, paddingTop: insets.top+90, paddingHorizontal: scale(15), gap: scale(15)}}>
    <TextInput
        style={{
          width: '100%',
          padding: scale(15),
          borderColor: Colors.mDark,
          borderWidth: scale(2),
          borderRadius: scale(15),
          backgroundColor: Colors.mDark15,
          color: 'white',
          fontSize: scale(18),
          
        }}
        // style={{backgroundColor: Colors.mDark15, borderColor: Colors.mDark, borderWidth: scale(2), borderRadius: scale(5), color: 'white', padding: scale(15), width: '100%', fontSize: scale(16), fontWeight: 'bold'}}
        value={name}
        onChangeText={text=>{
          setName(text)
        }}
        placeholder="Ваше ім'я"
        maxLength={16}
        blurOnSubmit={false}
        placeholderTextColor='rgba(255,255,255,0.5)'
        cursorColor={Colors.mDark}
        returnKeyType='done'
        selectionColor={Colors.mDark}
        ref={nameRef}
        returnKeyLabel='далі'
        enterKeyHint='next'
        onSubmitEditing={() => {
					surnameRef.current?.focus()
				}}
      />
      <TextInput
        style={{
          width: '100%',
          padding: scale(15),
          borderColor: Colors.mDark,
          borderWidth: scale(2),
          borderRadius: scale(15),
          backgroundColor: Colors.mDark15,
          color: 'white',
          fontSize: scale(18),
          
        }}
        // style={{backgroundColor: Colors.mDark15, borderColor: Colors.mDark, borderWidth: scale(2), borderRadius: scale(5), color: 'white', padding: scale(15), width: '100%', fontSize: scale(16), fontWeight: 'bold'}}
        value={surname}
        onChangeText={text=>{
          setSurname(text)
        }}
        placeholder="Ваше прізвище"
        maxLength={16}
        blurOnSubmit={false}
        placeholderTextColor='rgba(255,255,255,0.5)'
        cursorColor={Colors.mDark}
        returnKeyType='done'
        selectionColor={Colors.mDark}
        ref={surnameRef}
        returnKeyLabel='далі'
        enterKeyHint='next'
        onSubmitEditing={() => {
					authMe()
				}}
      />
  


        <Pressable onPress={()=>authMe()} style={[{position: 'absolute', left:0, right:0, justifyContent: 'center', alignItems:"center", padding: scale(15)}, formReady ? {backgroundColor: Colors.mDark} : {backgroundColor: Colors.mDark15},
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

export default EnterName
