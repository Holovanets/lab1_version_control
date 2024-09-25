import { FC, useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import getDeliveryTimes from './pickUpTime'
import currentWorkTime from '@/services/currentWorkTime'
import { ScreenSpotItem } from './useAcceptCartScreen'
import { Colors } from '@/constants'
import { Octicons } from '@expo/vector-icons'
import { Separator } from '@/atoms'


interface IProps{
  spot: ScreenSpotItem
  selectedTime: string
  setSelectedTime: (time: string) => void
  defaultTime: string
}

const PickUpTimesBlock: FC<IProps> = ({spot, selectedTime, setSelectedTime, defaultTime}) => {
  
  const [deliveryTimes, setDeliveryTimes] = useState<string[]>([]);
  

  const time = () =>{
    if(spot?.worktime){
      const dayType = currentWorkTime(spot?.worktime)
      const workTimeToday = spot?.worktime.find((day) => day.type === dayType);
      return workTimeToday
    }
  }


  const times = () =>{
    const timeData = time();
    return timeData?.end && timeData?.start 
      ? getDeliveryTimes(timeData.start, timeData.end).map(t => t + ' ')
      : ['...', '...'];
  }

  useEffect(()=>{
    const ueban = times()
    ueban.unshift(defaultTime)
    
    setDeliveryTimes(()=>ueban)

  },[])

  return (
    <View style={{
      flexDirection: 'column',
      gap: scale(10),
    }}>
                <View style={{
                  flexDirection: 'row',
                  gap: scale(5),
                  alignItems: 'center'
                }}>
                  
                  <View style={{
                    height: scale(40),
                    width: scale(40),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: scale(10),
                    backgroundColor: Colors.mDark15
                  }}>
                    <Octicons name="clock" size={18} color="white" />
                  </View>

                  <View style={{
                    height: scale(40),
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: scale(15),
                    borderRadius: scale(10),
                    backgroundColor: Colors.mDark
                  }}>
                    <Text style={{
                      color: 'white',
                      fontSize: scale(14)
                    }}>Сьогодні</Text>
                  </View>
                </View>
                <View style={{
                  flexDirection: 'row',
                  gap: scale(5),
                  alignItems: 'center'
                }}>
                
                <FlatList
                  horizontal
                  data={deliveryTimes}
                  keyExtractor={item => item}
                  ItemSeparatorComponent={()=><Separator width={scale(10)}/>}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[{
                        paddingHorizontal: scale(15),
                        backgroundColor: Colors.mDark15,
                        borderRadius: scale(10),
                        height: scale(40),
                        justifyContent: 'center',
                        alignItems: 'center'
                      }, item === selectedTime ? {backgroundColor: Colors.mDark} : null]}
                      onPress={() => setSelectedTime(item)}
                    >
                      <Text style={{
                        fontSize: scale(16),
                        color: 'white'
                      }}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />


                </View>
    </View>
  )
}

export default PickUpTimesBlock