import { FC, RefObject, useEffect, useState } from 'react'
import { Pressable, Text, TextInput, View, Keyboard } from 'react-native'
import { BottomSheetModal, BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet'
import { Colors } from '@/constants'
import { CustomBackdrop, CustomBackground } from '@/atoms'
import { scale } from 'react-native-size-matters'
import { BackHandler } from 'react-native';
import { useCart } from '@/context'

interface IModal {
	reference: RefObject<BottomSheetModal>
}


const AddCommentModal: FC<IModal> = ({reference}) => {
  const { dismiss, dismissAll } = useBottomSheetModal();
  const { cart, addCommentToCart } = useCart();
  const handleClosePress = () => reference?.current?.close()
  const [comment, setComment] = useState('')
  const maxCharacters = 255;
  const handleCommentChange = (value: string) => {
    if (value.length <= maxCharacters) {
      setComment(value);
      
      
    }
  };
  const onSubmitComment = () =>{
    Keyboard.dismiss()
      addCommentToCart(comment)
      dismissAll()
  }
  useEffect(()=>{
    if(cart.comment){
      setComment(cart.comment)
    }
  },[])



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
              flex: 1,
              width: '100%',
            }}>
              <TextInput
              placeholder='Напиши коментар до замовлення. Тут може бути інформація про алергію, пакування, або просто інфа про тебе :)'
              multiline
              value={comment}
              onChangeText={value=>handleCommentChange(value)}
              textAlignVertical='top'
              editable
              cursorColor={Colors.mDark}
              maxLength={maxCharacters}
              placeholderTextColor='rgba(255,255,255,0.5)'
                style={{
                  backgroundColor: '#151515',
                  borderBottomColor: Colors.mDark,
                  borderBottomWidth: 1,
                  flex: 1,
                  width: '100%',
                  padding: scale(15),
                  color: 'white',
                }}
              />
              <View style={{
                position: 'absolute',
                right: scale(15),
                bottom: scale(15)
              }}>
                <Text style={{color:'white'}}>{maxCharacters-comment.length}</Text>
              </View>
            </View>
            <Pressable
            onPress={()=>onSubmitComment()}
            style={{
              backgroundColor: Colors.mDark,
              width: '100%',
              padding: scale(15),
              borderRadius: scale(15),
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                color: 'white',
                fontSize: scale(14),
                fontWeight: 'bold'
              }}>Зберегти</Text>
            </Pressable>
          </View>
          
      </BottomSheetView>
      </BottomSheetModal>
  )
}

export default AddCommentModal