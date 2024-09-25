import { FC, useState } from 'react'
import { ActivityIndicator, Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { scale } from 'react-native-size-matters';
import { formatPrice } from '@/services/formatPrice';
import { useCart } from '@/context';
import { Colors } from '@/constants';
import { Octicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import { TLikedMenu } from './useMyLoverDishes';

interface IProps{
  CARD_WIDTH: number
  item: TLikedMenu
  spotId: number
}

const MyLoverListItemDish: FC<IProps> = ({CARD_WIDTH, item, spotId}) => {
 
  function getWeightValue(weights: {
    weightId: number | null,
    value: number | null
  }[]) {
    const item = weights.find(weight => weight.weightId === 1);
    return item ? item.value : null; // Возвращает значение или null, если элемент не найден
}

  

  return (
    <Link
			href={{
				pathname: '/(app)/place/dish/[dishId]',
				params: { placeId: spotId, dishId: item.id, catId: item.categoryId }
			}}
			key={item.id}
			asChild
		>
    <TouchableOpacity

						style={{
							width: CARD_WIDTH,
							overflow: 'hidden',
							marginHorizontal: scale(5),
						}}
					>
							<Image
								source={item.image? { uri: item.image} : require('@/assets/images/main/empty_dish.png')}
								resizeMode='cover'
								style={{ height: CARD_WIDTH , width: CARD_WIDTH, borderRadius: scale(10)}}
							/>
              	{item.priceAtDiscount === 0 && (
							<Text
								style={{
									fontSize: scale(14),
									fontWeight: '600',
									color: 'white',
									marginTop: scale(5)
								}}
							>
								{formatPrice(item.price)}
							</Text>
						)}
						{item.priceAtDiscount > 0 && (
							<View
								style={{ flexDirection: 'row', gap: scale(10), alignItems: 'flex-end',marginTop: scale(5) }}
							>

									<Text
										style={{
											fontSize: scale(14),
											fontWeight: 'bold',
											color: 'white'
										}}
									>
										{formatPrice(item.priceAtDiscount)}
									</Text>

								<Text
									style={{
										fontSize: scale(10),
										color: 'rgb(120,120,120)',
										textDecorationLine: 'line-through'
									}}
								>
									{formatPrice(item.price)}
								</Text>
							</View>
						)}





              <Text style={{
                fontSize: scale(11),
                color:'white',
								marginTop: scale(5)
              }}>
                {item.name}
              </Text>

              <View style={{
                flexDirection: 'row'
              }}>
 
                    <Text style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: scale(10)
                    }}>
                      {item.weights && item.weights.length > 0 && (
                        `${getWeightValue(item.weights)}г`
                      )}
                    </Text>

                {(item.calories && item.calories.calories !== 0) ? 
                <Text style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: scale(10)
                }}> · {item.calories.calories}ккал</Text> : null}
                
              </View>
             
            
					</TouchableOpacity>
        </Link>
  )
}

export default MyLoverListItemDish