import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Image, Text, View, SectionList, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native'
import menu from './dataSET/menu'
import { Colors } from '@/constants'
import PlaceDish from './PlaceDish'
import { usePlaceMenu } from './usePlaceMenu'
import { scale } from 'react-native-size-matters'
import PlaceCategory from './PlaceCategory'
import { Feather, Octicons } from '@expo/vector-icons'
import { FlatList } from 'react-native-gesture-handler'
import { Separator } from '@/atoms'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import PlaceCategoriesModal from './modals/PlaceCategoriesModal'

interface IProps {
	type: number
	id: number
	spotName: string
}

const PlaceMenu: FC<IProps> = ({ type, id,spotName }) => {
	const { models, operations } = usePlaceMenu(id)
	const [choosedCategory, setChoosedCategory] = useState(0)
	useEffect(()=>{
		operations.getCategories()			
	},[id])
	useEffect(()=>{
		console.log('cetegories setted');
		if(models.placeCategories && models.placeCategories[0]){
			console.log('initial category setted');
			setChoosedCategory(models.placeCategories[0].id)
			
		}	
	},[models.placeCategories])

	const catModalRef = useRef<BottomSheetModal>(null)
	const openCatModal = useCallback(() => {
		catModalRef.current?.present()
	}, [])

	return (
		<View style={{ gap: scale(10), marginTop: scale(15)}}>
			{models.placeCategories && models.placeCategories.length > 0 ? (
				<View style={{
					
				}}>
					<View style={{
						flexDirection: 'row',
					}}>
						<TouchableOpacity
						onPress={()=>openCatModal()}
						style={{
									backgroundColor: '#151515',
									width: scale(35),
									height: scale(35),
									marginLeft: scale(15),
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: scale(10)
								}}>
									<Octicons name="multi-select" size={scale(14)} color="white" />
						</TouchableOpacity>
						<View style={{
							height: scale(35),
							width: scale(2),
							backgroundColor: '#151515',
							marginLeft: scale(15),
							borderRadius: scale(2)
						}}>

						</View>
						<FlatList
								data={models.placeCategories}
								keyExtractor={item=> item.id.toString()}
								horizontal
								showsHorizontalScrollIndicator={false}
								overScrollMode='never'
								// ListHeaderComponent={}
								renderItem={({item, index})=>{
									return(
										<Pressable key={item.id}
										onPress={()=>setChoosedCategory(item.id)}
										style={{
											marginLeft: scale(15),
										}}>
											<View style={[
												item.id === choosedCategory ? {backgroundColor: Colors.mDark} : {backgroundColor: Colors.mDark15}
												,{
												borderRadius: scale(10),
												paddingVertical: scale(8),
												paddingHorizontal: scale(20)
											}]}>
												<Text style={{
													color:'white',
													fontSize: scale(14)
												}}>{item.name}</Text>
											</View>
										</Pressable>
										
									)
								}}
							/>
					</View>

						
					
					{models.loadingCategories 
					? <ActivityIndicator style={{marginTop: scale(30)}} color={Colors.mDark} size="large"></ActivityIndicator>
					:(
							<PlaceCategory spotName={spotName} id={choosedCategory} placeId={id}/>
					) }
				</View>
			) : (
				<View style={{
					paddingHorizontal: scale(15)
				}}>
					<View style={{
					backgroundColor: Colors.mDark15,
					width: '100%',
					padding: scale(15),
					borderRadius: scale(15),
					flexDirection: 'row',
					alignItems: 'center',
					gap: scale(15)
				}}>
					{models.loadingCategories ? (
						<Feather name="download-cloud" size={24} color={Colors.mDark} />
					) : (
						<Feather name="cloud-off" size={24} color={Colors.mDark} />
					)}
						<Text style={{
							color: 'white',
							fontSize: scale(14)
						}}>{models.loadingCategories ? 'Завантаження' : 'Заклад не створив меню :('}</Text>
						
					</View>
				</View>
			)}
			<PlaceCategoriesModal reference={catModalRef} categories={models.placeCategories} setCategory={setChoosedCategory}/>
		</View>
	)
}

export default PlaceMenu
