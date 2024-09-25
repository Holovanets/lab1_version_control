import { CustomButton } from '@/atoms'
import { Colors } from '@/constants'
import { FC } from 'react'
import { View, Animated } from 'react-native'
import Constants from 'expo-constants'
import { Ionicons, Octicons } from '@expo/vector-icons'

interface IProps {
	goBack: () => void
}

const MapViewHeaderBar: FC<IProps> = ({ goBack }) => {
	return (
		<View
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingHorizontal: 15,
				paddingTop: Constants.statusBarHeight,
				flexDirection: 'row',
				zIndex: 1
			}}
		>
			<View
				style={{
					marginTop: 10,
					justifyContent: 'space-between',
					flexDirection: 'row',
					width: '100%',
					alignItems: 'center'
				}}
			>
				<CustomButton callback={() => goBack()}>
					<Octicons name='chevron-left' size={32} color={Colors.accentRed} />
				</CustomButton>
			</View>
		</View>
	)
}

export default MapViewHeaderBar
