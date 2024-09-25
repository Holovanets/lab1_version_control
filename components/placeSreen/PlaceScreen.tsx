import { Colors } from '@/constants'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import {
	View,
	Animated,
	Text,
} from 'react-native'
import { useNavigation } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import PlaceHeaderBar from './PlaceHeaderBar'
import PlaceImageContent from './PlaceImageContent' 
import { Ionicons, Octicons } from '@expo/vector-icons'
import PlaceLogo from './PlaceLogo'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PlaceDeliveryType from './PlaceDeliveryType'
import PlaceBottomTab from './PlaceBottomTab'
import PlaceMenu from './PlaceMenu'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { scale } from 'react-native-size-matters'
import PlaceInfoModal from './modals/PlaceInfoModal/PlaceInfoModal'
import PlaceWiFiModal from './modals/PlaceWiFiModal/PlaceWiFIModal'
import { usePlaceScreen } from './usePlaceScreen'
import PlaceScreenLoader from './PlaceScreenLoader'
import NetworkPlaces from './NetworkPlaces/NetworkPlaces'
import LoverDishesBlock from './LoverDishes/LoverDishesBlock'
import PlaceServiceConditions from './modals/PlaceServiceConditions'
import PlaceElectricityStatusBlock from './PlaceElectricityStatusBlock'

const HEADER_HEIGHT = scale(270)
interface IProps {}

const PlaceScreen: FC<IProps> = () => {
	const { id } = useLocalSearchParams()

	const [deliveryType, setDeliveryType] = useState(0)
	const {models, operations} = usePlaceScreen(Number(id))
	const countReviewers = models.spot && models.spot.stars ? (models.spot.stars.star1 + models.spot.stars.star2
		+ models.spot.stars.star3 + models.spot.stars.star4 + models.spot.stars.star5) : 0
	useEffect(()=>{
		operations.getThisSpot()
	},[id])

	const scrollY = useRef(new Animated.Value(0)).current
	const navigation = useNavigation()

	const infoModalRef = useRef<BottomSheetModal>(null)
	const wifiModalRef = useRef<BottomSheetModal>(null)
	const placeServiceConditionsModalRef = useRef<BottomSheetModal>(null)
	const openInfoModal = useCallback(() => {
		infoModalRef.current?.present()
	}, [])
	const wifiInfoModal = useCallback(() => {
		wifiModalRef.current?.present()
	}, [])
	const placeServiceConditionsModal = useCallback(() => {
		placeServiceConditionsModalRef.current?.present()
	}, [])

	const goBack = () => {
		navigation.goBack()
	}
	if(!models.spot || models.spot === null){
    return(
			<PlaceScreenLoader/>
    )
	}else return (
		<>
			<PlaceHeaderBar
				{...{ HEADER_HEIGHT, scrollY, goBack }}
				openWiFi={wifiInfoModal}
				title={models.spot.name || ''}
				spotId={models.spot.id}
			/>
			<Animated.ScrollView
				onScroll={Animated.event(
					[
						{
							nativeEvent: { contentOffset: { y: scrollY } }
						}
					],
					{ useNativeDriver: true }
				)}
				style={{ backgroundColor: Colors.darky }}
			>
				<PlaceImageContent
					{...{ HEADER_HEIGHT, scrollY }}
					slug={models.spot.slug || ''}
					img={models.spot.cover}
					lng={models.spot.location.geolng}
					lat={models.spot.location.geolat}
					workTime={models.spot.worktime}
				/>
				<View
					style={{
						backgroundColor: Colors.darky,
						flex: 1,
						paddingVertical: scale(15),
						paddingBottom: scale(100)
					}}
				>

					<PlaceLogo
						logo={models.spot.logo}
						title={models.spot.name}
						rating={models.spot.stars ? models.spot.stars.total/100 : null}
						reviews={countReviewers}
					/>
					<PlaceElectricityStatusBlock electricity={models.spot.electricity}/>
				


					<TouchableOpacity style={{
						 marginTop: scale(15),
						 marginHorizontal: scale(15),
						 padding: scale(15),
						 backgroundColor: '#151515',
						 borderRadius: scale(15)
					}} onPress={()=>openInfoModal()}>
						<Text
							style={{
								color: 'rgba(255,255,255,0.7)',
								fontSize: scale(12)
							}}
						>
							{models.spot.description}
						</Text>
						<Text
							style={{
								color: Colors.mDark,
								fontWeight: 'bold',
								fontSize: scale(12)
							}}
						>
							Подробиці
						</Text>
					</TouchableOpacity>
					<PlaceDeliveryType
					  lat={models.spot.location.geolat}
					  lng={models.spot.location.geolng}
						types={[1, 0, 0]}
						setType={setDeliveryType}
						adress={models.spot.location.address}
						city={models.spot.location.city}
						{...{ deliveryType }}
					/>

					{models.spot.isVerified ? null : (
						<View style={{
							paddingHorizontal: scale(15),
							marginTop: scale(15)
						}}>
							<View style={{
							padding: scale(15),
							borderRadius: scale(15),
							backgroundColor: Colors.mDark15,
							alignItems: 'center',
							flexDirection: 'row',
							gap: scale(15)
						}}>
							<Ionicons name="warning-outline" size={24} color={Colors.mDark} />
							
							<View>
								<Text style={{
									color: 'white',
									fontSize: scale(14)
								}}>Заклад не веріфіковано</Text>
								<Text style={{
									color: 'rgba(255,255,255,0.5)',
									fontSize: scale(12),
									width: scale(250)
								}}>Ви можете обрати страви, додати в корзину та показати офіціанту. Але замовлення зробити буде неможливо</Text>
							</View>

						</View>
						</View>
					)}
					<NetworkPlaces orgId={models.spot.organizationId}/>
					<LoverDishesBlock spotId={models.spot.id} spotName={models.spot.name}/>
					<View style={{
						paddingHorizontal: scale(15),
						width: '100%',
						marginTop: scale(15),
						flexDirection: 'row'
					}}>

							<View style={{
								borderBottomColor: Colors.mDark,
								borderBottomWidth: 2
							}}>
								<Text style={{
									color:'white',
									fontWeight: 'bold',
									padding: scale(15),
									fontSize: scale(16)
								}}>Меню</Text>
							</View>


					</View>
					<PlaceMenu type={deliveryType} id={models.spot.id} spotName={models.spot.name} />
				</View>
				</Animated.ScrollView>
				<PlaceInfoModal 
				placeAdress={models.spot.location.address}
				reference={infoModalRef}
				placeCity={models.spot.location.city}
				placeLat={models.spot.location.geolat}
				placeLng={models.spot.location.geolng}
				placeName={models.spot.name}
				placeSocials={models.spot.socials}
				/>
				<PlaceWiFiModal networkName={models.spot.wifi && models.spot.wifi.name ? models.spot.wifi.name : 'Особиста мережа відсутня' } networkPassword={models.spot.wifi && models.spot.wifi.password ? models.spot.wifi.password : 'Особиста мережа відсутня'  || 'Особиста мережа відсутня'} reference={wifiModalRef}/>
				<PlaceServiceConditions reference={placeServiceConditionsModalRef}/>
			<PlaceBottomTab placeId={models.spot.id} openConditionalsModal={placeServiceConditionsModal}/>
		</>
	)
}

export default PlaceScreen
