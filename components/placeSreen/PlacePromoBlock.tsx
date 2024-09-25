import { FC, useEffect, useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import promo from './dataSET/promo'
import { Normalize, Separator } from '@/atoms'
import { Sizes, SCREEN_WIDTH } from '@/constants'
import { scale } from 'react-native-size-matters'
import Cards from '../promotionBlock/Cards'
interface IProps {
	promotion: string
}

const PlacePromoBlock: FC<IProps> = ({ promotion }) => {
	const [promos, setPromos] = useState<any>(null)
	useEffect(() => {
		setPromos(promo)
		// console.log(promo[0].title)
	}, [])
	return (
		<View>
			<View style={{ paddingHorizontal: 15 }}>
				<View
					style={{
						width: '100%',
						height: scale(55),
						backgroundColor: 'rgba(255,255,255,0.15)',
						borderRadius: scale(10),
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingHorizontal: scale(15),
						marginBottom: scale(15)
					}}
				>
					<View style={{ flexDirection: 'row', gap: scale(15), alignItems: 'center' }}>
						<Image
							source={require('../../assets/images/main/promo_percent.png')}
							resizeMode='cover'
							style={{ height: scale(35), width: scale(35) }}
						/>
						<Text
							style={{
								color: 'white',
								fontSize: scale(14),
								fontWeight: 'bold'
							}}
						>
							{promotion}
						</Text>
					</View>

				</View>
			</View>
			<Cards/>
		</View>
	)
}

export default PlacePromoBlock
