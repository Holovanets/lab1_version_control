import { SCREEN_WIDTH } from '@/constants'
import { FC } from 'react'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

interface IProps {
	destinationText: string
	onDestinationTextChange: (text: string) => void
}

const FlatListHeader: FC<IProps> = ({
	destinationText,
	onDestinationTextChange
}) => {
	return (
		<View>
			<View
				style={{
					flexDirection: 'row',
					width: SCREEN_WIDTH - scale(50)
				}}
			></View>
		</View>
	)
}

export default FlatListHeader
