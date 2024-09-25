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
  networkName: string
  networkPassword: string
}


const PlaceWiFiModal: FC<IModal> = ({reference, networkName, networkPassword}) => {
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
			snapPoints={['30%']}
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
        }}>
          <Text style={{color:'white', fontSize: scale(16), fontWeight: 'bold'}}>
            Wi-Fi закладу
          </Text>

        <View style={{marginVertical: scale(15), gap: scale(15)}}>
          <View style={{flexDirection: 'row', gap: scale(15), width: '100%', paddingHorizontal: scale(15)}}>
            <View style={{backgroundColor: Colors.mDark15, height: scale(50), width: scale(50), borderRadius: scale(15), justifyContent: 'center', alignItems: 'center'}}>
            <Ionicons name="wifi" size={24} color={Colors.mDark} />
            </View>
            <View style={{backgroundColor: Colors.mDark15, flex: 1, height: scale(50), borderRadius: scale(15),justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color:'white', fontSize: scale(14), fontWeight: 'bold'}}>
                {networkName}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: scale(15), width: '100%', paddingHorizontal: scale(15)}}>
            <View style={[{height: scale(50), width: scale(50), borderRadius: scale(15), justifyContent: 'center', alignItems: 'center'},
            isPasswordCopied ? {backgroundColor: Colors.success15} : {backgroundColor: Colors.mDark15}
          ]}>
            <Octicons name="shield-lock" size={24} color={isPasswordCopied ? Colors.success : Colors.mDark} />
            </View>
            <Pressable
            onPress={()=>{copyToClipboard('escobar2024')}}
            style={[{flex: 1, height: scale(50), borderRadius: scale(15),justifyContent: 'center', alignItems: 'center'},
              isPasswordCopied ? {backgroundColor: Colors.success15} : {backgroundColor: Colors.mDark15}
            ]}>
              <Text style={{color:'white', fontSize: scale(14), fontWeight: 'bold'}}>
                {networkPassword}
              </Text>
            </Pressable>
          </View>
        </View>
        <Text style={{color:'rgba(255,255,255,0.5)', fontSize: scale(12)}}>Натисни, щоб скопіювати</Text>

        </View>
        </BottomSheetScrollView>
        </BottomSheetModal>
  )
}

export default PlaceWiFiModal