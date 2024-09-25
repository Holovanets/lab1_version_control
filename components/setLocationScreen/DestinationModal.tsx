import { FC } from 'react'
import { FlatList, Modal, Text, TextInput, View } from 'react-native'
import SetLocationHeaderBar from './SetLocationHeaderBar'
import { useNavigation } from 'expo-router'
import FlatListHeader from './FlatListHeader'
import { Colors, Sizes } from '@/constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import { useDestinationalModal } from './useDestinationModal'
import PlaceListItem from './PlaceListItem'
import { LocationTextSearchItem } from '@/services/index'
import { useUserLocationStateContext } from '@/context'
import MapView from 'react-native-maps'

interface DestinationModalProps {
	visible: boolean
	close: () => void
	mapRef : React.MutableRefObject<MapView | undefined>
}

const DestinationModal: FC<DestinationModalProps> = ({ visible, close, mapRef }) => {
	const {userLocation, setUserLocation} = useUserLocationStateContext()
	const insets = useSafeAreaInsets()
	const renderFlatListItem = ({item} : {item: LocationTextSearchItem}) => {
		const location ={latitude : item.geometry.location.lat, longitude : item.geometry.location.lng}
		const handleLocationItemPress = async ()=>{
			let locationOnMaps = {
				latitude: item.geometry.location.lat,
				longitude: item.geometry.location.lng,
				latitudeDelta: 0.1,
				longitudeDelta: 0.1
			}
			
			close()
			// console.log(`Adress: ${item.formatted_address}, lngLtd : ${item.geometry.location.lat}`);
			
			mapRef.current?.animateCamera({ center: locationOnMaps, zoom: 18 })
			 await setUserLocation({
				coords: {
					latitude: location.latitude,
					longitude: location.longitude
				}
			})
		}

		return <PlaceListItem name={item.name} iconUrl={item.icon} address={item.formatted_address} onPress={()=>handleLocationItemPress()}/>
	}
	const { models, operations } = useDestinationalModal()

	return (
		<Modal {...{ visible }} animationType='slide' onRequestClose={close}>
			<View
				style={{
					flex: 1,
					backgroundColor: Colors.darky,
					paddingTop: insets.top + scale(80),
					paddingHorizontal: scale(Sizes.mainPadding)
				}}
			>
				<SetLocationHeaderBar goBack={close} />

				<TextInput
					placeholder='Введіть вашу адресу'
					style={{
						color: 'white',
						minHeight: scale(40),
						width: '100%',
						paddingHorizontal: scale(15),
						backgroundColor: '#151515',
						fontSize: scale(14),
						justifyContent: 'center'
					}}
					autoFocus
					placeholderTextColor='rgba(255,255,255,0.5)'
					onChangeText={operations.onChangeText}
				/>

				<FlatList
					data={models.textSearchQueryResponseData}
					renderItem={renderFlatListItem}
					ListHeaderComponent={
						<FlatListHeader
							destinationText={models.destinationalInputValue}
							onDestinationTextChange={operations.onChangeText}
						/>
					}
				/>
			</View>
		</Modal>
	)
}

export default DestinationModal
