import { Ticker } from '@/atoms'
import { Colors } from '@/constants'
import { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

interface IProps{
  number: string
  name: string
  surname: string
  cashBackValue: number
  avatar: string | null
}

const UserCardProfile: FC<IProps> = ({number, name, surname, cashBackValue, avatar}) => {

  
  function format(cardValue: string): string {
    const cleaned: string = cardValue.replace(/\D/g, '')
    const formatted = cleaned.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/,
        '$1 $2 $3 $4 $5'
    )
    return formatted
}

  return (
    <View style={{
      width: '100%',
      padding: scale(15),
      backgroundColor: Colors.mDark15,
      borderRadius: scale(15),
      flexDirection: 'row',
      gap: scale(10)
    }}>
    
    <View>
    {avatar ? (
						<Image
						source={{ uri: avatar }}
						style={{ width: scale(50), height: scale(50), borderRadius: scale(100)}}
						resizeMode='cover'
					/>
					):(
						<Image
						source={require('@/assets/images/main/empty_dish.png')}
						style={{ width: scale(50), height: scale(50),borderRadius: scale(100) }}
						resizeMode='cover'
					/>
					)}
    </View>
    <View style={{
      gap: scale(5),
      justifyContent: 'center'
    }}>
      <Text style={{fontSize: scale(16), color: 'white', fontWeight: 'bold'}}>{`${surname} ${name}`}</Text>
      <Text style={{ fontSize: scale(14), color: 'rgba(255,255,255, 0.7)' }}>
        {format(number)}
      </Text>

    </View>
    </View>
  )
}

export default UserCardProfile