import { FC, useEffect } from 'react'
import { Animated, Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { useLoverDishes } from './useLoverDishes'
import { scale } from 'react-native-size-matters'
import { Colors, SCREEN_WIDTH } from '@/constants'
import { Link } from 'expo-router'
import { Separator } from '@/atoms'
import {View as MView} from 'moti'
import LoverDishItem from './LoverDishItem'


interface IProps{
  spotId: number
  spotName: string
}
const LoverDishesBlock: FC<IProps> = ({spotId, spotName}) => {
  const CARD_WIDTH = scale((SCREEN_WIDTH - (SCREEN_WIDTH - 310))/2)
	const {loverDishesModels, loverDishesOperations} = useLoverDishes(spotId)
	useEffect(() => {
    loverDishesOperations.getDishes()
  }, [spotId])
  
  

if(loverDishesModels.isLoverDishesLoading){
  return null
}else if(loverDishesModels.loverDishes?.length === 0 || !loverDishesModels.loverDishes){
  return null
}


	return (
    <View style={{ 
      marginTop: scale(30)
    }}>
      <Text style={{
        color: 'white',
        fontSize: scale(16),
        fontWeight: 'bold',
        paddingLeft: scale(20)
      }}>
        Ласунки з їжлисту
      </Text>
      		<Animated.FlatList
			showsHorizontalScrollIndicator={false}
			overScrollMode='never'
			data={loverDishesModels.loverDishes}
			keyExtractor={item => String(item.id)}
			horizontal
			pagingEnabled 
      initialNumToRender={3}
			snapToInterval={CARD_WIDTH + scale(5) * 2}
			decelerationRate='fast'
      style={{marginTop: scale(15)}}
      ListHeaderComponent={<Separator width={scale(10)}/>}
			renderItem={({ item, index }) => {

			return (
					<LoverDishItem {...{CARD_WIDTH, spotId, spotName}} item={item}/>
			)}}
		/>
    </View>
	)
}

export default LoverDishesBlock