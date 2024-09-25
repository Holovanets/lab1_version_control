import { Colors } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import { FC, useEffect, useState } from 'react'
import { Text, View, Image, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { PlaceDishResponse, usePlaceMenu } from './usePlaceMenu'
import { scale } from 'react-native-size-matters'
import { Link, router } from 'expo-router'
import { useAuth, useCart } from '@/context'
import { useToast } from 'react-native-toast-notifications'
import { HeartLike } from '@/atoms'

interface IProps {
	catId: number
	placeId: number
	dish: {
		spotId: number
		id: number
		price: number,
		priceAtDiscount: number,
		tags: {
			spotId: number
			id: number
			text: string
			color: string
		}[] | []
		// name: {
		// 	locale: 'uk' | 'en'
		// 	value: string
		// }[]
		name: string
		calories:{
			calories: number
			proteins: number
			fats: number
			carbohydrates: number
		} | {}
		description: string | null
		weight: number | null
		image: string | null
		position: number
		visible: boolean
		liked: number
		delivery: []
	}
	spotName: string
}

const PlaceDish: FC<IProps> = ({placeId, catId,dish,spotName }) => {

	const { countItemInCart, removeAllInstancesFromCart } = useCart();
	const {models, operations} = usePlaceMenu(placeId)
	const toast = useToast();
	const fishDescriptions = [
		"Опис страви вкрали інопланетяни",
		"Опис цієї страви з'їв QR-кіт 😸, така вона смачна",
		"Хтось бачив опис до цієї страви?",
		"Руки опускаються... Де ж опис до страви?",
		"Опису не буде.",
		"Страва є, фоточка є, ціна є. Але я точно щось забув..."
	]
	const [isLiked, setIsLiked] = useState<boolean | undefined>(false)
	const [likes, setLikes] = useState<number | undefined>(0)
	useEffect(()=>{
		(async ()=>{
			try{
				const result = await operations.getDishLikes(dish.id)
				setLikes(result?.response)
				// console.log(result?.response);
			}catch(err){
				console.error('Cant get likes', err)
			}
		})()
	},[isLiked])
	useEffect(()=>{
		(async ()=>{
			try{
				const result = await operations.getDishIsLiked(dish.id)
				setIsLiked(result?.response)
				// console.log(result);
			}catch(err){
				console.error('Cant get likes', err)
			}
		})()
	},[isLiked])
	const toggleLike = ()=>{
		if(isLiked){
			(async ()=>{
				try{
					const result = await operations.deleteLikeDish(dish.id)
					if(result === 200){
						setIsLiked(false)
					}
				}catch(err){
					console.error('Cant dislike', err)
				}
			})()
		}else{
			(async ()=>{
				try{
					const result = await operations.putLikeDish(dish.id)
					if(result === 200){
						setIsLiked(true)
					}
				}catch(err){
					console.error('Cant like', err)
				}
			})()
		}
	}


	const [isInCart, setIsInCart] = useState(true)
	const formatPrice = (coins: number) => {
		const hryvnia = coins / 100
		const formattedPrice = hryvnia.toFixed(2)
		return formattedPrice.replace('.', ',') + ' ₴'
	}

	const tagBlock = () =>{
		const hexToRgb = (hex: string) =>{
			hex = hex.replace('#','')
			const r = parseInt(hex.substring(0,2),16)
			const g = parseInt(hex.substring(2,4),16)
			const b = parseInt(hex.substring(4,6),16)
			return `rgba(${r}, ${g}, ${b}, 0.5)`
		}
		return(
			<View style={{flexDirection: 'column', position: 'absolute', gap:scale(5), left: scale(10), top: scale(10), zIndex: 5}}>
				{dish.tags.map(tag=>(
					<View key={tag.id} style={{paddingHorizontal: scale(12), alignItems: 'center', paddingVertical: scale(5), backgroundColor:hexToRgb(tag.color), borderRadius: scale(5)}}>
						<Text style={{fontSize: scale(10), textAlign: 'center'}}>{`${tag.text.split(' ')[0]}`}</Text>
						{/* <Text style={{fontSize: scale(12)}}>{`${tag.text[0]}`}</Text> */}
					</View>
				))}
			</View>
		)
	}
	return (
		<View
			style={{
				width: '100%',
				overflow: 'hidden',
				gap: scale(5),
				borderRadius: scale(15)
			}}
		>
			<TouchableOpacity
			onPress={()=>router.push({pathname: '/(app)/place/dish/[dishId]', params: {placeId: placeId, catId: catId, dishId:dish.id, spotName: spotName}})}
				style={{
					height: 130,
					width: '100%',
					borderRadius: 5,
					overflow: 'hidden',
					backgroundColor: '#101010',
					padding: 10,
					flexDirection: 'row',
					gap: 5
				}}
			>
				{dish.tags && tagBlock()}
				
				<View
					style={{
						width: 110,
						height: 110,
						borderRadius: 100,
						overflow: 'hidden',
						backgroundColor: '#101010',
						justifyContent: 'center',
						alignItems: 'center'
					}}
					>
					{dish.image ? (
						<Image
						source={{ uri: dish.image }}
						style={{ width: 95, height: 95, borderRadius: 100 }}
						resizeMode='cover'
					/>
					):(
						<Image
						source={require('@/assets/images/main/empty_dish.png')}
						style={{ width: 95, height: 95, borderRadius: 100 }}
						resizeMode='cover'
					/>
					)}
				</View>
				<View
					style={{
						height: 130,
						width: 90,
						position: 'absolute',
						left: 0,
						backgroundColor: '#151515',
						zIndex: -1
					}}
				/>
				<View
					style={{
						gap: 0
					}}
				>
					<Text
						style={{
							fontSize: scale(14),
							fontWeight: 'bold',
							color: 'white',
							maxWidth: 215
						}}
					>
						{dish.name ? dish.name.length > 25
							? dish.name.substring(0, 25-3) + '...'
							: dish.name : '...'}
					</Text>
					{dish.description ? (
						<Text
						style={{
							fontSize: scale(12),
							color: 'rgba(255,255,255,0.5)',
							maxWidth: scale(210)
						}}
					>
						{dish.description.length > 45
							? dish.description.substring(0, 45 - 3) + '...'
							: dish.description}
					</Text>
					):(
						<Text
						style={{
							fontSize: scale(12),
							color: 'rgba(255,255,255,0.5)',
							maxWidth: 210
						}}
					>
						{fishDescriptions[Math.floor(Math.random() * fishDescriptions.length)]}
					</Text>
					)}
					<View
						style={{
							position: 'absolute',
							bottom: 0,

							width: 210
						}}
					>
						{dish.priceAtDiscount === 0 && (
							<Text
								style={{
									fontSize: scale(14),
									fontWeight: 'bold',
									color: Colors.price
								}}
							>
								{formatPrice(dish.price)}
							</Text>
						)}
						{dish.priceAtDiscount > 0 && (
							<View
								style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
							>
								<View
									style={{
										backgroundColor: Colors.price,
										paddingVertical: 3,
										paddingHorizontal: 8,
										borderRadius: 50
									}}
								>
									<Text
										style={{
											fontSize: scale(14),
											fontWeight: 'bold',
											// color: Colors.price
											color: Colors.darky
										}}
									>
										{formatPrice(dish.priceAtDiscount)}
									</Text>
								</View>
								<Text
									style={{
										fontSize: scale(14),
										fontWeight: 'bold',
										color: 'rgb(120,120,120)',
										textDecorationLine: 'line-through'
									}}
								>
									{formatPrice(dish.price)}
								</Text>
							</View>
						)}
					</View>
					
				</View>
			</TouchableOpacity>
			{/* </Link> */}
			{countItemInCart(dish.id, placeId) !== 0 ? (
				<Pressable
					android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
					onPress={()=>{
						removeAllInstancesFromCart(dish.id,placeId)
						toast.show('Видалено!',{
							type: 'success',
							placement: 'top',
							duration: 1500
						})
					}}
					style={{
						backgroundColor: '#101010',
						flexDirection: 'row',
						borderRadius: 5,
						gap: 10,
						paddingHorizontal: 15,
						paddingVertical: 10
					}}
				>
					<Ionicons name='trash-outline' size={24} color={Colors.mDark} />
					<Text style={{ color: 'white', fontSize: 14 }}>
						{countItemInCart(dish.id, placeId)} Додано
					</Text>
				</Pressable>
			) : (
				<></>
			)}
			<Pressable
				android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
				onPress={() => {
					toggleLike()
				}}
				style={{
					backgroundColor: '#101010',
					flexDirection: 'row',
					borderRadius: 5,
					gap: 10,
					paddingHorizontal: 15,
					paddingVertical: 10,
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
			>
				<Text style={{ color: 'white', fontSize: 14 }}>
						{isLiked? 'Додано в Їжлист' : 'Додати в Їжлист'}
				</Text>
				<HeartLike isActive={isLiked || false} likes={likes || 0}/>
			</Pressable>
		</View>
	)
}

export default PlaceDish
