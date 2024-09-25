import { Colors } from '@/constants';
import { FC, useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters';
import CircularProgress from 'react-native-circular-progress-indicator';
import { formatPrice } from '@/services/formatPrice';
import { Octicons } from '@expo/vector-icons';
import {TOrderResponse} from '@/services'
import { Link } from 'expo-router';

interface IProps {
  order: TOrderResponse
}

const OrderItem: FC<IProps> = ({order}) => {
  const [orderStatus, setOrderStatus] = useState('Перевіряю статус')
  useEffect(()=>{
    if(order.status && order.status === 'NEW'){
      setOrderStatus('Оформлено')
    }else if(order.status === 'APPLY'){
      setOrderStatus('Підтвердженно')
    }else if(order.status === 'PROCESS'){
      setOrderStatus('Ура! Готується')
    }else if(order.status === 'READY'){
      setOrderStatus('Ти реді? Готово!')
    }else if(order.status === 'DENY'){
      setOrderStatus('Не прийняте(')
    }
  },[order.status])
  
  const calculateTimeLeft = () => {
    const difference =  Math.floor(order.desiredTime / 1000) - Math.floor(Date.now() / 1000);

    let timeLeft = 0;
    const minutes = Math.ceil(difference / 60)

    timeLeft = minutes;
    if (difference > 0) {
      return timeLeft;
    } else {
        return 0
    }
  }
  const maxTime = Math.ceil(((order.desiredTime /1000) - (order.createdAt /1000)) /60)
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  const timer = setInterval(() => {
    // console.log('timer', timeLeft);
    
    setTimeLeft(calculateTimeLeft());
}, 5000);
  if(timeLeft === 0) {
      clearInterval(timer);
  }


  return (
    <Link
      href={{
        pathname: '/(app)/order/[orderId]',
        params: { orderId: order.orderId }
      }}
      key={order.orderId}
      asChild
    >
      <Pressable
      android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
      style={{
        width: '100%',
        backgroundColor: Colors.darky,
        padding: scale(15),
        borderRadius: scale(5),
        gap: scale(15),
        flexDirection: 'row'
      }}>
          <View style={{
            width: scale(70),
            height: scale(70),
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: Colors.mDark15
          }}>
          {order.status !== 'READY' ? (
              <CircularProgress
              value={timeLeft}
              title={timeLeft === 0 ? ':(' : 'хв'}
              maxValue={maxTime}
              titleFontSize={scale(13)}
              titleColor='rgba(255,255,255,0.5)'
              progressValueColor='white'
              progressValueStyle={{ color: Colors.mDark }}
              radius={40}
              inActiveStrokeColor={Colors.mDark15}
              activeStrokeWidth={10}
              activeStrokeColor={Colors.mDark}
              activeStrokeSecondaryColor={'#5B000A'}
              inActiveStrokeWidth={7}
            />
            ):  <View style={{
              flex: 1,
              width: '100%',
              backgroundColor: Colors.success15,
              borderRadius: scale(50),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Octicons name="check-circle" size={36} color={Colors.success} />
            </View>

            }
          </View>
          <View style={{
            justifyContent: 'center'
          }} >
          <Text style={{
            color:"white",
            fontSize: scale(16),
            fontWeight: 'bold'
          }}>{`Замовлення №${order.orderId}`}</Text>
          <Text style={{
            color:"white",
            fontSize: scale(14),
          }}>{orderStatus}</Text>
          <View style={{
            flexDirection: 'row',
            gap:scale(5),
            alignItems: 'center'
          }}>
            <Text style={{
              color:'white',
              fontSize: scale(14)
            }}>{
              order.spotName.length > 12 ? order.spotName.substring(0,12) + '...' : order.spotName
            }</Text>
            <Octicons name="dot-fill" size={14} color="white" />
            <Text style={{
              color:Colors.price,
              fontSize:scale(14)
            }}>{formatPrice(order.total)}</Text>
          </View>
          </View>
      </Pressable>
    </Link>
  )
}

export default OrderItem