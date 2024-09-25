import { Colors } from '@/constants'
import { useCheckIsOrdersExist } from '@/services/index'
import { FC, useEffect } from 'react'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import OrderItem from './OrderItem'

const OrderBlock: FC = () => {
  const requireStatuses = ['NEW', 'APPLY', 'PROCESS', 'READY']
  const orders = useCheckIsOrdersExist(requireStatuses)

 
  // useEffect(() => {
  //   console.log(orders);
  // }, [orders])

  if (!orders ) {
    return null
  }

  return (

    orders.map(order =>(
      <OrderItem key={order.orderId} order={order}/>
    ))

  )

}

export default OrderBlock 