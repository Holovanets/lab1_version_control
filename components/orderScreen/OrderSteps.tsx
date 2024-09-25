import { Colors } from '@/constants'
import { Octicons } from '@expo/vector-icons'
import { FC, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

interface IProps{
  status: string | undefined 
  orderCreate: string
}

const OrderSteps: FC<IProps> = ({status, orderCreate}) => {
  const steps = ['Створено', 'Прийнято', 'Готуємо', 'Готово!']
  const [currentStep, setCurrentStep] = useState(0)
  useEffect(()=>{
    if(status === 'NEW'){
      setCurrentStep(0)
    }else if(status === 'APPLY'){
      setCurrentStep(1)
    }else if(status === 'PROCESS'){
      setCurrentStep(2)
    }else if(status === 'READY'){
      setCurrentStep(3)
    }else if(status === 'DENY'){
      setCurrentStep(-1)
    }else if(status === 'ARCHIVED'){
      setCurrentStep(-2)
    }
    console.log(status);
    
  }, [status])

  if(currentStep === -1){
    return (
      <View style={{ 
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(15),
        backgroundColor: Colors.mDark,
        borderRadius:scale(20),
        padding: scale(15),
      }}>
        <Octicons name="x-circle" size={32} color="white" />
        <Text style={{
          color:'white',
          fontSize: scale(16),
          fontWeight: 'bold',
        }}>Замовлення не прийнято :(</Text>
      </View>
    )
  } else if(currentStep === -2){
    return (
      <View style={{ 
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(15),
        backgroundColor: Colors.success,
        borderRadius:scale(20),
        padding: scale(15),
      }}>
        <Octicons name="check-circle" size={32} color="white" />
        <View>
          <Text style={{
            color:'white',
            fontSize: scale(16),
            fontWeight: 'bold'
          }}>Виконано!</Text>
          <Text style={{
            color:'white',
            fontSize: scale(12),
            fontWeight: 'bold'
          }}>{orderCreate}</Text>
        </View>
      </View>
    )
  }else {
    return (
    <View style={{ 
      width: '100%',
      flexDirection: 'row',
      justifyContent:'space-between',
      gap: scale(5)
    }}>
      {steps.map((step, i) =>(
        <View key={i} style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap:scale(10),
          flex:1,
          // borderRadius: scale(5),
          // overflow: 'hidden'
        }}>
          <Text style={{
            color: 'white'
          }}>{step}</Text>
          <View style={[{
            backgroundColor: '#151515',
            width: '100%',
            height: scale(10),
            borderRadius: scale(5),
            justifyContent: 'center',
            alignItems: 'center'
          },
          currentStep === i && {
            backgroundColor: Colors.mDark
          },
          currentStep > i && {
            backgroundColor: Colors.mDark50
          }
          ]}>
          </View>
          
        </View>
      ))}
    </View>
  )}
}

export default OrderSteps