import { Colors } from '@/constants'
import { Octicons } from '@expo/vector-icons'
import { FC, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { scale } from 'react-native-size-matters'

interface IProps {
  status: string
  desiredTime: number
  createdAt: number
}

const OrderTimer: FC<IProps> = ({status, desiredTime, createdAt}) => {
  const [orderStatus, setOrderStatus] = useState('Перевіряю статус замовлення')
  useEffect(()=>{
    if(status === 'NEW'){
      setOrderStatus('Замовлення оформлено і очікує на підтвердження закладом')
    }else if(status === 'APPLY'){
      setOrderStatus('Заклад підтвердив замовлення і ось ось почне готувати твої ласунки')
    }else if(status === 'PROCESS'){
      setOrderStatus('Ура! Твоє замовлення вже готується')
    }else if(status === 'READY'){
      setOrderStatus('Ти реді? Тебе вже чекають на все готове!')
    }else if(status === 'DENY'){
      setOrderStatus('Опа... Замовлення не прийняте.')
    }
  },[status])

  const calculateTimeLeft = () => {
    const difference =  Math.floor(desiredTime / 1000) - Math.floor(Date.now() / 1000);

    let timeLeft = 0;
    const minutes = Math.ceil(difference / 60)

    timeLeft = minutes;
    if (difference > 0) {
      return timeLeft;
    } else {
        return 0
    }
  }
  const maxTime = Math.ceil(((desiredTime /1000) - (createdAt /1000)) /60)
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  const timer = setInterval(() => {
    // console.log('timer', timeLeft);
    
    setTimeLeft(calculateTimeLeft());
}, 5000);
  if(timeLeft === 0) {
      clearInterval(timer);
  }

  return (
    <>
      <View style={{
            width: scale(70),
            height: scale(70),
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: Colors.mDark15
          }}>
            {status !== 'READY' ? (
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
            justifyContent: 'center',
            gap: scale(5)
          }}>
            <Text style={{
              color: 'white',
              fontSize: scale(14),
              fontWeight: 'bold'
            }}>
              Самовивіз
            </Text>
            <Text style={{
              color: 'white',
              fontSize: scale(12),
              width: scale(200)
            }}>
              {orderStatus}
            </Text>
          </View>

    </>
  )
}

export default OrderTimer