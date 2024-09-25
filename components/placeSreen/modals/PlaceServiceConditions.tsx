import { FC, RefObject, useEffect, useState } from 'react'
import { Alert, Pressable, Text, View } from 'react-native'
import { BottomSheetModal, BottomSheetScrollView, useBottomSheetModal } from '@gorhom/bottom-sheet'
import { Colors, mapJSON } from '@/constants'
import { CustomBackdrop, CustomBackground } from '@/atoms'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { scale } from 'react-native-size-matters'
import { Linking } from 'react-native';
import { Ionicons, FontAwesome5, Octicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { BackHandler } from 'react-native';

interface IModal {
	reference: RefObject<BottomSheetModal>
}


const PlaceServiceConditions: FC<IModal> = ({reference}) => {
  const [isPasswordCopied, setIsPasswordCopied] = useState(false)
  const { dismiss, dismissAll } = useBottomSheetModal();
  const copyToClipboard = async (text: string) => {
    Clipboard.setStringAsync(text)
    setIsPasswordCopied(true)
  }
  useEffect(() => {
    const handleBackButton = () => {
      return dismiss() // dismiss() returns true/false, it means there is any instance of Bottom Sheet visible on current screen.
    }
  
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);
  return (
    <BottomSheetModal
			backdropComponent={props => <CustomBackdrop {...props} reference={reference} />}
			backgroundComponent={props => <CustomBackground {...props} />}
			snapPoints={['60%']}
			backgroundStyle={{
				borderTopLeftRadius: scale(15),
				borderTopRightRadius: scale(15)
			}}
			handleIndicatorStyle={{ backgroundColor: Colors.mDark }}
			index={0}
			ref={reference}
		>
			<BottomSheetScrollView>
        <View style={{
          alignItems: 'center',
          paddingHorizontal: scale(15)
        }}>
          <Text style={{color:'white', fontSize: scale(16), fontWeight: 'bold'}}>
            Наявні умови
          </Text>
          <View style={{
            width: '100%',
            padding: scale(15),
            backgroundColor: Colors.mDark15,
            gap: scale(15),
            borderRadius: scale(15),
            marginTop: scale(15)
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <View style={{
                flexDirection: 'row',
                gap: scale(15),
                alignItems: 'center'
              }}>
                <View style={{
                  backgroundColor: '#151515',
                  height: scale(36),
                  width: scale(36),
                  borderRadius: scale(10),
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Ionicons name="bag" size={24} color={Colors.mDark} />
                </View>
                <Text style={{
                  color: 'white',
                  fontSize: scale(16),
                  fontWeight: 'bold'
                }}>Самовивіз</Text>
              </View> 
              <Text style={{
                color:'white',
                fontSize: scale(16),
                fontWeight: 'bold'
              }}>0₴</Text>
            </View>
            <Text style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: scale(12)
            }}>
              Самовивіз через сервіз, навідміну від доставки – безкоштовний. Просто зроби замовлення та насолоджуйся. Ніякої додаткової плати за самовивіз не ми, не заклад не візьмемо.
            </Text>
          </View>


          <View style={{
            width: '100%',
            padding: scale(15),
            backgroundColor: Colors.mDark15,
            gap: scale(15),
            borderRadius: scale(15),
            marginTop: scale(15)
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <View style={{
                flexDirection: 'row',
                gap: scale(15),
                alignItems: 'center'
              }}>
                <View style={{
                  backgroundColor: '#151515',
                  height: scale(36),
                  width: scale(36),
                  borderRadius: scale(10),
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Ionicons name="build-sharp" size={24} color={Colors.mDark} />
                </View>
                <Text style={{
                  color: 'white',
                  fontSize: scale(16),
                  fontWeight: 'bold'
                }}>Робота сервісу</Text>
              </View> 
              <Text style={{
                color:'white',
                fontSize: scale(16),
                fontWeight: 'bold'
              }}>0%</Text>
            </View>
            <Text style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: scale(12)
            }}>
              0% тому що я хочу, щоб ви зацінили сервіс. В майбутньому ця комісія з'явиться, але точно буде невисокою. Розробник декілька місяців не їв у підвалі. Але, здається, йому все-таки хочеться свободи:(
            </Text>
          </View>
       

        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

export default PlaceServiceConditions