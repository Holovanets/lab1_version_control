// Inspiration: https://dribbble.com/shots/11638410-dinero
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { AnimatePresence } from 'framer-motion';
import { Dimensions, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { Colors } from '@/constants';
import { scale } from 'react-native-size-matters';
import { authentificateRequest } from '@/services/index';
import { useToast } from 'react-native-toast-notifications';
import { useAuth } from '@/context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

const { width, height } = Dimensions.get('screen');

const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'space', 0, 'delete'];
const passcodeLength = 4;
const _keySize = width / 4;
const _passcodeSpacing = (width - 3 * _keySize) / 2;
const _passCodeSize = width / (passcodeLength + 2);
interface PassCodeKeyboardProps {
  onPress: (value: string | number) => void;
}
const PassCodeKeyboard:React.FC<PassCodeKeyboardProps> = ({ onPress }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: _passcodeSpacing,
        alignItems: 'center',
      }}>
      {keys.map((key) => {
        if (key === 'space') {
          return <View style={{ width: _keySize }} key='space' />;
        }
        return (
          <TouchableOpacity
            onPress={() => onPress(key)}
            key={key}
            style={{
              width: _keySize - scale(10),
              height: _keySize - scale(10),
              margin: scale(5),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.mDark15,
              borderRadius: scale(50)
            }}>
            <View>
              {key === 'delete' ? (
                <MaterialCommunityIcons
                  name='keyboard-backspace'
                  size={42}
                  color='rgba(255,255,255,0.5)'
                />
              ) : (
                <Text
                  style={{ color: '#fff', fontSize: scale(28), fontWeight: '700' }}>
                  {key}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

interface PassCodeProps {
  passcode: string[]
  isValid: boolean
}
const PassCode:React.FC<PassCodeProps> = ({ passcode, isValid }) => {
  return (
    <MotiView
      animate={{
        translateX: isValid
          ? 0
          : [0, 0, 0, 0, 0, 0, 0, 5, -5, 5, -5, 5, -5, 5, 0],
      }}
      transition={{
        type: 'timing',
        duration: 100,
      }}
      style={{ flexDirection: 'row', marginVertical: _passcodeSpacing }}>
      {[...Array(passcodeLength).keys()].map((i) => {
        return (
          <View
            key={`passcode-${i}-${passcode[i]}`}
            style={{
              width: _passCodeSize,
              height: _passCodeSize,
              borderRadius: _passCodeSize,
              backgroundColor: Colors.mDark15,
              // borderWidth: 2,
              // borderColor: Colors.mDark,
              marginLeft: i === 0 ? 0 : _passCodeSize / 4,
            }}>
            <AnimatePresence>
              {passcode[i] && (
                <MotiView
                  key={`passcode-${i}-${i}`}
                  from={{ scale: 0, backgroundColor: Colors.mDark15 }}
                  animate={{
                    scale:
                      isValid && passcode.length === passcodeLength
                        ? [1.1, 1]
                        : 1,
                    backgroundColor:
                      isValid && passcode.length === passcodeLength
                        ? Colors.success
                        : Colors.mDark,
                  }}
                  exit={{ scale: 0, backgroundColor: Colors.mDark }}
                  transition={{
                    type: 'timing',
                    duration: 50,
                    easing: Easing.elastic(1.1),
                    backgroundColor: {
                      delay:
                        isValid && passcode.length === passcodeLength ? 500 : 0,
                    },
                  }}
                  style={{
                    backgroundColor: Colors.darky,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    borderRadius: _passCodeSize,
                  }}>
                  <Text
                    style={{
                      fontSize: _passCodeSize / 2,
                      color: '#fff',
                      fontWeight: '700',
                    }}>
                    {passcode[i]}
                  </Text>
                </MotiView>
              )}
            </AnimatePresence>
          </View>
        );
      })}
    </MotiView>
  );
};
const Authentificate = () => {
  const toast = useToast()
  const {updateAuthToken, setRefreshToken} = useAuth()
  const router = useRouter()
  const {phone} = useLocalSearchParams<{phone: string}>()
  const [passcode, setPasscode] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);
  // const [code, setCode] = useState<string>('')
  const authMe = async (code: string)=>{
    try{
      const res = await authentificateRequest({phone, code})
  
      if(res.nameNeeded){
        router.push({pathname: '/(auth)/enterName', params:{phone, code}} )
      }else{
        await new Promise(resolve => setTimeout(resolve, 500));
        await updateAuthToken(res.tokens.auth_token, res.tokens.refresh_token)
      }
      
    }catch(err){
      setIsValid(false)
      console.log('code: ',code)
      toast.show(`Щось не так з кодом...`,{
        type: 'danger',
        placement: 'top',
        duration: 3000, 
      })
    }
  }
  useEffect(() => {
    // setCode(passcode.join(''));
    // console.log(passcode.join(''));
    
      if (passcode.length === passcodeLength) {  
        setIsValid(true)
        authMe(passcode.join(''))  
    }
 
  }, [passcode]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.darky }}>
      <Text
        style={{
          fontSize: scale(16),
          paddingHorizontal: scale(15),
          textAlign: 'center',
          color: 'rgba(255,255,255,0.5)',
        }}>
        Введіть код надісланий на {phone}
      </Text>
      <PassCode
        passcode={passcode}
        isValid={passcode.length !== passcodeLength || isValid}
      />
      <PassCodeKeyboard
        onPress={(char) => {
          if (char === 'delete') {
            console.log('delete');
            setPasscode((passcode) =>
              passcode.length === 0
                ? []
                : passcode.slice(0, passcode.length - 1)
            );
            return;
          }
          if (passcode.length === passcodeLength) {
            return;
          }
          console.log('setkey: ', char);

          const newPasscode = [...passcode, String(char)];
          // @ts-ignore
          setPasscode((passcode) => newPasscode);
          // setPasscode(newPasscode);
        }}
      />
    </View>
  );
}
export default Authentificate 