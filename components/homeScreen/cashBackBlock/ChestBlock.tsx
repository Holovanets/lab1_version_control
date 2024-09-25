import { Normalize } from '@/atoms'
import Colors from '@/constants/Colors'
import { Octicons } from '@expo/vector-icons'
import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

const ChestBlock: FC = () => {
	const [chestCount, setChestCount] = useState<number>(0)
	useEffect(() => {
		setChestCount(2)
	}, [])

	return (
		<View style={styles.myChest}>
			<Text style={{ color: '#fff', fontSize: scale(12) }}>
				Моя скринька
			</Text>
			<View style={styles.chestCountBlock}>
				<Text
					style={{
						color: Colors.mDark,
						fontSize: scale(14),
						fontWeight: 'bold'
					}}
				>
					{chestCount}
				</Text>
				<Octicons name='gift' color={Colors.mDark} size={scale(18)} />
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	myChest: {
		height: scale(65),
		width: '100%',
		backgroundColor: Colors.mDark,
		borderRadius: scale(5),
		padding: scale(15),
		flexDirection: 'row',
		alignItems: 'center'
	},
	chestCountBlock: {
		backgroundColor: '#fff',
		position: 'absolute',
		right: scale(15),
		top: scale(15),
		bottom: scale(15),
		paddingHorizontal: scale(10),
		width: scale(60),
		borderRadius: scale(5),
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center'
	}
})
export default ChestBlock
