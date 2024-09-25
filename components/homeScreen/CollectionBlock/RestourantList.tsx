import { FC, useEffect, useRef, useState } from 'react'
import { Animated, FlatList, Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import Separator from './Separator'
import { Colors, SCREEN_WIDTH, Sizes } from '@/constants'
import restourants from './dataSET/restourants'
import { LinearGradient } from 'expo-linear-gradient'
import ReviewsBlock from './ReviewsBlock'
import DistanceBlock from './DistanceBlock'
import PromoBlock from './PromoBlock'
import TopPositionsBlock from './TopPositionsBlock'
import LocationBlock from './LocationBlock'
import { Link } from 'expo-router'
import { Normalize } from '@/atoms'
import { scale } from 'react-native-size-matters'
import Constants from 'expo-constants';
import { useNearestSpots } from './useNearestSpots'
import { useUserLocationStateContext } from '@/context'
import { Octicons } from '@expo/vector-icons'

const RestourantList: FC = () => {
	const CARD_WIDTH = scale(SCREEN_WIDTH - (SCREEN_WIDTH - 310))
	const scrollX = useRef(new Animated.Value(0)).current
	// const [restos, setRestos] = useState<any>({})
	const {models, operations} = useNearestSpots()
	const {userLocation} = useUserLocationStateContext()
	useEffect(() => {
		// setRestos(restourants)
		operations.getNearest()
	}, [userLocation])
	return (
		<Animated.FlatList
			showsHorizontalScrollIndicator={false}
			overScrollMode='never'
			data={models.nearestSpots}
			keyExtractor={item => item.id.toString()}
			horizontal
			initialNumToRender={2}
			pagingEnabled 
			snapToInterval={CARD_WIDTH + scale(5) * 2}
			ListHeaderComponent={<Separator width={scale(15)}/>}
			decelerationRate='fast'
			onScroll={Animated.event(
				[{nativeEvent: {contentOffset: {x: scrollX}}}],
				{useNativeDriver: true}
			)}
			renderItem={({ item, index }) => {
			const inputRange=[
				(index - 1) * CARD_WIDTH,
				index * CARD_WIDTH,
				(index + 1) * CARD_WIDTH
			]
			const translateX = scrollX.interpolate({
				inputRange,
				outputRange: [-CARD_WIDTH * 0.3, 0, CARD_WIDTH * 0.3]
			})
			return (
				
				<Link
					href={{
						pathname: '/(app)/place/[id]',
						params: { id: item.id }
					}}
					key={item.id}
					asChild
				>
					<Pressable
						style={{
							width: CARD_WIDTH,
							borderRadius: scale(15),
							backgroundColor: Colors.darky,
							overflow: 'hidden',
							// justifyContent: 'space-between',
							alignItems: 'center',
							marginHorizontal: scale(5)
						}}
					>
						<Animated.Image
							source={ item.poster? { uri: item.poster } : require('@/assets/images/main/empty_dish_screen.png')}
							resizeMode='cover'
							resizeMethod='resize'
							style={{ 
								height: scale(170),
								width: CARD_WIDTH*1.4,
								transform: [{
									translateX
								}] 
							}}
							
						/>
						<LinearGradient
							style={{
								position: 'absolute',
								zIndex: 1,
								width: CARD_WIDTH,
								height: scale(170)
							}}
							colors={['rgba(0,0,0,0)', 'rgba(07,07,07,.3)']}
						/>
						<View
							style={{
								width: CARD_WIDTH,
								backgroundColor: Colors.darky,
								paddingTop: scale(40)
							}}
						>
							<View style={{
								flexDirection: 'row',
								gap: scale(10),
								paddingHorizontal: scale(15)
							}}>
								{item.isVerified ? (
									<View style={{ 
										backgroundColor: Colors.success15,
										paddingVertical: scale(5),
										paddingHorizontal: scale(10),
										borderRadius: scale(10),
										flexDirection: 'row',
										gap: scale(10)
									}}>
										<Octicons name="check" size={scale(16)} color={Colors.success} />
										<Text style={{ 
											color: Colors.success,
											fontSize: scale(12)
										}}>Верифіковано</Text>
									</View>
								) : (
									<View style={{ 
										backgroundColor: Colors.mDark15,
										paddingVertical: scale(5),
										paddingHorizontal: scale(10),
										borderRadius: scale(10),
										flexDirection: 'row',
										gap: scale(10)
									}}>
										<Octicons name="x" size={scale(16)} color={Colors.mDark} />
										<Text style={{ 
											color: Colors.mDark,
											fontSize: scale(12)
										}}>Не верифіковано</Text>
									</View>
								)}
								{item.isVerified && (
									<View style={{ 
										backgroundColor: '#151515',
										paddingVertical: scale(5),
										paddingHorizontal: scale(10),
										borderRadius: scale(10),
										flexDirection: 'row',
										gap: scale(10)
									}}>
										<Octicons name="package" size={scale(16)} color='rgba(255,255,255,0.7)' />
										<Text style={{ 
											color: 'rgba(255,255,255,0.7)',
											fontSize: scale(12)
										}}>Самовивіз</Text>
									</View>
								)}
							</View>
							{/* <PromoBlock /> */}
							<TopPositionsBlock placeId={item.id} />
							{item.location && (
            		<LocationBlock item={item} />
          		)}
						</View>

						<View
							style={{
								position: 'absolute',
								top: scale(145),
								left: scale(15),
								flexDirection: 'row',
								gap: scale(15),
								zIndex: 2
							}}
						>
							<Image
								source={item.logo? { uri: item.logo} : require('@/assets/images/main/empty_dish_screen.png')}
								resizeMode='cover'
								style={{ height: scale(50), width: scale(50), borderRadius: scale(10)}}
							/>
							<View style={{ justifyContent: 'space-between' }}>
								<Text
									style={{
										color: 'white',
										fontSize: scale(16),
										fontWeight: 'bold'
									}}
								>
									{item.name.length ? item?.name.substring(0, 20) + '...' : item?.name}
								</Text>
							</View>
							<ReviewsBlock item={item} />
						</View>
						{item.location && (
							<DistanceBlock item={item} />
          	)}
					</Pressable>
				</Link>

			)}}
		/>
	)
}

export default RestourantList
