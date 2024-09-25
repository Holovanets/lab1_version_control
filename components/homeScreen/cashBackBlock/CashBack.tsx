import Colors from '@/constants/Colors'
import { Octicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Finder from './Finder'
import QrBlock from './QrBlock'
import ChestBlock from './ChestBlock'
import { Sizes } from '@/constants'
import { scale } from 'react-native-size-matters'
import OrderBlock from './OrderBlock'

const CashBack: FC = () => {
	return (
		<View style={{ gap: scale(5), borderRadius: scale(15), overflow: 'hidden' }}>
				<OrderBlock/>
				{/* <Finder /> */}
				<QrBlock />
				{/* <ChestBlock /> */}	
		</View>
	)
}

export default CashBack
