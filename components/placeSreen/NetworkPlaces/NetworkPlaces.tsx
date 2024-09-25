import { FC, useEffect, useRef, useState } from 'react'
import { Animated, Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { useNearYou } from './useNearYou'
import { scale } from 'react-native-size-matters'
import { Colors, SCREEN_WIDTH } from '@/constants'
import { Link } from 'expo-router'
import { useUserLocationStateContext } from '@/context'
import DistanceBlock from './DistanceBlock'
import { Separator } from '@/atoms'
import {View as MView} from 'moti'


interface IProps{
  orgId: number
}
const NetworkPlaces: FC<IProps> = ({orgId}) => {
  const CARD_WIDTH = scale(SCREEN_WIDTH - (SCREEN_WIDTH - 310))
  const {userLocation} = useUserLocationStateContext()
	const {models, operations} = useNearYou(orgId)
	useEffect(() => {
    console.log('orgID:' ,orgId);
    if(orgId){
      
      operations.getNearest()
    }
	}, [userLocation,orgId])

if(models.isLoadingNearYou && orgId){
  const size = 200
  const INDICATOR_SIZE = size * 0.4;
  const thumbHeight = 20;

  return(
    <View style={{ 
      marginTop: scale(30),
      gap: scale(10)
    }}>
      <Text style={{
        color: 'white',
        fontSize: scale(18),
        fontWeight: 'bold',
        paddingLeft: scale(20)
      }}>
        Заклади мережі
      </Text>
        <View style={{
          borderRadius: scale(20),
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
      </View>
  )
}else if(models.nearYouSpots?.length === 0 || !models.nearYouSpots || !orgId){
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
        Заклади мережі
      </Text>
      		<Animated.FlatList
			showsHorizontalScrollIndicator={false}
			overScrollMode='never'
			data={models.nearYouSpots}
			keyExtractor={item => item.id.toString()}
			horizontal
			pagingEnabled 
      initialNumToRender={3}
			snapToInterval={CARD_WIDTH + scale(5) * 2}
			decelerationRate='fast'
      style={{marginTop: scale(15)}}
      ListHeaderComponent={<Separator width={scale(10)}/>}
			renderItem={({ item, index }) => {

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
            android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
						style={{
							width: CARD_WIDTH,
							borderRadius: scale(20),
							backgroundColor: Colors.mDark15,
							overflow: 'hidden',
							marginHorizontal: scale(5),
              padding: scale(15),
              flexDirection: 'row',
              gap:scale(15),
              
						}}
					>

							<Image
								source={item.logo? { uri: item.logo} : require('@/assets/images/main/empty_dish.png')}
								resizeMode='cover'
								style={{ height: scale(75), width: scale(75), borderRadius: scale(10)}}
							/>
              <View style={{
                justifyContent: 'space-between'
              }}>
                <DistanceBlock item={item}/>
                <Text style={{
                  color:'white',
                  fontSize: scale(14),
                  fontWeight:'bold'
                }}>{item.name.length > 20 ? item.name.substring(0,20) + '...' : item.name}</Text>
                <Text style={{
                  color:'white',
                  fontSize: scale(12),
                }}>
                  {item.location.address && item.location.address.length > 20 ? item.location.address.substring(0,20) + '...' : item.location.address}
                </Text>
              </View>
					</Pressable>
				</Link>

			)}}
		/>
    </View>
	)
}

export default NetworkPlaces