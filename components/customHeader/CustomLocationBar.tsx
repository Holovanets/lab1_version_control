import { Octicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { FC, useCallback, useRef } from 'react'
import { Text, View, Pressable } from 'react-native'

import { Link } from 'expo-router'
import { Normalize } from '@/atoms'
import { useUserAdressStateContext } from '@/context'
import { scale } from 'react-native-size-matters'
const CustomLocationBar: FC = () => {

	const {userAdress, setUserAdress } = useUserAdressStateContext()

	return (
		<View
			style={{
				width: '100%',
				height: scale(65),
				overflow: 'hidden',
				borderRadius: scale(15),
				justifyContent: 'center',
				backgroundColor: 'rgba(255,255,255, 0.1)'
			}}
		>
			<Link href='/setLocation' asChild>
				<Pressable
					android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
					style={{
						flex: 1,
						paddingHorizontal: scale(15),
						alignItems: 'center',
						alignContent: 'center',
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}
				>
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<View
							style={{
								backgroundColor: 'rgba(193,39,45,0.25)',
								height: scale(35),
								width: scale(35),
								borderRadius: scale(35),
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Octicons
								name='location'
								size={scale(22)}
								style={{ color: 'rgb(193,39,45)' }}
							/>
						</View>
						<View style={{ marginLeft: scale(15)}}>
							<Text
								style={{
									fontSize: scale(12),
									color: 'rgba(255,255,255,0.5)'
								}}
							>
								Моє місцезнаходження
							</Text>
							<Text
								style={{
									fontSize: scale(14),
									color: 'rgba(255,255,255,1)',

								}}
							>
								{userAdress? (userAdress.length> 25 ? userAdress.substring(0,25) + '...' : userAdress) : 'Введіть адресу' }
							</Text>
						</View>
					</View>

					<Octicons name='chevron-right' size={scale(24)} color='white' />
				</Pressable>
			</Link>
		</View>
	)
}

export default CustomLocationBar
