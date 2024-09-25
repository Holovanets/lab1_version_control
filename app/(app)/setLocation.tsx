import { SetLocationScreen } from '@/components'
import { Colors } from '@/constants'
import { FC, useRef } from 'react'
import { Animated, Text, View } from 'react-native'




const Location: FC = () => {
	
	return (
		<View >
			<SetLocationScreen isGoBackShown={true}/>
		</View>
	)
}

export default Location
