import { Octicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Normalize } from '@/atoms'
import { Linking } from 'react-native';
import { scale } from 'react-native-size-matters'
import { SpotItem } from './useNearestSpots'
import { Colors } from '@/constants'


interface IProps {
	item: SpotItem
}


const openGoogleMaps = (lat:number, lng:number) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
};

const LocationBlock: FC<IProps> = ({ item }) => {
	return (
		<Pressable
		android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
		onPress={()=>openGoogleMaps(item.location.geolat, item.location.geolng)}
			style={{
				height: scale(75),
				flexDirection: 'row',
				alignItems: 'center',
				padding: scale(15),
				backgroundColor: Colors.darky,
				justifyContent: 'space-between'
			}}
		>
			<View style={{ flexDirection: 'row', gap: scale(10), alignItems: 'center' }}>
				<Octicons name='location' size={scale(18)} color='white' />
				<View>
					<Text
						style={{
							color: 'white',
							fontSize: scale(14),
							fontWeight: 'bold'
						}}
					>
						{item.location.city}
					</Text>
					<Text style={{ color: 'white', fontSize: scale(12) }}>
						{/* {item.adress} */}
						{item.location.address ? item.location.address.length > 23
							? item.location.address.substring(0, 23-3) + '...'
							: item.location.address  : '...'}
					</Text>
				</View>
			</View>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 5
				}}
			>
				<Feather name='map' size={scale(12)} color='white' />
				<Text style={{ color: 'white', fontSize: scale(12) }}>Маршрут</Text>
				{/* <Feather name='chevron-right' size={12} color='white' /> */}
			</View>
		</Pressable>
	)
}

export default LocationBlock
