import { Colors } from '@/constants'
import { SpotItem } from '@/services'
import { Feather, Octicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { scale } from 'react-native-size-matters'


interface IProps {
	place: SpotItem
  goToMap: (lat: number, lng: number) => void
}

const MapViewPlacesListGoToMapBlock: FC<IProps> = ({place, goToMap}) => {
  const catchGoToMap = ()=> {
    if(place.location){
      goToMap(place.location.geolat, place.location.geolng)
    }
  }
  return (
    <TouchableOpacity
		onPress={catchGoToMap}
			style={{
        width: '100%',
				flexDirection: 'row',
				alignItems: 'center',
				padding: scale(15),
				borderTopWidth: 2,
				borderTopColor: Colors.darky,
				justifyContent: 'space-between',
        // backgroundColor: Colors.mDark50
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
						{place.location.city ? place.location.city : 'Завантажую'}
					</Text>
					<Text style={{ color: 'white', fontSize: scale(12) }}>
						{/* {item.adress} */}
						{place.location.address ? place.location.address.length > 23
							? place.location.address.substring(0, 23-3) + '...'
							: place.location.address  : '...'}
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
				<Text style={{ color: 'white', fontSize: scale(12) }}>Показати</Text>
				{/* <Feather name='chevron-right' size={12} color='white' /> */}
			</View>
		</TouchableOpacity>
  )
}

export default MapViewPlacesListGoToMapBlock