import { Colors } from '@/constants'
import { SpotItem } from '@/services/useFeed'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { FC } from 'react'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'


interface IProps {
	item: SpotItem
}

const ReviewsBlock: FC<IProps> = ({ item }) => {
	
	const countReviewers = item.stars ? (item.stars.star1 + item.stars.star2
	+ item.stars.star3 + item.stars.star4 + item.stars.star5) : 0
	return (
		<View
			style={{
				backgroundColor: Colors.darky,
				padding: scale(3),
				paddingRight: scale(10),
				borderRadius: scale(50),
				flexDirection: 'row',
				position: 'absolute',
				left: scale(65),
				top: scale(27),
				gap: scale(5)
			}}
		>
			<View
				style={{
					padding: scale(2),
					backgroundColor: '#181818',
					borderRadius: scale(50),
					width: scale(16),
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				{item.stars && countReviewers ? (
					<AntDesign name='star' size={scale(12)} color={Colors.price} />
				) : (
					<AntDesign name='heart' size={scale(11)} color={Colors.success} />
				)}
			</View>
			<Text style={{ color: 'white', fontSize: scale(12), fontWeight: 'bold' }}>
				{item.stars && countReviewers ? item.stars.total/100 : null}
			</Text>
			<Text style={{ color: 'white', fontSize: scale(12) }}>{item.stars && countReviewers? `(${countReviewers})` : 'Новий заклад'}</Text>
		</View>
	)
}

export default ReviewsBlock
