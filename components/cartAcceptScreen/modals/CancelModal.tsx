import { FC, RefObject, useEffect, useState } from 'react'
import { Pressable, Text, TextInput, View, Keyboard } from 'react-native'
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet'
import { Colors } from '@/constants'
import { CustomBackdrop, CustomBackground } from '@/atoms'
import { scale } from 'react-native-size-matters'
import { BackHandler } from 'react-native';
import { useCart } from '@/context'


interface IModal {
	reference: RefObject<BottomSheetModal>
  price: string,
  time: string
}


const CancelModal: FC<IModal> = ({reference, price, time}) => {
  const { dismiss, dismissAll } = useBottomSheetModal();
  const handleClosePress = () => reference?.current?.close()

  const onCancelOrder = () =>{
    console.log('cancel');
    
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
				borderTopLeftRadius: 12,
				borderTopRightRadius: 12
			}}
			handleIndicatorStyle={{ backgroundColor: Colors.mDark }}
			index={0}
			ref={reference}
		>
			<BottomSheetView>
          <View style={{
            paddingHorizontal: scale(15),
            paddingVertical: scale(15),
            gap: scale(15),
            height: '100%'
          }}>


        <View style={{
          padding: scale(15),
          backgroundColor: Colors.mDark15,
          borderRadius: scale(15),
          flexDirection: 'row'
         }}>
          <Text style={{
            color: 'rgba(255,255,255,.5)',
            fontSize: scale(14),
            width: scale(100)
          }}>Обраний час: </Text>
          <Text style={{
            color: 'white',
            fontSize: scale(14)
          }}>{time}</Text>
         </View>


         <View style={{
          padding: scale(15),
          backgroundColor: Colors.mDark15,
          borderRadius: scale(15),
          flexDirection: 'row'
         }}>
          <Text style={{
            color: 'rgba(255,255,255,.5)',
            fontSize: scale(14),
            width: scale(100)
          }}>Підсумок: </Text>
          <Text style={{
            color: 'white',
            fontSize: scale(14)
          }}>{price}</Text>
          
         </View>
         



          <Pressable
          onPress={()=>onCancelOrder()}
          style={{
            backgroundColor: Colors.mDark,
            width: '100%',
            padding: scale(15),
            borderRadius: scale(15),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              color: 'white',
              fontSize: scale(14),
              fontWeight: 'bold'
            }}>Скасувати</Text>
          </Pressable>
        </View>
          
      </BottomSheetView>
      </BottomSheetModal>
  )
}

export default CancelModal