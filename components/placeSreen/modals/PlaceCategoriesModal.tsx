import { FC, RefObject, useEffect, useState } from 'react'
import { Alert, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { BottomSheetModal, BottomSheetScrollView, useBottomSheetModal } from '@gorhom/bottom-sheet'
import { Colors, mapJSON } from '@/constants'
import { CustomBackdrop, CustomBackground } from '@/atoms'
import { scale } from 'react-native-size-matters'
import { BackHandler } from 'react-native';
import { PlaceCategoriesResponse } from '../usePlaceMenu'
import { Octicons } from '@expo/vector-icons'

interface IModal {
	reference: RefObject<BottomSheetModal>
  categories : PlaceCategoriesResponse[] | undefined
  setCategory: (id: number) => void
}


const PlaceCategoriesModal: FC<IModal> = ({reference, categories,setCategory}) => {
  const { dismiss, dismissAll } = useBottomSheetModal();
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
			snapPoints={['50%' , '80%']}
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
          gap: scale(15),
          paddingHorizontal: scale(15)
        }}>
          <View style={{
            paddingVertical:scale(15),
            width: '100%',
            borderBottomWidth: scale(2),
            borderBottomColor: '#151515'
          }}>
            <Text style={{color:'white', fontSize: scale(16), fontWeight: 'bold'}}>
              Обери категорію
            </Text>
          </View>
          <View style={{
            width: '100%',
            borderRadius: scale(15),
            overflow: 'hidden',
            gap: scale(2)
          }}>
            {categories && categories.map(cat =>(
              <TouchableOpacity
              onPress={()=>{
                setCategory(cat.id)
                dismiss()
              }}
              key={cat.id} style={{ 
                width: '100%',
                backgroundColor: '#151515',
                padding: scale(15),
                borderRadius: scale(5),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Text style={{
                  color:'white',
                  fontSize: scale(14),
                  width: scale(250)
                }}>{cat.name}</Text>
                <Octicons name="chevron-right" size={24} color="white" />
              </TouchableOpacity>
            ))}
          </View>

        

        </View>
        </BottomSheetScrollView>
        </BottomSheetModal>
  )
}

export default PlaceCategoriesModal