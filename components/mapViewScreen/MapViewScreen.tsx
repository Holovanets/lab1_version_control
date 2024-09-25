import { FC, useEffect, useMemo, useState } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { useRef } from 'react'
import { Colors, initialRegion, mapJSON } from '@/constants'
import {  useNavigation, useRouter } from 'expo-router'
import * as Location from 'expo-location'
import MapView, { Marker, PROVIDER_GOOGLE, Polygon, Region, Circle} from 'react-native-maps'
import {  MaterialIcons } from '@expo/vector-icons'
import { CustomBackdrop, CustomBackground, Normalize } from '@/atoms'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useUserLocationStateContext } from '@/context'
import { scale } from 'react-native-size-matters'
import { ScreenSpotItem, useNearestPlaces, usePlace } from '@/services'
import { useToast } from 'react-native-toast-notifications'
import MapViewHeaderBar from './MapViewHeaderBar'
import MapViewBlock from './MapViewBlock'
import MapViewSelectedPlace from './MapViewSelectedPlace'
import MapViewSearchButtons from './MapViewSearchButtons'
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet'
import MapViewPlacesListItem from './MapViewPlacesListItem'


interface Markers {
	id: number
	logo: string | undefined
  latitude: number
  longitude: number
}



const getZoomFromRegion = (region: Region) => {
  return Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)
}

const MapViewScreen: FC = () => {



	const { userLocation } = useUserLocationStateContext()
  const {nearestPlacesModels, nearestPlacesOperations} = useNearestPlaces()

	const [mapCenter, setMapCenter] = useState<Region>(initialRegion)
	const [searchCircleCenter, setSearchCircleCenter] = useState<Region>(initialRegion)
	const [activePlaceId, setActivePlaceId] = useState(0)

	

	const [zoom, setZoom] = useState<number>(18)
	

	const insets = useSafeAreaInsets()
	const placesListRef = useRef<BottomSheet>(null)
	const mapRef = useRef<MapView>()
	const navigation = useNavigation()
	const toast = useToast()
	const snapPoints = useMemo(()=>[scale(insets.bottom + 55), '50%', '90%'], [])
	

	const [markers, setMarkers] = useState<Markers[]>([
    { id: 0, logo: '', latitude: 53.91326738786109, longitude: 27.523712915343737 },
  ])


	
	
  useEffect(()=>{
    const getSpots = () =>{
			if(userLocation && userLocation.coords){
				nearestPlacesOperations.getNearest(userLocation?.coords.latitude, userLocation?.coords.longitude, 2000, 30, 0, false, false, true)	
				setSearchCircleCenter({latitude: userLocation?.coords.latitude, longitude: userLocation?.coords.longitude, latitudeDelta: 1.5, longitudeDelta: 1.5})
			}
			return
		}
		getSpots()

		if(nearestPlacesModels.nearestPlaces){
			setMarkers(
				nearestPlacesModels.nearestPlaces.map(place =>(
					{
						id: place.id,
						logo: place.logo,
						latitude: place.location.geolat,
						longitude: place.location.geolng
					}
				))
			)
			
		}
		return () => {
			getSpots()
		}
		
  },[])

	
	const goBack = () => {
		navigation.goBack()
	}

	const changeSearchLocation = () =>{
		nearestPlacesOperations.getNearest(mapCenter.latitude, mapCenter.longitude, 2000, 30, 0, true, true, true).then(() => {
		})
		setSearchCircleCenter(mapCenter)
		setActivePlaceId(0)
		
	}
	const goToMap = (lat: number, lng: number) =>{
      let locationOnMaps = {
				latitude: Math.round(lat* 10000)/10000,
				longitude: Math.round(lng* 10000)/10000,
				latitudeDelta: 0.1,
				longitudeDelta: 0.1
			}
      mapRef.current?.animateCamera({ center: locationOnMaps , zoom: 18 })
			placesListRef.current?.collapse()
	console.log('ok: ', locationOnMaps);
	
      
  }
	const getMyLocation = async () => {
		try{

			let currentLocation = await Location.getCurrentPositionAsync({})
			let locationOnMaps = {
				latitude: currentLocation.coords.latitude,
				longitude: currentLocation.coords.longitude,
				latitudeDelta: 0.1,
				longitudeDelta: 0.1
			}
			mapRef.current?.animateCamera({ center: locationOnMaps, zoom: 18 })
		}catch(e){
			toast.show('Діла не буде',{
				duration: 1500,
				placement: 'top',
				type: 'danger'
			})
		}

	} 
	const onRegionChangeComplete = (region: Region) => {
		setZoom(getZoomFromRegion(region))
		setMapCenter(region)
	}
	const starterRegion = ()=>{
		if(userLocation){
			return {
				latitude: userLocation.coords.latitude,
				longitude: userLocation.coords.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			}
		}else{
			return initialRegion
		}
	}

	return (
		<View
			style={{ backgroundColor: Colors.darky, width: '100%', height: '100%' }}
		>
			<MapViewHeaderBar {...{ goBack }} />
			<MapViewBlock
				//@ts-ignore
				mapRef={mapRef}
				onRegionChangeComplete={onRegionChangeComplete}
				starterRegion={starterRegion}
				searchCircleCenter={searchCircleCenter}
				markers={nearestPlacesModels.nearestPlaces && nearestPlacesModels.nearestPlaces.map(place =>(
					{
						id: place.id,
						logo: place.logo,
						latitude: place.location.geolat,
						longitude: place.location.geolng,
						electricity: place.electricity
					}
				))}
				mapCenter={mapCenter}
				zoom={zoom}
				setActivePlaceId={setActivePlaceId}
				activePlaceId={activePlaceId}
			>

			</MapViewBlock>



			<View
				style={{
					position: 'absolute',
					bottom: insets.bottom,
					width: '100%',
					gap: scale(10),
					marginBottom: scale(insets.bottom + 70)
				}}
			>

				
				<MapViewSearchButtons
					getMyLocation={getMyLocation}
					changeSearchLocation={changeSearchLocation}
				/>

				<MapViewSelectedPlace
				activePlaceId={activePlaceId}

				/>
			</View>
			<BottomSheet
				ref={placesListRef}
				index={1}
				snapPoints={snapPoints}
				// onChange={handleSheetChanges}
				backgroundStyle={{
					borderTopLeftRadius: scale(20),
					borderTopRightRadius: scale(20),
					backgroundColor: Colors.darky
				}}
				handleIndicatorStyle={{ backgroundColor: Colors.mDark }}
			>
				<View style={{
					// paddingHorizontal: scale(15),
					alignItems: 'center',
					gap: scale(30),
					width: '100%',
					flex:1,
				}}>
					<Text style={{ 
						color: 'white',
						fontSize: scale(12)
					}}>Знайдено {nearestPlacesModels.nearestPlaces ? nearestPlacesModels.nearestPlaces.length : 0} закладів</Text>
				<View style={{
					flex: 1,
					width: '100%',
					paddingHorizontal: scale(15)
				}}>
						{
						nearestPlacesModels.nearestPlaces && (
							<BottomSheetFlatList
								data={nearestPlacesModels.nearestPlaces}
								style={{ 
									width: '100%',
									gap: scale(15)
								}}
								renderItem={({item}) =>(
									
									<MapViewPlacesListItem
										key={item.id} 
										place={item}
										goToMap={goToMap}
									/>

								)}
							/>
						)
					}
				</View>
				</View>
			</BottomSheet>

		</View>
	)
}
export default MapViewScreen
