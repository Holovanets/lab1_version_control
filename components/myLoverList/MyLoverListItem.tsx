import { FC, useEffect } from 'react'
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native'
import { LoverResponse, TLikedMenu } from './useMyLoverDishes'
import { usePlace } from '@/services/index'
import { Colors, SCREEN_WIDTH } from '@/constants'
import { Link } from 'expo-router'
import { scale } from 'react-native-size-matters'
import { Octicons } from '@expo/vector-icons'
import { Separator } from '@/atoms'
import MyLoverListItemDish from './MyLoverListItemDish'


interface IProps {
  spotDishes: LoverResponse
}
const MyLoverListItem: FC<IProps> = ({spotDishes}) => {
  const {spotModels, spotOperations} = usePlace(spotDishes.spotId)
  const CARD_WIDTH = scale((SCREEN_WIDTH - (SCREEN_WIDTH - 310))/3.2)
  useEffect(()=>{
    spotOperations.getThisSpot()
  },[])
  return (
    <View style={{
    }} >
        <View style={{
          width: '100%',
          paddingHorizontal: scale(15),
        }}>
          <Link
            href={{
              pathname: '/(app)/place/[id]',
              params: { id: spotDishes.spotId}
            }}
            asChild
          >
         {
          spotModels.spot ? (
            <TouchableOpacity style={{
              flexDirection: 'row',
              gap: scale(15)
            }}>
              <Image
                source={spotModels.spot.logo? { uri: spotModels.spot.logo} : require('@/assets/images/main/empty_dish.png')}
                resizeMode='cover'
                style={{ height: scale(50), width: scale(50), borderRadius: scale(10), backgroundColor: '#151515'}}
              />
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <View style={{
                  justifyContent: 'center'
                }}>
                  <Text style={{
                    color:'white',
                    fontSize: scale(14),
                    width: SCREEN_WIDTH - scale(125),
                    fontWeight: 'bold'
                  }}>{spotModels.spot.name}</Text>
                  <Text style={{
                    color:'rgba(255,255,255,0.5)',
                    fontSize: scale(12),
                    width: SCREEN_WIDTH - scale(125)
                  }}>{spotModels.spot.slug ? spotModels.spot.slug : ''}</Text>
                </View>
                <View style={{
                  width: scale(30),
                  height: scale(30),
                  backgroundColor: Colors.mDark15,
                  borderRadius: scale(10),
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Octicons name="chevron-right" size={24} color={Colors.mDark} />
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={{
              width: '100%',
              height: scale(50),
              backgroundColor: Colors.mDark15,
              borderRadius: scale(10)
            }}>

            </View>
          )
         }
        </Link>
      </View>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        overScrollMode='never'
        data={spotDishes.dishes}
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
            <MyLoverListItemDish {...{CARD_WIDTH}} spotId={spotDishes.spotId} item={item}/>
        )}}
      />


    </View>
  )
}

export default MyLoverListItem