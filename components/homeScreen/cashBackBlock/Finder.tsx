import { Normalize } from '@/atoms'
import Colors from '@/constants/Colors'
import { Octicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters'

const Finder: FC = () => {
	return (
		<View style={styles.swipe}>
			<Image
				source={require('../../assets/images/main/swipe_cards.png')}
				resizeMode='cover'
				style={{ height: scale(70), width: scale(70) }}
			/>
			<View style={{ flex: 1, alignSelf: 'flex-start' }}>
				<Text
					style={{
						fontSize: scale(16),
						fontWeight: '500',
						color: 'white'
					}}
				>
					Вас багато? Рушій у Файндер
				</Text>
			</View>
			<View
				style={{
					paddingVertical: scale(5),
					paddingHorizontal: scale(10),
					borderRadius: scale(12),
					backgroundColor: 'rgba(255,255,255,0.25)',
					gap: scale(10),
					flexDirection: 'row',
					alignItems: 'center',
					position: 'absolute',
					bottom: scale(15),
					left: scale(95)
				}}
			>
				<Text style={{ color: '#fff', fontSize: scale(14) }}>
					Свайпай тут
				</Text>
				<Octicons name='chevron-right' color='white' size={scale(16)} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	swipe: {
		height: scale(115),
		width: '100%',
		padding: scale(15),
		gap: scale(15),
		alignContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: Colors.darky,
		borderRadius: scale(5)
	}
})

export default Finder
