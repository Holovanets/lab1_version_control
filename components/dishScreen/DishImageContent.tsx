import { FC } from 'react'
import { Text, View, Animated } from 'react-native'
import { Octicons } from '@expo/vector-icons'
import { Normalize } from '@/atoms'
import { scale } from 'react-native-size-matters'

interface IProps {
	HEADER_HEIGHT: number
	scrollY: Animated.Value
	img: string | null
}

const DishImageContent: FC<IProps> = ({
	HEADER_HEIGHT,
	scrollY,
	img
}) => {
	
	return (
		<View
			style={{
				marginTop: -1000,
				paddingTop: 1000,
				alignItems: 'center',
				overflow: 'hidden'
			}}
		>
			<Animated.Image
				source={img ? { uri: img } : require('/assets/images/main/empty_dish_screen.png')}
				resizeMode='cover'
				style={{
					height: HEADER_HEIGHT,
					width: '120%',
					transform: [
						{
							translateY: scrollY.interpolate({
								inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
								outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
							})
						},
						{
							scale: scrollY.interpolate({
								inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
								outputRange: [2, 1, 0.75]
							})
						}
					]
				}}
			/>
			{/* <Animated.Image
				source={require('/assets/images/main/gradient_dark.png')}
				resizeMode='cover'
				style={{
					marginTop: -HEADER_HEIGHT,
					height: HEADER_HEIGHT,
					width: '200%',
					transform: [
						{
							translateY: scrollY.interpolate({
								inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
								outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
							})
						},
						{
							scale: scrollY.interpolate({
								inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
								outputRange: [2, 1, 0.75]
							})
						}
					]
				}}
			/> */}

			<Animated.View
				style={{
					position: 'absolute',
					bottom: scale(80),
					alignItems: 'center',
					transform: [
						{
							translateY: scrollY.interpolate({
								inputRange: [0, scale(50), scale(270)],
								outputRange: [0, scale(30), scale(200)],
								extrapolate: 'clamp'
							})
						}
					]
				}}
			>

			</Animated.View>
			<Animated.View
				style={{
					position: 'absolute',
					bottom: scale(10),
					alignItems: 'center',
					width: '100%',
					transform: [
						{
							translateY: scrollY.interpolate({
								inputRange: [0, scale(50), scale(270)],
								outputRange: [0, 0, scale(150)],
								extrapolate: 'clamp'
							})
						}
					]
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						width: '100%',
						paddingHorizontal: scale(15)
					}}
				>
				</View>
			</Animated.View>
		</View>
	)
}

export default DishImageContent
