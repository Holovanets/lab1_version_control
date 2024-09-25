import { Colors } from '@/constants'
import { ScreenSpotItem } from '@/services'
import { Feather } from '@expo/vector-icons'
import { FC } from 'react'
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { useToast } from 'react-native-toast-notifications'

interface IProps {
  spot: ScreenSpotItem
  orderId: number
}

const OrderInfoPlace: FC<IProps> = ({spot, orderId}) => {

  const toast = useToast()

  const callToPlace = () =>{
    if(spot){
      const phoneData = spot.socials.find(social => social.type === 'phone')
      if(phoneData){
        const phoneNumber = phoneData.link.replace(/[^\d+]/g, ''); // Очистка номера от лишних символов
        Linking.openURL(`tel:${phoneNumber}`);
      }else{
        toast.show(`Упс, котик. Здається, я не можу знайти номер`,{
          type: 'danger',
          placement: 'top',
          duration: 3000, 
        })
      }
    }else{
      toast.show(`Упс, котик. Здається, я не можу знайти номер`,{
        type: 'danger',
        placement: 'top',
        duration: 3000, 
      })
    }
  }
  

  return (

    <View style={{
      padding: scale(15),
      backgroundColor: Colors.mDark15,
      borderRadius: scale(20),
      marginHorizontal: scale(15),
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
    
      <View style={{
        flexDirection: 'row',
        gap: scale(10)
      }}>
        <Image
          source={spot?.logo? { uri: spot?.logo } : require('@/assets/images/main/empty_dish_screen.png')}
          resizeMode='cover'
          style={{
            height: scale(50),
            width: scale(50),
            borderRadius: scale(15)
          }}
        />

        <View style={{
          justifyContent: 'center',
          gap: scale(5)
        }}>
          <Text style={{
            color: 'white',
            fontSize: scale(14),
            fontWeight: 'bold'
          }}>{spot ? spot.name.length > 16 ? spot.name.substring(0,16) + '...' : spot.name : 'Завантажую'}</Text>
          <Text style={{
            color: Colors.mDark,
            fontSize: scale(12),
          }}>Замовлення №{orderId}</Text>
        </View>

      </View>
      <TouchableOpacity
      onPress={() => {callToPlace()}}
      style={{
        height: scale(50),
        width: scale(50),
        backgroundColor: Colors.mDark,
        borderRadius: scale(15),
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Feather name="phone-call" size={24} color="white" />
      </TouchableOpacity>

    </View>
  )
}

export default OrderInfoPlace