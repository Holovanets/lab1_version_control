import { FC, useEffect, useState } from 'react'
import { Text, View, Animated } from 'react-native'
import { FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons'
import { Normalize } from '@/atoms'
import { scale } from 'react-native-size-matters'
import { useUserLocationStateContext } from '@/context'
import {calculateDistance, currentWorkTime} from '@/services'
import { Colors } from '@/constants'

interface IProps {
	HEADER_HEIGHT: number
	scrollY: Animated.Value
	slug: string
	img: string | null | undefined
	lng: number
	lat: number
	workTime?: {
    type: "weekdays" | "weekends" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
    start: string;
    end: string;
		nowork?: boolean
}[]
}

const PlaceImageContent: FC<IProps> = ({
	HEADER_HEIGHT,
	scrollY,
	slug,
	img,
	lng,
	lat,
	workTime
}) => {
	const userLocation = useUserLocationStateContext()
	const [distanceToPlace, setDistanceToPlace] = useState(0)
	useEffect(()=>{
		if(userLocation.userLocation?.coords.latitude && userLocation.userLocation?.coords.longitude){
		const calculateDistanceToPlace = calculateDistance(userLocation.userLocation?.coords.latitude, userLocation.userLocation?.coords.longitude, lat, lng)
			setDistanceToPlace(calculateDistanceToPlace)			
		}
	}, [userLocation, lat, lng])
	function formatDistance(distance: number) {
		if (distance < 1000) {
			return `${distance.toFixed(0)} м`
		}
		const distanceInKm = (distance / 1000).toFixed(1)
		if (distanceInKm.endsWith('.0')) {
			return `${parseInt(distanceInKm)} км`
		}
		return `${distanceInKm} км`
	}

	function walkingTime(distance: number) {
		const speedPerMinute = 83.3
		const time = distance / speedPerMinute

		const hours = Math.floor(time / 60)
		const minutes = Math.round(time % 60)
		return hours > 0 ? `${hours} год ${minutes} хв` : `${minutes} хв`
	}
	const [isOpenNow, setIsOpenNow] = useState(false)
	const [is24Hour, setIs24Hour] = useState(false)
	const time = () =>{
		if(workTime){
			const dayType = currentWorkTime(workTime)
			const workTimeToday = workTime.find((day) => day.type === dayType);
			return workTimeToday
		}
	}
useEffect(()=>{
	setIsOpenNow(false)
	setIs24Hour(false)
	function convertToMinutes(timeString : string) {
		const [hours, minutes] = timeString.split(':').map(Number);
		return hours * 60 + minutes;
	}
	const now = new Date();
	const nowMinutes = now.getHours() * 60 + now.getMinutes();
	
	
	const timeWork = time();
	if (timeWork !== undefined) {
			const startMinutes = convertToMinutes(timeWork.start);
			const endMinutes = convertToMinutes(timeWork.end);
			setIsOpenNow(()=>{
				if(startMinutes === 0 && endMinutes === 0) {
					setIs24Hour(true)
					return true
				}
				return (nowMinutes >= startMinutes && nowMinutes < endMinutes);
			})
	}
	console.log(convertToMinutes(`${time()?.start}`) ,convertToMinutes(`${time()?.end}`) , nowMinutes);
	
	
},[workTime])


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
				source={img? { uri: img } : require('@/assets/images/main/empty_dish_screen.png')}
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
			<Animated.Image
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
			/>

			<Animated.View
				style={{
					position: 'absolute',
					bottom: HEADER_HEIGHT / 2 - 26 ,
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
				<Animated.Text
					style={{
						color: 'white',
						fontSize: scale(26),
						fontWeight: 'bold',
						width: scale(200),
						textAlign: 'center',
						textShadowColor: '#000',
						textShadowOffset: { width: 0, height: 1 },
						textShadowRadius: 3,
						opacity: scrollY.interpolate({
							inputRange: [HEADER_HEIGHT - scale(220), HEADER_HEIGHT - scale(120)],
							outputRange: [1, 0]
						})
					}}
				>
					{slug}
				</Animated.Text>

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
					{workTime && workTime.length > 0 && (
											<View
											style={[
												time()?.nowork || !isOpenNow ? {backgroundColor: Colors.mDark15} : {backgroundColor: Colors.success15},
												{
												flexDirection: 'row',
												borderRadius: scale(10),
												padding: scale(7),
												gap: scale(10),
												alignContent: 'center',
												alignItems: 'center'
											}]}
										>
											<Octicons name='clock' size={scale(12)} color={time()?.nowork || !isOpenNow ? Colors.mDark :  Colors.success} />
											<Text
												style={[
													time()?.nowork || !isOpenNow ? {color: Colors.mDark} : {color: Colors.success},
													{
													// color: 'white',
													fontSize: scale(12),
													fontWeight: '500'
												}]}
											>
												{is24Hour ? 'Цілодобово' : `${time()?.start} : ${time()?.end}`}
											</Text>
										</View>
					)}
					<View style={{ flexDirection: 'row', gap: scale(10) }}>
						<View
							style={{
								flexDirection: 'row',
								backgroundColor: 'rgba(255,255,255,0.15)',
								borderRadius: scale(10),
								overflow: 'hidden',
								padding: scale(5),
								gap: scale(5),
								alignContent: 'center',
								alignItems: 'center'
							}}
						>
							<Octicons name='location' size={scale(12)} color='white' />
							<Text
								style={{
									color: 'white',
									fontSize: scale(12),
									fontWeight: '500'
								}}
							>
								{formatDistance(distanceToPlace)}
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								backgroundColor: 'rgba(255,255,255,0.15)',
								borderRadius: scale(10),
								padding: scale(5),
								gap: scale(5),
								alignContent: 'center',
								alignItems: 'center'
							}}
						>
							<FontAwesome5 name="walking" size={scale(12)} color="white" />
							<Text
								style={{
									color: 'white',
									fontSize: scale(12),
									fontWeight: '500'
								}}
							>
								{walkingTime(distanceToPlace)}
							</Text>
						</View>
					</View>
				</View>
			</Animated.View>
		</View>
	)
}

export default PlaceImageContent
