import { Colors } from '@/constants'
import { useCart } from '@/context'
import { countTotalCartPrice, formatPrice, getItemInfo } from '@/services'
import { Feather, Ionicons, Octicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { FC, useEffect, useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
interface IProps {
	placeId: number
	openConditionalsModal : ()=>void
}
const PlaceBottomTab: FC<IProps> = ({placeId,openConditionalsModal}) => {
	const [price, setPrice] = useState(0)
	const { cart, countItemInCart } = useCart(); // Получаем объект cart из контекста
	
	const {itemOperations, itemModels} = getItemInfo()
	const [isPriceLoading, setIsPriceLoading] = useState(true)

	useEffect(() => {
		const calculateTotalCost = async () => {
			let totalCost = 0;
			setIsPriceLoading(true);  // Предполагаем, что вы имеете такую функцию для управления UI
		
			try {
				for (const cartItem of cart.cartItems) {
					const dish = await itemOperations.getItemReturn(cart.spotId, cartItem.id);
					if (dish) {
						// Считаем стоимость основного блюда
						totalCost += (dish.price ?? 0) * cartItem.amount;
		
						// Считаем стоимость добавок
						for (const group of cartItem.groups) {
							for (const additiveId of group.selectedAdditives) {
								const dishGroup = dish.groups.find(g => g.id === group.id); // Найдем соответствующую группу в данных блюда
								if (dishGroup) {
									const additive = dishGroup.additives.find(a => a.id === additiveId); // Найдем добавку
									if (additive) {
										// Добавим стоимость добавки, умноженную на количество блюд
										totalCost += (additive.price ?? 0) * cartItem.amount;
									}
								}
							}
						}
					}
				}
				setPrice(totalCost);
			} catch (error) {
				console.error("Error calculating total cost", error);
			} finally {
				setIsPriceLoading(false);  // Обновим состояние загрузки
			}
		};
		calculateTotalCost()
  }, [cart]);
	const insets = useSafeAreaInsets();
	return (
		<View style={{
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: Colors.darky,
			paddingHorizontal: scale(10),
			paddingBottom: scale(10) + insets.bottom,
			paddingVertical: scale(10),
			borderTopLeftRadius: scale(20),
			borderTopRightRadius: scale(20),
			gap: scale(10)
		}}>
			<TouchableOpacity
			onPress={()=>{openConditionalsModal()}}
			style={{
				width: '100%',
				paddingVertical: scale(5),
				paddingHorizontal: scale(10),
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<View style={{
					alignItems: 'center',
					justifyContent: 'center'
				}}>
					<Text style={{
						color: Colors.mDark,
						fontSize: scale(12),
						fontWeight: '500'
					}}>
						Сервіс - безкоштовно
					</Text>
					<Text style={{
						color: 'rgba(255,255,255,0.5)',
						fontSize: scale(12)
					}}>
						Детально про умови
					</Text>
				</View>
				<View style={{
					position: 'absolute',
					right: scale(15)
				}}>
					<Octicons name="chevron-right" size={24} color="rgba(255,255,255,0.5)" />
				</View>
				<View style={{
					position: 'absolute',
					left: scale(15)
				}}>
					<Octicons name="code-of-conduct" size={24} color={Colors.mDark} />
				</View>
			</TouchableOpacity>
			{cart.cartItems.length > 0 && cart.spotId === placeId && (
					<View
					
				>
					<View
						style={{
							flexDirection: 'row',
							width: '100%',
							gap: scale(10),
							flex: 1
						}}
						>
						<Pressable
						onPress={()=>router.push('/cart')}
						style={{
							// flexBasis: '33.333333%',
								paddingVertical: scale(15),
								flex: 1,
								backgroundColor: Colors.mDark,
								borderRadius: scale(15),
								flexDirection: 'row',
								gap: scale(10),
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<Feather name='shopping-bag' size={scale(18)} color='white' />
							<Text style={{ color: 'white', fontWeight: 'bold', fontSize: scale(14) }}>
								{isPriceLoading ? '...' : formatPrice(price)}
							</Text>
						</Pressable>
					</View>
				</View>
			)}
		</View>
	)
}

export default PlaceBottomTab
