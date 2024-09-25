import { Colors } from '@/constants'
import { usePlace } from '@/services/index'
import { Link } from 'expo-router'
import { FC, useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { scale } from 'react-native-size-matters'

interface IProps{
  spotId: number
  create: string
  price: string
  status: string
  orderId: number
}

const UserCardTransactionItem: FC<IProps> = ({spotId, create, price, status, orderId}) => {
  const {spotModels, spotOperations} = usePlace(spotId, false, false, false, false, true)
  const [orderStatus, setOrderStatus] = useState('Перевіряю статус')
  useEffect(()=>{
    if(status && status === 'NEW'){
      setOrderStatus('Оформлено')
    }else if(status === 'APPLY'){
      setOrderStatus('Підтвердженно')
    }else if(status === 'PROCESS'){
      setOrderStatus('Ура! Готується')
    }else if(status === 'READY'){
      setOrderStatus('Ти реді? Готово!')
    }else if(status === 'DENY'){
      setOrderStatus('Не прийняте(')
    }else if(status === 'ARCHIVED'){
      setOrderStatus('Завершено')
    }
  },[status])

  useEffect(()=>{
    if(spotId){
      spotOperations.getThisSpot()
    }     
    
  },[spotId])

  return (
    <Link
    href={{
      pathname: '/(app)/order/[orderId]',
      params: { orderId: orderId }
    }}
    key={orderId}
    asChild
  >
      <TouchableOpacity style={{
        width: '100%',
        backgroundColor: '#151515',
        borderRadius: scale(5),
        flexDirection: 'row',
        padding: scale(10),
        gap: scale(15)
      }}>
        <Image
            source={spotModels.spot?.logo ? { uri: spotModels.spot?.logo} : require('@/assets/images/main/empty_dish_screen.png')}
            resizeMode='cover'
            style={{
              height: scale(50),
              width: scale(50),
              borderRadius: scale(15)
            }}
          />
        <View>
          <Text style={{
            color: 'white',
            fontSize: scale(14)
          }}>{spotModels.spot?.name}</Text>
          <Text style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: scale(12)
        }}>Створено: {create}</Text>
          <Text style={{
          color: Colors.price,
          fontSize: scale(12)
        }}>Підсумок: {price}</Text>
          <Text style={[{
          color: 'white',
          fontSize: scale(12)
        },
        orderStatus === 'Не прийняте(' && {color: Colors.mDark},
        orderStatus !== 'Завершено' && {color: Colors.success}
        ]}>{orderStatus}</Text>
        
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default UserCardTransactionItem