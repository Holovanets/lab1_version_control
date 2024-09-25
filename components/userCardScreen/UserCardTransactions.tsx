import { Colors } from '@/constants'
import { convertTimeFromUnix, formatPrice, useCheckIsOrdersExist } from '@/services/index'
import { Feather } from '@expo/vector-icons'
import { FC } from 'react'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import UserCardTransactionItem from './UserCardTransactionItem'
import { Link } from 'expo-router'

const UserCardTransactions: FC = () => {
  const requireStatuses = ['NEW', 'APPLY', 'PROCESS', 'READY', 'DENY', 'ARCHIVED']
  const orders = useCheckIsOrdersExist(requireStatuses)

  if(!orders){
    <View style={{
      padding: scale(15),
      width: '100%', 
      flexDirection: 'row',
      gap: scale(15),
      alignItems:'center',
      backgroundColor: Colors.mDark15,
      borderRadius: scale(15)
    }}>
      <Feather name="x-circle" size={24} color="white" />
      <Text style={{fontSize: scale(12), color:'white'}}>Ще не було заказів</Text>
    </View>
  }else{
  return (
    <View style={{
      gap: scale(5),
      borderRadius: scale(15),
      overflow: 'hidden',
    }}>
      {[...orders].reverse().map(order =>(
          <UserCardTransactionItem orderId={order.orderId} spotId={order.spotId} key={order.orderId} status={order.status} create={convertTimeFromUnix(order.createdAt)} price={formatPrice(order.total)}/>
      ))}
    </View>
  )}
}

export default UserCardTransactions