import { FC, RefObject, useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import { BottomSheetModal, BottomSheetScrollView, useBottomSheetModal } from '@gorhom/bottom-sheet'
import { Colors } from '@/constants'
import { CustomBackdrop, CustomBackground } from '@/atoms'
import { scale } from 'react-native-size-matters'
import { Linking } from 'react-native';
import { BackHandler } from 'react-native';

interface IModal {
	reference: RefObject<BottomSheetModal>
}


const HomeInfoModal: FC<IModal> = ({reference}) => {
  const { dismiss, dismissAll } = useBottomSheetModal();
  const handleClosePress = () => reference?.current?.close()
	const openTg = () => {
		const url = `https://t.me/golovanetss`;
		Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
	};
	const openDonate = () => {
		const url = `https://send.monobank.ua/jar/4Dyucs5PBU`;
		Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
	};
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
        snapPoints={['40%']}
        backgroundStyle={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12
        }}
        handleIndicatorStyle={{ backgroundColor: Colors.mDark }}
        index={0}
        ref={reference}
      >
        <BottomSheetScrollView>
            <View style={{
              paddingHorizontal: scale(30),
              paddingTop: scale(30),
            }}>
              <Pressable
              android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
              onPress={()=>openTg()}
              style={{
                borderBottomColor: Colors.mDark15,
                borderBottomWidth: scale(2),
                paddingVertical: scale(15)
              }}>
                <Text style={{color: 'white', fontSize: scale(14)}}>💬   Зв'язатися у ТГ</Text>
              </Pressable>
              <Pressable
              android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
              onPress={()=>openDonate()}
              style={{
                borderBottomColor: Colors.mDark15,
                borderBottomWidth: scale(2),
                paddingVertical: scale(15)
              }}>
                <Text style={{color: 'white', fontSize: scale(14)}}>🇺🇦   Скинь гроші, ухилянт. Фонд "Повернись живим"</Text>
              </Pressable>
            </View>
        </BottomSheetScrollView>
        </BottomSheetModal>
  )
}

export default HomeInfoModal