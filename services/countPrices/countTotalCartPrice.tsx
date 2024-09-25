import { useCart } from '@/context'
import { FC, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { getItemInfo } from './getItemInfo'

const countTotalCartPrice = async () => {
  const {cart} = useCart()
  const [totalCost, setTotalCost] = useState(0)
  const {itemModels, itemOperations} = getItemInfo()
  useEffect(() => {
    const calculateTotalCost = async () => {
      let cost = 0;
      for (const item of cart.cartItems) {
        const dish = await itemOperations.getItemReturn(cart.spotId, item.id);
        cost += (dish?.price ?? 0) * item.amount;
      }
      setTotalCost(cost);
    };
  
    calculateTotalCost();
  }, [cart]);
  return totalCost
}

export default countTotalCartPrice