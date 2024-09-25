import { Normalize } from '@/atoms'
import { Colors } from '@/constants'
import { AntDesign } from '@expo/vector-icons'
import { FC } from 'react'
import { Text, View, Image } from 'react-native'
import { scale } from 'react-native-size-matters'

interface IProps {
	logo: string | null | undefined
	title: string | null
	rating: number | null
	reviews: number
}

const PlaceLogo: FC<IProps> = ({ logo, title, rating, reviews }) => {
	
	return (
		<View
			style={{
				flexDirection: 'row',
				gap: scale(15),
				alignItems: 'center',
				marginHorizontal: scale(15)
			}}
		>
			<Image
				source={logo? { uri: logo } : require('@/assets/images/main/empty_dish.png')}
				resizeMode='cover'
				resizeMethod='resize'
				style={{ height: scale(55), width: scale(55), borderRadius: scale(15)}}
			/>
			<View style={{ gap: scale(5) }}>
				<Text
					style={{
						color: 'white',
						fontSize: scale(14),
						fontWeight: 'bold'
					}}
				>
					{title ? title.toUpperCase() : 'Завантажую'}
				</Text>

				<View style={{
					backgroundColor: Colors.darky,
					padding: scale(3),
					paddingRight: scale(10),
					borderRadius: scale(50),
					flexDirection: 'row',
					gap: scale(5)
				}}>

				<View
				style={{
					padding: scale(2),
					backgroundColor: '#181818',
					borderRadius: scale(50),
					width: scale(16)
				}}
			>
				{reviews ? (
					<AntDesign name='star' size={scale(12)} color={Colors.price} />
				) : (
					<AntDesign name='heart' size={scale(11)} color={Colors.success} />
				)}
			</View>
			<Text style={{ color: 'white', fontSize: scale(12), fontWeight: 'bold' }}>
				{reviews ? rating : null}
			</Text>
			<Text style={{ color: 'white', fontSize: scale(12) }}>{rating && reviews? `(${reviews})` : 'Новий заклад'}</Text>


				</View>
			</View>
		</View>
	)
}

export default PlaceLogo
