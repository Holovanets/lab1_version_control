import { FC, useEffect, useState } from 'react'
import { View, Alert, Text, Image, TouchableOpacity } from 'react-native'
import { useRef } from 'react'
import { Colors, initialRegion, mapJSON } from '@/constants'
import SetLocationHeaderBar from './SetLocationHeaderBar'
import { Link, router, useNavigation, useRouter } from 'expo-router'
import * as Location from 'expo-location'
import * as Haptics from 'expo-haptics'
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons'
import { Normalize } from '@/atoms'
import DestinationModal from './DestinationModal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useUserLocationStateContext,useUserAdressStateContext } from '@/context'
import { scale } from 'react-native-size-matters'
import { useReverseGeocoding } from '@/services'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useToast } from 'react-native-toast-notifications'

interface IProps{
	isGoBackShown?: boolean
}

const SetLocationScreen: FC<IProps> = ({isGoBackShown}) => {
	const {userLocation, setUserLocation} = useUserLocationStateContext()
	const {userAdress, setUserAdress } = useUserAdressStateContext()

	const [mapLocation, setMapLocation] = useState<{lat: number , lng: number}>({lat: 0, lng: 0})
	// const {reverseAdress} = useReverseGeocoding(userLocation?.coords.latitude, userLocation?.coords.longitude)
	const {reverseAdress} = useReverseGeocoding(mapLocation.lat, mapLocation.lng)

	const navigation = useNavigation()
	const router = useRouter()
	const goBack = () => {
		navigation.goBack()
	}
	const toast = useToast()
	useEffect(() => {
		const getPermissions = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				toast.show('Діла не буде',{
					placement: 'top',
					type: 'warning'
				})
				return
			} else {
				// console.log('Access granted')
			}
		}
		getPermissions()
	}, [])

	const saveLocation = (lat: number, lng: number) => {
		setMapLocation({lat: lat, lng : lng})
	
	}
	const saveUserAdress = (adress: string) =>{
		setUserLocation({
			coords: {latitude: mapLocation.lat, longitude: mapLocation.lng}
		})
		console.log(adress);
		setUserAdress(adress)
		router.push('/(app)/home')
	}
	
	const currentAdress = () => {
    // Проверяем, существуют ли `reverseAdress` и `results`
    const results = reverseAdress?.results;

    // Проверяем, что у нас есть по крайней мере один результат и он содержит нужные `address_components`
    if (results && results[0] && results[0].address_components.length > 1) {
        const part1 = results[0].address_components[1]?.short_name;
        const part2 = results[0].address_components[0]?.long_name;

        if (part1 && part2) {
            return `${part1}, ${part2}`;
        }
    }

    return 'Неможливо визначити адресу';
}

	const insets = useSafeAreaInsets()
	const mapRef = useRef<MapView>()



	const [isRegionChanging, setIsRegionChanging] = useState(false)
	const getMyLocation = async () => {
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
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
		saveLocation(region?.latitude, region?.longitude)
		setIsRegionChanging(false)
	}
	const [modalVisible, setModalVisible] = useState(false)
	const handleMapSearchBarPress = () => {
		setModalVisible(true)
	}
	const closeModal = () => {
		setModalVisible(false)
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
			{isGoBackShown && <SetLocationHeaderBar {...{ goBack }} />}
			<MapView
				style={{ flex: 1, justifyContent: 'center' }}
				{...{ onRegionChangeComplete }}
				onRegionChange={() => {
					setIsRegionChanging(true)
				}}
				initialRegion={starterRegion()}
				provider={PROVIDER_GOOGLE}
				customMapStyle={mapJSON}
				showsUserLocation
				showsBuildings
				showsScale={false}
				showsIndoors={true}
				showsMyLocationButton={false}
				//@ts-ignore
				ref={mapRef}
			/>

			<Image
				source={
					isRegionChanging
						? require('../../assets/images/icons/point_active.png')
						: require('../../assets/images/icons/point.png')
				}
				style={{
					width: 60,
					height: 60,
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: [{ translateX: -38 }, { translateY: -60 }]
				}}
				resizeMode='cover'
			/>
			<View
				style={{
					position: 'absolute',
					bottom: 10,
					alignItems: 'center',
					width: '100%',
					gap: 15
				}}
			>
				<View style={{ width: '100%', height: 70, paddingHorizontal: 15 }}>
					<TouchableOpacity
						onPress={() => handleMapSearchBarPress()}
						style={{ backgroundColor: 'rgba(0,0,0,0.7)',
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							gap: scale(15),
							paddingHorizontal: 30,
							borderRadius: scale(10)
						}}
						
					>
						<Octicons name='search' size={24} color='rgba(255,255,255,0.5)' />
						<Text style={{color: 'rgba(255,255,255,0.5)', fontSize: scale(14)}}>Введіть адресу вручну</Text>
					</TouchableOpacity>
				</View>
				
				<View style={{ width: '100%',  paddingHorizontal: 15 ,}}>
					<TouchableOpacity
					
						onPress={()=>{
							currentAdress && saveUserAdress(currentAdress())
						}}
						style={[{
							paddingVertical: scale(20),
							flex: 1,
							
							justifyContent: 'center',
							// alignItems: 'center',
							gap: scale(10),
							paddingHorizontal: 30,
							borderRadius: scale(10)
						}, isRegionChanging? {backgroundColor: Colors.darky15} : {backgroundColor: Colors.darky}]}
						
					>
						<View style={{flexDirection: 'row', gap: scale(15)}}>
						<Octicons name='location' size={24} color='rgba(255,255,255,1)' />
						<Text style={{color: 'rgba(255,255,255,1)', fontSize: scale(14), width: scale(250)}}>{reverseAdress ? currentAdress(): 'Вкажіть вашу адресу'}</Text>
						</View>
						{reverseAdress? (<Text style={{fontSize: scale(14),color: Colors.mDark, fontWeight: 'bold'}}>{'Використовувати цю адресу'}</Text>) : null}
						
					</TouchableOpacity>
				</View>
				
				<View
					style={{
						flexDirection: 'row',
						paddingHorizontal: 15,
						width: '100%'
					}}
				>
					<TouchableOpacity
						style={{
							height: 70,
							width: '100%',
							backgroundColor: Colors.mDark,
							borderRadius: 10,
							justifyContent: 'space-between',
							flexDirection: 'row',
							paddingHorizontal: 10,
							marginBottom: insets.bottom + 10,
							alignItems: 'center'
						}}
						onPress={() => {
							getMyLocation()
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								gap: 10,

								alignItems: 'center'
							}}
						>
							<View
								style={{
									backgroundColor: 'white',
									padding: 12,
									borderRadius: 50,
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<MaterialIcons name='my-location' size={24} color='black' />
							</View>
							<Text
								style={{
									color: 'white',
									fontSize: Normalize(12),
									width: 250,
									letterSpacing: 0.4
								}}
							>
								Натисніть тут, щоб визначити своє поточне місцерозташування.
							</Text>
						</View>
						
					</TouchableOpacity>
				</View>
			</View>
			<DestinationModal {...{mapRef}} visible={modalVisible} close={closeModal} />
		</View>
	)
}
export default SetLocationScreen
