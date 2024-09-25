import { FC, useRef } from 'react'
import { Animated, Text, TouchableOpacity, View } from 'react-native'
import PlaceHeaderBar from './PlaceHeaderBar'
import { scale } from 'react-native-size-matters'
import { Colors } from '@/constants'
import { useNavigation } from 'expo-router'
import PlaceLogo from './PlaceLogo'
import PlaceImageContent from './PlaceImageContent'

const PlaceScreenLoader: FC = () => {
  const navigation = useNavigation()
  const HEADER_HEIGHT = scale(270)
	const goBack = () => {
		navigation.goBack()
	}
  const scrollY = useRef(new Animated.Value(0)).current
  return (
<>
			<PlaceHeaderBar
				{...{ HEADER_HEIGHT, scrollY, goBack }}
				openWiFi={()=>{}}
				title={'Відкриваю'}
			/>
			<View style={{ backgroundColor: Colors.darky }}
			>
				<PlaceImageContent
					{...{ HEADER_HEIGHT, scrollY }}
					slug={'Завантажую'}
					img={null}
					lng={0}
					lat={0}
				/>
				<View
					style={{
						backgroundColor: Colors.darky,
						flex: 1,
						paddingVertical: scale(15),
						paddingBottom: scale(100),
					}}
				>

						<View style={{ marginTop: scale(15)}}>
            <PlaceLogo
						logo={null}
						title={null}
						rating={null}
						reviews={0}
					/>
            </View>
					<TouchableOpacity style={{ marginTop: scale(15), marginHorizontal: scale(15)}}>
						<Text
							style={{
								color: 'rgba(255,255,255,0.7)',
								fontSize: scale(12)
							}}
						>
							Триває завантаження
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
					{/* <PlaceDeliveryType
						types={[1, 0, 0]}
						setType={setDeliveryType}
						adress={models.spot.location.address}
						city={models.spot.location.city}
						{...{ deliveryType }}
					/> */}

					
				</View>
				</View>
		</>
  )
}

export default PlaceScreenLoader