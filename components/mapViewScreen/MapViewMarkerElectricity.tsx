import { Colors } from '@/constants'
import { Ionicons, Octicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

interface IProps {
  electricity: {
    spotId: number,
    status: number | undefined,
    share: number | undefined,
  }| null
}

const MapViewMarkerElectricity: FC<IProps> = ({electricity}) => {
  

  if(!electricity){
   return(
    <View style={{
      marginTop: scale(15),
      paddingHorizontal: scale(15),
      gap: scale(10),
      width: '100%',
    }}>
      <View style={{
        // width: '100%',
        alignItems: 'center',
        padding: scale(15),
        backgroundColor: '#151515',
        borderRadius: scale(15),
        flexDirection: 'row',
        gap: scale(15)
      }}>
        <Octicons name="alert" size={24} color={Colors.warning} />
        <Text style={{
          fontSize: scale(12),
          color: 'white',
          width: scale(250)
        }}>
          На жаль, заклад не вказав, як у них з відключеннями світла та чи шейрять вони його гостям.
        </Text>
      </View>

    </View>
   )
  }


  else{
    return (
      <View style={{
        marginTop: scale(15),
        // paddingHorizontal: scale(15),
        borderRadius: scale(15),
        overflow: 'hidden',
        gap: scale(2),
        width: '100%',
      }}>
        <View style={[{
          // width: '100%',
          alignItems: 'center',
          padding: scale(15),
          backgroundColor: '#151515',
          borderBottomLeftRadius: scale(5),
          borderBottomRightRadius: scale(5),
          flexDirection: 'row',
          gap: scale(15)
        },
          electricity.status === 0 && {backgroundColor: Colors.mDark},
          electricity.status === 1 && {backgroundColor: Colors.success},
          electricity.status === 2 && {backgroundColor: Colors.warning},
          electricity.status === 3 && {backgroundColor: Colors.warning},
        ]}>
          {electricity.status === 0 && <Ionicons name="flash-off" size={24} color='white' />}
          {electricity.status === 1 && <Ionicons name="flash" size={24} color='white' />}
          {electricity.status === 2 && <Ionicons name="flashlight-outline" size={24} color='white' />}
          {electricity.status === 3 && <Ionicons name="hand-left-outline" size={24} color='white' />}
          <Text style={{
            fontSize: scale(12),
            color: 'white',
            width: scale(250)
          }}>
            {electricity.status === 0 && 'Не працюємо при відключеннях світла.'}
            {electricity.status === 1 && 'Працюємо при відключеннях, приймаємо замовлення. Повністю автономні.'}
            {electricity.status === 2 && 'Працюємо без світла, але приймаємо замовлення. Працюємо тільки з готівкою. Кухня не працює'}
            {electricity.status === 3 && 'Працюємо при відключеннях, але не приймаємо більшість замовлень.'}
          </Text>
        </View>
        <View style={[{
          // width: '100%',
          alignItems: 'center',
          padding: scale(15),
          backgroundColor: '#151515',
          borderTopLeftRadius: scale(5),
          borderTopRightRadius: scale(5),
          flexDirection: 'row',
          gap: scale(15)
        }, 
          electricity.share === 0 && {backgroundColor: Colors.mDark},
          electricity.share === 1 && {backgroundColor: Colors.success},
          electricity.share === 2 && {backgroundColor: Colors.warning},
          electricity.share === 3 && {backgroundColor: Colors.warning},
        ]}>
          {electricity.share === 0 && <Ionicons name="ban-outline" size={24} color='white' />}
          {electricity.share === 1 && <Ionicons name="battery-charging-outline" size={24} color='white' />}
          {electricity.share === 2 && <Ionicons name="laptop-outline" size={24} color='white' />}
          {electricity.share === 3 && <Ionicons name="leaf-outline" size={24} color='white' />}
          <Text style={{
            fontSize: scale(12),
            color: 'white',
            width: scale(250)
          }}>
            {electricity.share === 0 && 'Не шейримо зарядки та розетки взагалі.'}
            {electricity.share === 1 && 'Ділимось вільними розетками та навіть зарядками з гостями. Приходьте щоб зарядитись або попрацювати.'}
            {electricity.share === 2 && 'Ділимось вільними розетками, якщо такі є. Просимо не працювати на ноутбуках.'}
            {electricity.share === 3 && 'Ділимось вільними розетками, якщо такі є - використовуйте в повній мірі.'}
           
          </Text>
        </View>
      </View>
    )
  }
}

export default MapViewMarkerElectricity