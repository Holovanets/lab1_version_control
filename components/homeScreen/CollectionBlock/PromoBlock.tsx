import { FC } from 'react'
import { Text, View, Image } from 'react-native'
import restoCard from './dataSET/restoCard'
import { Colors } from '@/constants'
import { Normalize } from '@/atoms'

const PromoBlock: FC = () => {
	return (
		<View
			style={{
				height: 65,
				backgroundColor: 'rgba(255,255,255,.1)',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: 15,
				borderBottomColor: Colors.darky,
				borderBottomWidth: 1
			}}
		>
			<View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
				<Image
					source={require('../../assets/images/main/promo_percent.png')}
					resizeMode='cover'
					style={{ height: 35, width: 35 }}
				/>
				<Text style={{ color: 'white', fontSize: Normalize(14) }}>
					{restoCard.promo}
				</Text>
			</View>
			<Image
				source={require('../../assets/images/main/promo_finger_right.png')}
				resizeMode='cover'
				style={{ height: 35, width: 35 }}
			/>
		</View>
	)
}

export default PromoBlock
