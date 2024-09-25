import { FC } from 'react'
import { Linking, Pressable, Text, View } from 'react-native'

import { Colors } from '@/constants'
import { Feather, Ionicons } from '@expo/vector-icons'
import { Normalize } from '@/atoms'
import { scale } from 'react-native-size-matters'

interface IProps {
	types: number[]
	deliveryType: number
	setType: (index: number) => void
	adress: string
	city: string
	lat: number
	lng: number
}

const PlaceDeliveryType: FC<IProps> = ({
	types,
	deliveryType,
	setType,
	adress,
	city,
	lat,
	lng
}) => {
	const openGoogleMaps = (lat: number, lng: number) => {
		const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
		Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
	};
	const typesNum = types.reduce((acc, value) => acc + value)
	
	const scanQR = () => {
		return (
			<View
				style={{
					flexDirection: 'row',
					width: '100%',
					height: scale(60),
					marginTop: scale(15)
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: Colors.mDark15,
						borderRadius: scale(15),
						flexDirection: 'row',
						gap: scale(15),
						alignItems: 'center',
						paddingHorizontal: scale(15)
					}}
				>
					<Ionicons name='camera-outline' size={scale(24)} color={Colors.mDark} />
					<View>
						<Text
							style={{
								color: 'white',
								fontSize: scale(14),
								fontWeight: 'bold'
							}}
						>
							Скануй QR
						</Text>
						<Text
							style={{
								color: 'rgba(255,255,255,0.5)',
								fontSize: scale(12)
							}}
						>
							QR на кожному столику
						</Text>
					</View>
				</View>
			
			</View>
		)
	}
	const location = () => {
		return (
			<Pressable
				android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
				onPress={()=>openGoogleMaps(lat, lng)}
				style={{
					flexDirection: 'row',
					width: '100%',
					height: scale(60),
					marginTop: scale(15)
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: Colors.mDark15,
						borderRadius: scale(15),
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: scale(15),
						justifyContent: 'space-between'
					}}
					>

					<View style={{
						flexDirection: 'row',
						gap: scale(15),
						alignItems: 'center',
					}}>
					<Ionicons name='locate' size={scale(24)} color={Colors.mDark} />
					<View>
						<Text
							style={{
								color: 'white',
								fontSize: scale(14),
								fontWeight: 'bold'
							}}
						>
							{city}
						</Text>
						<Text
							style={{
								color: 'rgba(255,255,255,0.5)',
								fontSize: scale(12)
							}}
						>
							{adress}
						</Text>
					</View>
					</View>

				<View style={{
					height: '100%',
					flexDirection: 'row',
					alignItems: 'center',
					gap: scale(5)
				}}>
					<Feather name="map-pin" size={18} color="white" />
					<Text style={{
						color:'white',
						fontSize: scale(12)
					}}>Маршрут</Text>
				</View>

				</View>
			
			</Pressable>
		)
	}
	const delivery = () => {
		return (
			<View
				style={{
					flexDirection: 'row',
					width: '100%',
					height: scale(60),
					marginTop: scale(15)
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: Colors.mDark15,
						borderRadius: scale(15),
						flexDirection: 'row',
						gap: scale(15),
						alignItems: 'center',
						paddingHorizontal: scale(15)
					}}
				>
					<Ionicons name='bicycle' size={scale(24)} color={Colors.mDark} />
					<View>
						<Text
							style={{
								color: 'white',
								fontSize: scale(14),
								fontWeight: 'bold'
							}}
						>
							Власна доставка 30,00$
						</Text>
						<Text
							style={{
								color: 'rgba(255,255,255,0.5)',
								fontSize: scale(12)
							}}
						>
							40-50 хв.
						</Text>
					</View>
				</View>
				
			</View>
		)
	}
	return (
		<View style={[{ width: '100%', paddingHorizontal: scale(15) }, typesNum > 1 ? {marginTop: scale(15)}: null]}>
			<View
				style={{
					flexDirection: 'row',
					borderRadius: scale(15),
					overflow: 'hidden',
					gap: scale(2)
				}}
			>
				{ typesNum > 1 && types.map(
					(item, index) =>
						item === 1 && (
							<Pressable
								android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
								key={index}
								style={[
									{
										flex: 1,
										height: scale(60),
										borderRadius: scale(5),
										justifyContent: 'center',
										alignItems: 'center'
									},
									deliveryType === index
										? { backgroundColor: Colors.mDark }
										: { backgroundColor: Colors.mDark15 }
								]}
								onPress={() => {
									setType(index)
									// console.log(index)
								}}
							>
								{index === 0 && (
									<>
										<Ionicons
											name='fast-food-outline'
											size={scale(20)}
											color='white'
										/>
										<Text style={{ color: 'white', fontWeight: '500', fontSize: scale(12) }}>
											Заберу сам
										</Text>
									</>
								)}
								{index === 1 && (
									<>
										<Ionicons name='scan' size={scale(20)} color='white' />
										<Text style={{ color: 'white', fontWeight: '500', fontSize: scale(12)}}>
											Я у закладі
										</Text>
									</>
								)}
								
								{index === 2 && (
									<>
										<Ionicons name='bicycle' size={scale(20)} color='white' />
										<Text style={{ color: 'white', fontWeight: '500',fontSize: scale(12) }}>
											Доставлення
										</Text>
									</>
								)}
							</Pressable>
						)
				)}
			</View>
			{deliveryType === 0 && location()}
			{deliveryType === 1 && scanQR()}
			{deliveryType === 2 && delivery()}
		</View>
	)
}

export default PlaceDeliveryType
