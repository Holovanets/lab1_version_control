import { FC, useState } from 'react'
import { ActivityIndicator, Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { scale } from 'react-native-size-matters';
import { DishItem } from './useLoverDishes';
import { formatPrice } from '@/services/formatPrice';
import { useCart } from '@/context';
import { Colors } from '@/constants';
import { Octicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';

interface IProps{
  CARD_WIDTH: number
  item: DishItem
  spotId: number
  spotName: string
}

const LoverDishItem: FC<IProps> = ({CARD_WIDTH, item, spotId, spotName}) => {
  const { addToCart } = useCart();
  const toast = useToast()
  const [isCartLoading, setIsLoading] = useState(false)
  function getWeightValue(weights: {
    weightId: number | null,
    value: number | null
  }[]) {
    const item = weights.find(weight => weight.weightId === 1);
    return item ? item.value : null; // Возвращает значение или null, если элемент не найден
}

  
function handleAddToCart(dishId: number) {
  setIsLoading(true);

  // Проверяем наличие групп добавок и ищем обязательные группы
  const mandatoryGroups = item.groups?.filter(group => group.min > 0) || [];

  if (mandatoryGroups.length > 0) {
    // Если найдены обязательные группы, требующие выбора, уведомляем пользователя
    alert("Котику, вкажи додатки для страви в групі: " + mandatoryGroups.map(group => group.name).join(", "));
    setIsLoading(false);
    return; // Прерываем дальнейшее добавление в корзину
  }

  // Если все условия выполнены или нет групп добавок, добавляем товар в корзину
  const dishItem = {
    id: dishId,
    amount: 1,
    groups: [] // Предполагаем, что группы добавок или их выбор не требуется
  };
  addToCart(dishItem, spotId, spotName); // Убедитесь, что spotId и spotName доступны в контексте

  setTimeout(() => {
    setIsLoading(false);
  }, 200);
}


  return (
    <Link
			href={{
				pathname: '/(app)/place/dish/[dishId]',
				params: { placeId: spotId, dishId: item.id, catId: item.categoryId, spotName: spotName }
			}}
			key={item.id}
			asChild
		>
    <TouchableOpacity

						style={{
							width: CARD_WIDTH,
							borderRadius: scale(20),
							backgroundColor: '#151515',
							overflow: 'hidden',
							marginHorizontal: scale(5),
              padding: scale(10),
              gap:scale(5),      
              justifyContent: 'space-between',        
						}}
					>
							<Image
								source={item.image? { uri: item.image} : require('@/assets/images/main/empty_dish.png')}
								resizeMode='cover'
								style={{ height: CARD_WIDTH - scale(20), width: CARD_WIDTH - scale(20), borderRadius: scale(15)}}
							/>
              	{item.priceAtDiscount === 0 && (
							<Text
								style={{
									fontSize: scale(14),
									fontWeight: 'bold',
									color: 'white'
								}}
							>
								{formatPrice(item.price)}
							</Text>
						)}
						{item.priceAtDiscount > 0 && (
							<View
								style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-end' }}
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
                fontSize: scale(12),
                color:'white'
              }}>
                {item.name}
              </Text>

              <View style={{
                flexDirection: 'row'
              }}>
 
                    <Text style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: scale(12)
                    }}>
                      {item.weights && item.weights.length > 0 && (
                        `${getWeightValue(item.weights)}г`
                      )}
                    </Text>

                {(item.calories && item.calories.calories !== 0) ? 
                <Text style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: scale(12)
                }}> · {item.calories.calories}ккал</Text> : null}
                
              </View>
              {isCartLoading ? (
                <View style={{
                  borderRadius: scale(15),
                padding: scale(7),
                flexDirection: 'row',
                backgroundColor: Colors.mDark,
                gap: scale(5),
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: scale(10),
                }}>
                  <ActivityIndicator size={scale(20)} color='white'/>
                </View>
              ) :(
                <Pressable
              onPress={()=>handleAddToCart(item.id)}
              android_ripple={{ color: 'rgba(255,120,120,0.5)' }}
              style={{
                borderRadius: scale(15),
                padding: scale(7),
                flexDirection: 'row',
                backgroundColor: Colors.mDark,
                gap: scale(5),
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: scale(10),
              }}>

                  <Octicons name='plus' color='white' size={24}></Octicons>
                  <Text style={{
                    color: 'white',
                    fontSize: scale(14)
                  }}>Додати</Text>
                
              </Pressable>
              )}
              
            
					</TouchableOpacity>
        </Link>
  )
}

export default LoverDishItem