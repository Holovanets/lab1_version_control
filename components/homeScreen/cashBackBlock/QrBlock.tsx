import { Normalize, Ticker } from '@/atoms'
import Colors from '@/constants/Colors'
import { useAuth } from '@/context'
import { FC, useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import QRCode from 'react-native-qrcode-svg'
import { useUserInfo } from '@/services'
import { useRouter } from 'expo-router'

const QrBlock: FC = () => {
	const [cashBackValue, setCashBackValue] = useState<number>(2515)
	const [userCard, setUserCard] = useState<string>('0000000000')
	const router = useRouter()
	const userInfo = useUserInfo()
	useEffect(() => {
		if(userInfo?.authMe?.phone){
			setUserCard(userInfo.authMe.phone)
		}
	}, [userInfo])


	function format(cardValue: string): string {
    const cleaned: string = cardValue.replace(/\D/g, '')
    const formatted = cleaned.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/,
        '$1 $2 $3 $4 $5'
    )
    return formatted
}

	return (
		<Pressable
		android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
		onPress={()=>router.push('/(app)/userCard')}
		style={styles.qrBlock}>
			<View
				style={{
					justifyContent: 'space-between'
				}}
			>
				{/* <Text style={{ fontSize: scale(24), color: '#fff' }}>
					{(cashBackValue - (cashBackValue % 100)) / 100},{cashBackValue % 100} ₴
				</Text> */}
				<View style={{
					flexDirection: 'row',
					alignItems:'center'
				}}>
					<Ticker number={(cashBackValue - (cashBackValue % 100)) / 100} textSize={scale(24)}/>
					<Text style={{ fontSize: scale(24), color: '#fff' }}>,</Text>
					<Ticker number={cashBackValue % 100} textSize={scale(24)}/>
					<Text style={{ fontSize: scale(24), color: '#fff' }}> ₴</Text>
				</View>
				<Text
					style={{ fontSize: scale(12), color: 'rgba(255,255,255,0.5)' }}
				>
					Накопичено кешбеку
				</Text>
				<Text style={{ fontSize: scale(16), color: '#fff' }}>
					{format(userCard)}
				</Text>
			</View>

			{/* <Image
				source={require('../../assets/images/main/qr.png')}
				resizeMode='cover'
				style={{ height: scale(80), width: scale(80) }}
			/> */}
			<View style={{ height: scale(80), width: scale(80), borderRadius: scale(5), padding: scale(5),overflow:'hidden', backgroundColor:'white'}}>
			<QRCode value={`${userCard || 'no phone'}`} size={scale(70)}/>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	qrBlock: {
		width: '100%',
		backgroundColor: Colors.mDark,
		borderRadius: scale(5),
		padding: scale(15),
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})

export default QrBlock
