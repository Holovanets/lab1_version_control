import { Separator } from '@/atoms'
import { Colors, SCREEN_WIDTH } from '@/constants'
import { SpotItem } from '@/services/useFeed'
import { Link } from 'expo-router'
import { FC, useEffect } from 'react'
import { Animated, Image, Pressable, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { usePlace } from '@/services/index'





interface IProps {
  activePlaceId: number
}

const MapViewPlacesList: FC<IProps> = ({activePlaceId}) => {
  const {spotModels, spotOperations} = usePlace(activePlaceId, false, false, true)

  useEffect(()=>{
    if(activePlaceId && activePlaceId !== 0){
      spotOperations.getThisSpot()
    }
  },[activePlaceId])

  if(!spotModels.spot || activePlaceId === 0) return
  else
  return (
    <View style={{
      paddingHorizontal: scale(15)
    }}>
      <Link
            href={{
              pathname: '/(app)/place/[id]',
              params: { id: spotModels.spot.id }
            }}
            asChild
          >
            <Pressable
              android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
              style={{
                width: '100%',
                borderRadius: scale(15),
                backgroundColor: Colors.darky,
                overflow: 'hidden',
                flexDirection: 'row',
                gap:scale(15),
                
              }}
            >
  
                <Image
                  source={spotModels.spot.logo? { uri: spotModels.spot.logo} : require('@/assets/images/main/empty_dish.png')}
                  resizeMode='cover'
                  style={{
                    height: scale(100),
                    width: scale(100),
                    backgroundColor: '#151515'

                  }}
                />
                <View style={{
                  justifyContent: 'space-between',
                  paddingVertical:scale(15)
                }}>
                  {/* {spotModels.spot.location && (
                    <DistanceBlock item={item} />
                  )} */}
                  <Text style={{
                    color:'white',
                    fontSize: scale(14),
                    fontWeight:'bold'
                  }}>{spotModels.spot.name.length > 20 ? spotModels.spot.name.substring(0,20) + '...' : spotModels.spot.name}</Text>
                  <Text style={{
                    color:'white',
                    fontSize: scale(12),
                  }}>
                    {spotModels.spot.location.address  ? (
                      spotModels.spot.location.address.length > 20 ? spotModels.spot.location.address.substring(0,20) + '...' : spotModels.spot.location.address
                    ):
                    (
                      null
                    )}
                  </Text>
                </View>
            </Pressable>
          </Link>
  

      </View>
    )

			
}

export default MapViewPlacesList