import { CustomButton } from '@/atoms'
import { Colors } from '@/constants'
import { FC } from 'react'
import { View, Animated } from 'react-native'
import Constants from 'expo-constants'
import { Ionicons, Octicons } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useToast } from 'react-native-toast-notifications'

interface IProps {
	HEADER_HEIGHT: number
	scrollY: Animated.Value
	goBack: () => void
	clearCart : ()=> void
}

const CartHeaderBart: FC<IProps> = ({
	HEADER_HEIGHT,
	scrollY,
	goBack,
	clearCart
}) => {
	
	const insets = useSafeAreaInsets();
	const router = useRouter()
	const toast = useToast()
	return (
		<View
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingHorizontal: scale(15),
				paddingTop: Constants.statusBarHeight,
				flexDirection: 'row',
				zIndex: 1
			}}
		>
			<Animated.View
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
					left: 0,
					bottom: 0,
					height: scale(70) + insets.top,
					backgroundColor: Colors.darky,
					opacity: scrollY.interpolate({
						inputRange: [scale(HEADER_HEIGHT - 30), scale(HEADER_HEIGHT - 15)],
						outputRange: [0, 1]
					})
				}}
			/>

			<View
				style={{
					marginTop: scale(10),
					justifyContent: 'space-between',
					flexDirection: 'row',
					width: '100%',
					alignItems: 'center'
				}}
			>
				<CustomButton callback={() => goBack()}>
					<Octicons name='chevron-left' size={scale(32)} color={Colors.accentRed} />
				</CustomButton>
				<Animated.Text
					numberOfLines={1}
					style={{
						color: 'white',
						fontSize: scale(16),
						fontWeight: 'bold',
						opacity: scrollY.interpolate({
							inputRange: [scale(HEADER_HEIGHT - 30), scale(HEADER_HEIGHT - 15)],
							outputRange: [0, 1]
						})
					}}
				>
					Корзина
				</Animated.Text>
				<View style={{ flexDirection: 'row', gap: scale(10) }}>
					<CustomButton callback={() => {
						clearCart()
						router.push('/(app)/home')
						toast.show('Корзину очищено!',{
							type: 'success',
							placement: 'top',
							duration: 1500
						})
					}}>
						<Ionicons name='trash-outline' size={scale(24)} color={Colors.accentRed} />
					</CustomButton>
					{/* <CustomButton callback={() => goBack()}>
						<Octicons name='search' size={scale(24)} color={Colors.accentRed} />
					</CustomButton> */}
				</View>
			</View>
		</View>
	)
}

export default CartHeaderBart
