import { Colors, Sizes } from '@/constants'
import { Octicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import RestourantList from './RestourantList'
import { scale } from 'react-native-size-matters'

interface IProps {
	title: string
}

const CollectionBlock: FC<IProps> = ({ title }) => {
	return (
		<View style={{ marginTop: scale(15), gap: scale(10)}}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					// paddingHorizontal: Sizes.mainPadding
				}}
			>
				<Text style={{ color: 'white', paddingLeft: scale(20), fontWeight: 'bold', fontSize: scale(18) }}>
					{title}
				</Text>
				<TouchableOpacity
					style={{ flexDirection: 'row', gap: scale(10), alignItems: 'center' }}
				>
					{/* <Text style={{ fontSize: scale(16), color: Colors.mDark }}>Усі</Text> */}
					{/* <Octicons name='chevron-right' size={scale(14)} color={Colors.mDark} /> */}
				</TouchableOpacity>
			</View>
			<RestourantList />
		</View>
	)
}

export default CollectionBlock
