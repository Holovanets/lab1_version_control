import { Colors } from '@/constants'
import { loginRequest } from '@/services/index'
import { SplashScreen, router } from 'expo-router'
import { FC, useEffect, useState } from 'react'
import { Text, View,TextInput, KeyboardAvoidingView, Keyboard, KeyboardEvent, Platform, Pressable, Alert} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import { useToast } from 'react-native-toast-notifications'

const LoginScreen: FC = () => {
  const insets = useSafeAreaInsets();
  const [isNumberComplete, setIsNumberComplete] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+380 ');
  const formatPhoneNumber = (text: string) => {
    
    // Убедитесь, что префикс "+380" всегда остается неизменным
    if (!text.startsWith('+380')) return '+380 ';
  
    // Удаляем все символы, кроме цифр, и оставляем только номер без "+380"
    let cleaned = ('' + text).replace(/\D/g, '').slice(3);
    // Ограничиваем длину номера
    cleaned = cleaned.substring(0, 9);

    // Форматирование номера
    let formatted = '+380';
    if (cleaned.length > 0) formatted += ` ${cleaned.substring(0, 2)}`;
    if (cleaned.length > 2) formatted += ` ${cleaned.substring(2, 5)}`;
    if (cleaned.length > 5) formatted += ` ${cleaned.substring(5, 7)}`;
    if (cleaned.length > 7) formatted += ` ${cleaned.substring(7)}`;

    const isComplete = cleaned.length === 9;
    setIsNumberComplete(isComplete);
  
  
    return formatted;
  };
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const verify = async ()=>{
    const phone = phoneNumber.split(' ').join('')
    setIsLoading(true)
    if(isNumberComplete){
      try{
        await loginRequest({phone})
        router.push({pathname: '/(auth)/authentificate', params:{phone}} )
      }catch(err){
        toast.show(`Трапилась халепа: ${err}`,{
          type: 'danger',
          placement: 'top',
          duration: 3000, 
        })
      }finally{
        setIsLoading(false)
      }
    }else{
      toast.show(`Щось не так з номером`,{
        type: 'warning',
        placement: 'top',
        duration: 3000, 
      })
      setIsLoading(false)
    }
  }
  


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
  return (
     
     <SafeAreaView style={{flex:1, backgroundColor: Colors.darky,  alignItems:"center" }}> 
      <Text  style={{color: 'rgba(255,255,255,0.5)', fontSize: scale(14), width:'80%', marginTop: scale(200), justifyContent: 'center', textAlign: 'center'}} lang='uk' >Введіть номер телефону для входу в додаток</Text>
      <View style={{
        backgroundColor: 'rgba(255,255,255,0.15)',
        flexDirection: 'row',
        borderRadius: scale(15),
        padding: scale(15),
        marginTop: 30
        }}>
      <TextInput 
      value={phoneNumber}
      onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
      style={{color: 'white', fontSize: scale(24)}}
      keyboardType='number-pad'
      selectionColor={Colors.mDark}
      placeholderTextColor='#FFF'/>
      </View>
      <Pressable onPress={()=>verify()} style={[{position: 'absolute', left:0, right:0, justifyContent: 'center', alignItems:"center", padding: scale(15)}, isNumberComplete ? {backgroundColor: Colors.mDark} : {backgroundColor: Colors.mDark15},
      Platform.OS === 'ios' ? {bottom: 0 + keyboardHeight} : {bottom: 0 + insets.bottom}
    ]}>
        <Text style={{color:'white', fontSize: scale(16)}}>
          {isLoading ? 'Секунду...' : 'Продовжити'}
        </Text>
        </Pressable>
    </SafeAreaView>
  )
}

export default LoginScreen