import { Colors } from '@/constants'
import { MaterialIcons } from '@expo/vector-icons'
import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { scale } from 'react-native-size-matters'


interface IProps {
  getMyLocation: () =>void
  changeSearchLocation: () =>void
}

const MapViewSearchButtons: FC<IProps> = ({getMyLocation, changeSearchLocation}) => {
  return (
    <View
					style={{
						flexDirection: 'row',
						paddingHorizontal: scale(15),
						width: '100%',
						gap: scale(5)
					}}
				>
					<TouchableOpacity
						style={{
							flex:1,
							backgroundColor: Colors.darky,
							borderRadius: scale(10),
							justifyContent: 'space-between',
							flexDirection: 'row',
							paddingHorizontal: scale(10),
							paddingVertical: scale(10),
							alignItems: 'center'
						}}
						onPress={() => {
							getMyLocation()
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								gap: scale(10),

								alignItems: 'center'
							}}
						>
							<View
								style={{
									backgroundColor: 'white',
									padding: scale(12),
									borderRadius: scale(50),
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<MaterialIcons name='my-location' size={24} color='black' />
							</View>
							<Text
								style={{
									color: 'white',
									fontSize: scale(12),
									// width: 250,
									letterSpacing: 0.4
								}}
							>
								Знайти мене
							</Text>
						</View>
						
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							flex:1,							
							backgroundColor: Colors.mDark,
							borderRadius: scale(10),
							justifyContent: 'space-between',
							flexDirection: 'row',
							paddingHorizontal: scale(10),
							paddingVertical: scale(10),
							alignItems: 'center'
						}}
						onPress={() => {
							changeSearchLocation()
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								gap: scale(10),

								alignItems: 'center'
							}}
						>
							<View
								style={{
									backgroundColor: 'white',
									padding: scale(12),
									borderRadius: scale(50),
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<MaterialIcons name='search' size={24} color='black' />
							</View>
							<Text
								style={{
									color: 'white',
									fontSize: scale(12),
									width: 250,
									letterSpacing: 0.4
								}}
							>
								Шукати тут
							</Text>
						</View>
						
					</TouchableOpacity>
				</View>
  )
}

export default MapViewSearchButtons