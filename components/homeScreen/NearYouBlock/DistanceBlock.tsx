import { useUserLocationStateContext } from '@/context'
import {calculateDistance} from '@/services'
import { FC, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { SpotItem } from './useNearYou'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'
import { Colors } from '@/constants'

interface IProps {
  item : SpotItem
}

const DistanceBlock: FC<IProps> = ({item}) => {

  const userLocation = useUserLocationStateContext()
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
	}, [userLocation])

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
    <View style={{
      flexDirection: 'row',
      gap: scale(5),
      alignItems: 'center',
    }}>
      <MaterialCommunityIcons name='bullseye-arrow' size={scale(14)} color='white' />
			<Text style={{ color: 'white', fontSize: scale(12) }}>
				{shortDistance(distanceToPlace)}
			</Text>
    </View>
  )
}

export default DistanceBlock