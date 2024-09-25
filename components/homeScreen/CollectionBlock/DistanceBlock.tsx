import { Colors } from '@/constants'
import { useUserAdressStateContext, useUserLocationStateContext } from '@/context'
import {calculateDistance} from '@/services'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { SpotItem } from './useNearestSpots'


interface IProps {
	item: SpotItem
}


const DistanceBlock: FC<IProps> = ({ item }) => {
	const userLocation = useUserLocationStateContext()
	const userAdress = useUserAdressStateContext()
	const [distanceToPlace, setDistanceToPlace] = useState(0)
	useEffect(()=>{
		if(userLocation.userLocation?.coords.latitude && userLocation.userLocation?.coords.longitude){
			if(item.location){
				const calculateDistanceToPlace = calculateDistance(userLocation.userLocation?.coords.latitude, userLocation.userLocation?.coords.longitude, item.location?.geolat, item.location?.geolng)
				setDistanceToPlace(calculateDistanceToPlace)
			}else{
				const calculateDistanceToPlace = calculateDistance(userLocation.userLocation?.coords.latitude, userLocation.userLocation?.coords.longitude, 46.3698536, 30.726982)
				setDistanceToPlace(calculateDistanceToPlace)
			}
		
			
		}
	}, [userLocation, userAdress])
	const shortDistance = (distance: number) => {
		if (distance < 1000) {
			return `${distance.toFixed(0)} м`
		}
		const distanceInKm = (distance / 1000).toFixed(1)
		if (distanceInKm.endsWith('.0')) {
			return `${parseInt(distanceInKm)} км`
		}
		return `${distanceInKm} км`
	}
	return (
		<View
			style={{
				paddingVertical: scale(5),
				paddingHorizontal: scale(10),
				borderRadius: scale(100),
				backgroundColor: Colors.mDark,
				position: 'absolute',
				right: scale(10),
				top: scale(10),
				flexDirection: 'row',
				gap: scale(5),
				alignItems: 'center',
				zIndex: 2
			}}
		>
			<MaterialCommunityIcons name='bullseye-arrow' size={scale(14)} color='white' />
			<Text style={{ color: 'white', fontSize: scale(12) }}>
				{shortDistance(distanceToPlace)}
			</Text>
		</View>
	)
}

export default DistanceBlock
