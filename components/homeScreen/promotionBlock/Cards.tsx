import { FC, useState, useEffect } from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import promo from './dataSET/promo'
import { Colors, SCREEN_WIDTH, Sizes } from '@/constants'
import { Normalize, Separator } from '@/atoms'
import { scale } from 'react-native-size-matters'
import {View as MView} from 'moti'

const Cards: FC = () => {
	const CARD_WIDTH = scale(SCREEN_WIDTH - (SCREEN_WIDTH - 310))
	const [promos, setPromos] = useState<any>(null)
	useEffect(() => {
		setPromos(promo)
		// console.log(promo[0].title)
	}, [])


	if(!promos || promos.length === 0){
		const size = 200
		const INDICATOR_SIZE = size * 0.4;
		const thumbHeight = 20;
	
		return(
					<View style={{
						borderRadius: scale(15),
						marginLeft: scale(20),
						width: CARD_WIDTH,
						height: 120,
						backgroundColor: Colors.mDark15,
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						
	
						<View
					style={{
						width: size,
						height: thumbHeight,
						borderRadius: thumbHeight / 2,
						backgroundColor: Colors.mDark15,
						alignItems: 'center',
						justifyContent: 'center',
						overflow: 'hidden',
					}}>
					<MView
						from={{
							translateX: -size / 2 - INDICATOR_SIZE / 2 + thumbHeight,
						}}
						animate={{
							translateX: size / 2 + INDICATOR_SIZE / 2 - thumbHeight,
						}}
						transition={{
							loop: true,
							type: 'timing',
							duration: 500,
						}}
	
						style={{
							position: 'absolute',
							backgroundColor: Colors.mDark,
							width: INDICATOR_SIZE,
							height: thumbHeight,
							borderRadius: thumbHeight / 2,
						}}
					/>
					</View>
	
					</View>
		)
	}else if(promos.length > 0) {
		return (
			<FlatList
				showsHorizontalScrollIndicator={false}
				pagingEnabled 
				snapToInterval={CARD_WIDTH + scale(5) * 2}
				decelerationRate='fast'
				overScrollMode='never'
				data={promos}
				keyExtractor={item => item?.id}
				horizontal
				ListHeaderComponent={() => <Separator width={Sizes.mainPadding} />}
				// ListFooterComponent={() => <Separator width={Sizes.mainPadding} />}
				// ItemSeparatorComponent={() => <Separator width={scale(15)} />}
				renderItem={({ item }) => (
					<View
						key={item?.id}
						style={{
							width: CARD_WIDTH,
							height: scale(150),
							backgroundColor: item?.color,
							borderRadius: scale(15),
							padding: scale(15),
							overflow: 'hidden',
							justifyContent: 'space-between',
							alignItems:'center',
							flexDirection: 'row',
							marginHorizontal: scale(5)
						}}
					>
						<Image
							source={require('@/assets/images/main/pattern.png')}
							style={{ position: 'absolute', width: scale(300), height: scale(150) }}
							resizeMode='cover'
						/>
						<View style={{ justifyContent: 'space-between'}}>
							<View style={{ gap: scale(10), height: scale(80) }}>
								<Text
									style={{
										fontWeight: 'bold',
										color: 'white',
										fontSize: scale(16),
										width: scale(160)
									}}
								>
									{item?.title}
								</Text>
								<Text
									style={{
										color: 'rgba(255,255,255,0.5)',
										fontSize: scale(12),
										width: scale(160)
									}}
								>
									{item?.description}
								</Text>
							</View>
							<Text style={{ color: 'white', fontSize: scale(14), width: scale(160) }}>
								{item?.offer}
							</Text>
						</View>
						<View>
							<Image
								source={{ uri: item?.image }}
								resizeMode='cover'
								style={{ height: scale(100), width: scale(100), borderRadius: scale(60) }}
							/>
						</View>
					</View>
				)}
				// className='ml-7'
				style={{ overflow: 'visible' }}
			/>
		)
	}

	
}

export default Cards
