import { Colors, Sizes } from '@/constants'
import { Octicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Cards from './Cards'
import { scale } from 'react-native-size-matters'

const Promotions: FC = () => {
	
	return (
		<View style={{ marginTop: scale(30), gap: scale(10) }}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					// paddingHorizontal: Sizes.mainPadding
				}}
			>
				<Text style={{ color: 'white', fontWeight: 'bold', fontSize: scale(18), paddingLeft: scale(20) }}>
					Акції у закладах
				</Text>
			</View>
			<Cards />
		</View>
	)
}

export default Promotions
