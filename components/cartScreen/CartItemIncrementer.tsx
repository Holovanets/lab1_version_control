import { Ticker } from '@/atoms'
import { Colors } from '@/constants'
import { useCart } from '@/context'
import { Feather, Octicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

interface IProps{
  dishId: number,
  placeId: number
  groups: {
    id: number
    selectedAdditives: number[]
}[]
}

const CartItemIncrementer: FC<IProps> = ({dishId, placeId, groups}) => {
  const {countItemWithAdditivesInCart, increaseItemQuantity,decreaseItemQuantity} = useCart()
  return (
    <View style={{
      flexDirection: 'row',
      gap: scale(15),
      alignItems: 'center',
      backgroundColor: Colors.mDark15,
      borderRadius: scale(10),
      overflow: 'hidden'
  }}>
    <Pressable
    android_ripple={{ color: 'rgba(193,39,45,0.6)' }}
    onPress={()=>decreaseItemQuantity(dishId, placeId, groups)}
    style={{
      width: scale(30),
      height: scale(30),
      borderRadius: scale(10),
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Feather name="minus" size={20} color="white" />
    </Pressable>
    <Ticker number={countItemWithAdditivesInCart(dishId, placeId, groups)} textSize={scale(12)} />
    <Pressable
    android_ripple={{ color: 'rgba(193,39,45,0.6)' }}
    onPress={()=>increaseItemQuantity(dishId, placeId, groups)}
    style={{
      width: scale(30),
      height: scale(30),
      borderRadius: scale(10),
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Feather name="plus" size={20} color="white" />
    </Pressable>

  </View>
  )
}

export default CartItemIncrementer