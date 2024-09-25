import { Normalize } from '@/atoms'
import { Octicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { FC } from 'react'
import {
	Linking,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import { scale } from 'react-native-size-matters'

interface IProps{
	openInfoModal: ()=>void
}

const CustomSearchBar: FC<IProps> = ({openInfoModal}) => {
	const openTg = () => {
		const url = `https://t.me/+fgEI-FN-GwkxNTYy`;
		Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
	};
	return (
		<View style={{ flexDirection: 'row', gap: scale(15) }}>
				<TouchableOpacity
				onPress={() => {
					openTg()
				}}
				style={{
					...styles.button,
					flex: 1,
					flexDirection: 'row',
					gap:scale(15),
				}}
			>
				{/* <Octicons name='search' size={24} color='rgba(255,255,255,0.5)' /> */}
				<TextInput
					placeholder='Про оновлення в телеграмі'
					style={{ fontSize: scale(12), color: 'rgba(255,255,255,0.5)' }}
					placeholderTextColor='rgba(255,255,255, 0.5)'
					editable={false}
				/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={()=>{openInfoModal()}}>
				<Octicons name='info' size={scale(20)} style={{ color: 'rgb(193,39,45)' }} />
			</TouchableOpacity>
		
			{/* <View style={styles.button}>
				<Octicons
					name='three-bars'
					size={22}
					style={{ color: 'rgb(255,255,255)' }}
				/>
			</View> */}
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		height: scale(45),
		width: scale(45),
		// padding: scale(15),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255, 0.1)',
		borderRadius: scale(15)
	}
})
export default CustomSearchBar
