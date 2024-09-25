import { Colors, SCREEN_WIDTH } from '@/constants'
import { FC, useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Octicons } from '@expo/vector-icons'
import { Normalize } from '@/atoms'
import { scale } from 'react-native-size-matters'
import { useNearestSpots } from './useNearestSpots'
import { formatPrice } from '@/services/formatPrice'

interface IProps{
	placeId: number
}

const TopPositionsBlock: FC<IProps> = ({placeId}) => {
	const [isLiked, setIsLiked] = useState(false)
	const {models, operations} = useNearestSpots()
	useEffect(() => {
		// setRestos(restourants)
		operations.getTopLiked(placeId)
	}, [])

	if(!models.topLiked || models.topLiked.length === 0){
		return(
<>
<View
			style={{
				justifyContent: 'space-between',
				paddingHorizontal: scale(15),
				paddingVertical: scale(15),
				borderBottomColor: Colors.darky,
				borderBottomWidth: 1,
				flexDirection: 'row'
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					gap: scale(10)
				}}
			>
				<Image
						source={require('@/assets/images/main/empty_dish.png')}
						style={{ width: scale(40), height: scale(40), borderRadius: scale(10)}}
						resizeMode='cover'
					/>
					<Text
							style={{
								color: 'white',
								fontWeight: 'bold',
								width: scale(SCREEN_WIDTH - (SCREEN_WIDTH - 140)),
								fontSize: scale(12)
							}}
						>
							Заклад не заповнив меню
						</Text>
			</View>
		</View>
		<View
			style={{
				justifyContent: 'space-between',
				paddingHorizontal: scale(15),
				paddingVertical: scale(15),
				borderBottomColor: Colors.darky,
				borderBottomWidth: 1,
				flexDirection: 'row'
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					gap: scale(10)
				}}
			>
				<Image
						source={require('@/assets/images/main/empty_dish.png')}
						style={{ width: scale(40), height: scale(40), borderRadius: scale(10)}}
						resizeMode='cover'
					/>
					<Text
							style={{
								color: 'white',
								fontWeight: 'bold',
								width: scale(SCREEN_WIDTH - (SCREEN_WIDTH - 140)),
								fontSize: scale(12)
							}}
						>
							Заклад не заповнив меню
						</Text>
			</View>
		</View>
</>
		)
	}

	return (
		<>
			{models.topLiked.map((item, index) => (
				<View
					key={item.id}
					style={{
						// height: scale(90),
						justifyContent: 'space-between',
						paddingHorizontal: scale(15),
						paddingVertical: scale(15),
						borderBottomColor: '#151515',
						backgroundColor: Colors.darky,
						borderBottomWidth: 1,
						flexDirection: 'row'
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							gap: scale(10)
						}}
					>
					{item.image ? (
						<Image
						source={{ uri: item.image }}
						style={{ width: scale(40), height: scale(40), borderRadius: scale(10) }}
						resizeMode='cover'
					/>
					):(
						<Image
						source={require('@/assets/images/main/empty_dish.png')}
						style={{ width: scale(40), height: scale(40), borderRadius: scale(10)}}
						resizeMode='cover'
					/>
					)}
						<Text
							style={{
								color: 'white',
								fontWeight: 'bold',
								width: scale(SCREEN_WIDTH - (SCREEN_WIDTH - 140)),
								fontSize: scale(12)
							}}
						>
							{item.name}
						</Text>
					</View>
					<View
						style={{ flexDirection: 'row', gap: scale(5), alignItems: 'flex-end' }}
					>
						<Text
							style={{
								color: Colors.price,
								fontWeight: 'bold',
								fontSize: scale(16)
							}}
						>
							{formatPrice(item.price)}
						</Text>
					</View>
					
				</View>
			))}
		</>
	)
}

export default TopPositionsBlock
