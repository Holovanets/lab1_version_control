import { FC, useEffect, useState } from 'react'
import { Text, View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import CustomSearchBar from './CustomSearchBar'
import CustomLocationBar from './CustomLocationBar'
import Constants from 'expo-constants'
import { ApiConstants, Colors, Sizes } from '@/constants'
import { scale } from 'react-native-size-matters'
import { useAuth } from '@/context'
import { useUserInfo } from '@/services'
import axios from 'axios'
import { Octicons } from '@expo/vector-icons'
import { Link } from 'expo-router';

interface IProps {
	scrollY: Animated.Value
	openInfoModal:()=>void
}

const CustomHeader: FC<IProps> = ({ scrollY,openInfoModal }) => {
	const [userName, setUserName] = useState<string>('Друже')
	const userInfo = useUserInfo()

	useEffect(() => {
		if(userInfo?.name){
			setUserName(userInfo.name)
		}
	}, [userInfo])
	const translateHeader = scrollY.interpolate({
		inputRange: [0, scale(130)],
		outputRange: [0, scale(-130)],
		extrapolate: 'clamp'
	})
	const opacityTitle = scrollY.interpolate({
		inputRange: [0, scale(30)],
		outputRange: [1, 0],
		extrapolate: 'clamp'
	})
	const opacityLocation = scrollY.interpolate({
		inputRange: [0, scale(110)],
		outputRange: [1, 0],
		extrapolate: 'clamp'
	})
	const opacityBg = scrollY.interpolate({
		inputRange: [scale(80), scale(130)],
		outputRange: [0, 1],
		extrapolate: 'clamp'
	})
	return (
		<Animated.View
			style={{
				width: '100%',
				position: 'absolute',
				zIndex: 1,
				paddingTop: scale(Constants.statusBarHeight),

				transform: [{ translateY: translateHeader }]
			}}
		>
			<Animated.View
				style={{
					backgroundColor: Colors.darky,
					position: 'absolute',
					height: scale(205 + Constants.statusBarHeight),
					width: '100%',
					opacity: opacityBg
				}}
			></Animated.View>
			<View style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				paddingHorizontal: scale(15),
				alignItems: 'center'
			}}>
				<View style={{ }}>
					<Animated.Text
						style={{
							fontSize: scale(16),
							fontWeight: 'bold',
							color: '#fff',
							opacity: opacityTitle
						}}
					>
						Привіт, {userName}!✌️
					</Animated.Text>
					<Animated.Text
						style={{
							fontSize: scale(12),
							color: 'rgba(255,255,255,0.5)',
							opacity: opacityTitle
						}}
					>
						{/* Хочу бахнути по шаві з тобою 👉👈 */}
						Псс.. Там твої ласунки 👉
					</Animated.Text>
				</View>
				<Link
					href={'/(app)/myLoverList'}
					asChild
				>
					<TouchableOpacity>
						<Animated.View style={{
							height: scale(40),
							width: scale(40),
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: scale(15),
							backgroundColor: Colors.mDark15,
							opacity: opacityTitle
						}}>
							<Octicons name="heart-fill" size={24} color={Colors.mDark} />
						</Animated.View>
					</TouchableOpacity>
				</Link>

			</View>
			<View style={{ marginVertical: scale(20), gap: scale(16)}}>
				<Animated.View
					style={{
						opacity: opacityLocation,
						paddingHorizontal: Sizes.mainPadding
					}}
				>
					<CustomLocationBar />
				</Animated.View>
				<Animated.View style={{ paddingHorizontal: Sizes.mainPadding }}>
					<CustomSearchBar {...{openInfoModal}}/>
				</Animated.View>
			</View>
		</Animated.View>
	)
}

const styles = StyleSheet.create({})

export default CustomHeader
