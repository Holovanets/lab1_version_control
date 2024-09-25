import { Colors } from '@/constants'
import { Octicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { scale } from 'react-native-size-matters'

interface CustomButtonProps {
	callback: () => void
	dark?: boolean
	children: React.ReactNode
}

const CustomButton: FC<CustomButtonProps> = ({ callback, dark, children }) => {
	return (
		<View
			// intensity={40}
			// tint='dark'
			// blurReductionFactor={20}
			style={{
				borderRadius: scale(15),
				justifyContent: 'center',
				alignContent:'center',
				alignItems:'center',
				overflow: 'hidden',
				width: scale(45),
				height: scale(45),
				backgroundColor: 'rgba(193,39,45,0.3)'
				// backgroundColor: 'rgba(0,0,0,0.3)'
			}}
		>
			<Pressable
				android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					alignContent: 'center',
					width: scale(45),
					height: scale(45)
				}}
				onPress={callback}
			>
				{children}
			</Pressable>
		</View>
	)
}

export default CustomButton
