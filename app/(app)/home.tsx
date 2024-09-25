import { View, Animated, Text, Pressable, ActivityIndicator } from 'react-native'
import * as Linking from 'expo-linking';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import {
	CashBack,
	CustomHeader,
	FeedBlock,
	HomeContent,
	HomeInfoModal,
	NearYouBlock,
} from '@/components'

import { scale } from 'react-native-size-matters'
import { Colors, Sizes } from '@/constants'
import { useCart, useUserAdressStateContext, useUserLocationStateContext } from '@/context'
import { Redirect, SplashScreen, router } from 'expo-router'
import { SpotItem, formatPrice, getItemInfo, useDeepLinkHandler, useFeed } from '@/services'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Separator } from '@/atoms'
const Home = () => {

	useDeepLinkHandler()
	useEffect(()=>{
		const screen = async ()=>{
			await SplashScreen.hideAsync()
		}
		screen()
	},[])


	const scrollY = useRef(new Animated.Value(0)).current
	const insets = useSafeAreaInsets();
	const { cart } = useCart(); // Получаем объект cart из контекста

	const [price, setPrice] = useState(0)

	const {itemOperations, itemModels} = getItemInfo()
	const [isPriceLoading, setIsPriceLoading] = useState(true)

	useEffect(() => {
		const calculateTotalCost = async () => {
			let totalCost = 0;
			setIsPriceLoading(true);  // Предполагаем, что вы имеете такую функцию для управления UI
		
			try {
				for (const cartItem of cart.cartItems) {
					const dish = await itemOperations.getItemReturn(cart.spotId, cartItem.id);
					if (dish) {
						// Считаем стоимость основного блюда
						totalCost += (dish.price ?? 0) * cartItem.amount;
		
						// Считаем стоимость добавок
						for (const group of cartItem.groups) {
							for (const additiveId of group.selectedAdditives) {
								const dishGroup = dish.groups.find(g => g.id === group.id); // Найдем соответствующую группу в данных блюда
								if (dishGroup) {
									const additive = dishGroup.additives.find(a => a.id === additiveId); // Найдем добавку
									if (additive) {
										// Добавим стоимость добавки, умноженную на количество блюд
										totalCost += (additive.price ?? 0) * cartItem.amount;
									}
								}
							}
						}
					}
				}
				setPrice(totalCost);
			} catch (error) {
				console.error("Error calculating total cost", error);
			} finally {
				setIsPriceLoading(false);  // Обновим состояние загрузки
			}
		};
		calculateTotalCost()
  }, [cart]);



	const infoModalRef = useRef<BottomSheetModal>(null)
	const openInfoModal = useCallback(() => {
		infoModalRef.current?.present()
	}, [])

	const {feedModels, feedOperations} = useFeed()
	const [currentPlacesPage, setCurrentPlacesPage] = useState(0)
	const [feedPlaces, setFeedPlaces] = useState<SpotItem[]>([])
	const {userLocation} = useUserLocationStateContext()
	const [finishList, setFinishList] = useState(false)
	useEffect(() => {
		if(!finishList) feedOperations.getNearest(currentPlacesPage).then(newSpots => {
			setFeedPlaces(prevPlaces => [...prevPlaces, ...newSpots]);
			if(newSpots.length === 0) setFinishList(true)
		});
	}, [currentPlacesPage]);
	useEffect(() =>{
		setCurrentPlacesPage(0)
	},[userLocation])
	

const Loader = () =>{
	return(
		<View style={{ 
			width: '100%',
			paddingVertical: 25,
			justifyContent: 'center',
			alignItems: 'center'
		}} >
			{feedModels.isLoadingNearest && !finishList && <ActivityIndicator size='large' color={Colors.mDark}/>}
			{finishList && (
				<View style={{
					width: '100%',
					padding: scale(15),
					alignItems: 'center',
					justifyContent: 'center'
				}}>
					<Text style={{
						color: 'white',
						fontSize: scale(14)
					}}>
						А всьо...
					</Text>
				</View>
			)}
			<View style={{
				height: 55,
			}}></View>
		</View>
	)
}
	const loadMorePlaces = () =>{
		console.log('load more');
		if(!finishList) setCurrentPlacesPage(currentPlacesPage+1)
	}

		return (
			<LinearGradient
				style={{ flex: 1, paddingTop: scale(15) }}
				colors={['#21001C', '#49000F']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
			>
				<View style={{ flex: 1, }}>
					<CustomHeader {...{ scrollY, openInfoModal }} />
					
					<Animated.FlatList
								onScroll={Animated.event(
									[{ nativeEvent: { contentOffset: { y: scrollY } } }],
									{ useNativeDriver: true }
								)}
								data={feedPlaces}
								keyExtractor={item => item?.id?.toString()}
								ListHeaderComponent={<HomeContent/>}
								ItemSeparatorComponent={()=> <Separator height={scale(10)}/>}
								ListFooterComponent={Loader()}
								onEndReached={loadMorePlaces}
								onEndReachedThreshold={0.5}
								initialNumToRender={3}
								maxToRenderPerBatch={6}
								windowSize={4}
								renderItem={({item}) =>{
									return(
										<FeedBlock item={item}/>
									)
								}}
					/>
	
					{cart.cartItems.length !== 0 ? (
										<View
										style={{
											position: 'absolute',
											bottom: 0,
											left: 0,
											right: 0,
											padding: scale(10),
											paddingBottom: scale(10) + insets.bottom,
											backgroundColor: Colors.darky,
											borderTopLeftRadius: scale(20),
											borderTopRightRadius: scale(20),
										}}>
											<Pressable
											android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
											onPress={()=> router.push('/cart')} 
											style={{
											paddingVertical: scale(15),
											paddingHorizontal: scale(15),
											borderRadius: scale(15),
											backgroundColor: Colors.mDark,
											justifyContent: 'space-between',
											alignItems: 'center',
											flexDirection: 'row'
					
										}}>
											<Text style={{color:'white', fontSize: scale(14)}}>
												{`${cart.spotName.length > 26 ? cart.spotName.substring(0,26) + '...' : cart.spotName} `}
											</Text>
											<Text style={{color: 'rgba(255,255,255,0.5)', fontSize: scale(14)}}>
												{`${isPriceLoading? '...' : formatPrice(price)}`}
											</Text>
										</Pressable>
										</View>
					): (
						null
					)}
	
				</View>
				<HomeInfoModal reference={infoModalRef}/>
			</LinearGradient>
		)
	
}
export default Home
