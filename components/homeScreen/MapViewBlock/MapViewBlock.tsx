import { Colors, mapJSON } from '@/constants'
import { useUserLocationStateContext } from '@/context'
import { useNearestPlaces } from '@/services'
import { Octicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { FC, useEffect } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { scale } from 'react-native-size-matters'

const MapViewBlock: FC = () => {
  const { userLocation } = useUserLocationStateContext()
  const {nearestPlacesModels, nearestPlacesOperations} = useNearestPlaces()


  
  useEffect(()=>{
    if(userLocation && userLocation.coords){
      nearestPlacesOperations.getNearest(userLocation?.coords.latitude, userLocation?.coords.longitude, 3000, 30, 0, false, false)
    }
  },[userLocation])

  return (
    <View style={{
      paddingRight: scale(15),
      paddingLeft: scale(20),
      marginTop: scale(15),
      gap: scale(10)
    }}>
      <Text style={{
        color: 'white',
        fontSize: scale(16),
        fontWeight: 'bold',
      }}>Диви на мапі, що є поряд!</Text>
      <TouchableOpacity style={{
        // height: scale(200),
        backgroundColor: Colors.darky,
        padding: scale(5),
        borderRadius: scale(15),
        overflow: 'hidden'
      }}
        onPress={()=>router.push('/(app)/mapViewPlaces')}
      >
        <View style={{
          borderRadius: scale(10),
          overflow: 'hidden',
          height: scale(200)
        }}>
        {userLocation && userLocation.coords && (
          <MapView
          style={{ width: '100%', height: scale(200), justifyContent: 'center' }}
          initialRegion={{
            latitude: Math.round(userLocation?.coords.latitude * 10000)/10000,
            longitude: Math.round(userLocation?.coords.longitude * 10000)/10000,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421}
          }
          rotateEnabled={false}
          scrollEnabled={false}
          minZoomLevel={12}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          showsBuildings
          showsScale={true}
          showsIndoors={true}
          showsMyLocationButton={false}
          customMapStyle={mapJSON}
        >
          <Circle
            center={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude
            }}
            radius={3100}
            strokeWidth={scale(2)}
            strokeColor={Colors.mDark}
            fillColor={Colors.mDark15}
            
          />
 
          
          {nearestPlacesModels.nearestPlaces && nearestPlacesModels.nearestPlaces.length > 0 && (
            nearestPlacesModels.nearestPlaces.map(place => (
              place.location.geolat && place.location.geolng &&
              <Marker
                // tracksViewChanges={false}
                key={place.id}
                coordinate={{
                  latitude: Math.round(place.location.geolat * 10000)/10000, 
                  longitude: Math.round(place.location.geolng * 10000)/10000
                }}
              >
                {place.logo ? (
                    <Image
                      source={{uri: place.logo}}
                      style={{
                        width: scale(20),
                        height: scale(20),
                        borderRadius: scale(15)
                    }}
                  />
                  ) : (
                    <Image
                      source={require('@/assets/images/main/empty_dish.png')}
                      style={{
                        width: scale(20),
                        height: scale(20),
                        borderRadius: scale(15)
                  }}
                />
                  )}
              </Marker>

            ))
          )}
       </MapView>
         )}
        </View>
        <View>
        <View style={{
          padding: scale(10),
          flexDirection: 'row',
          gap: scale(10)
         }}>
          <View style={{
            height: scale(40),
            width: scale(40),
            backgroundColor: Colors.mDark15,
            borderRadius: scale(50),
            alignItems:'center',
            justifyContent: 'center'
          }}>
            <Octicons name="location" size={24} color={Colors.mDark} />
          </View>
          <View style={{
            justifyContent: 'center',
          }}>
            {nearestPlacesModels.nearestPlaces ? (
              <Text style={{
                color:'white',
                fontSize: scale(12)
              }}>Бачу поруч {
                nearestPlacesModels.nearestPlaces.length === 1 ? `${nearestPlacesModels.nearestPlaces.length} заклад` : `${nearestPlacesModels.nearestPlaces.length} закладів`
              }</Text>
            ) : (
              <Text style={{
                color:'white',
                fontSize: scale(12)
              }}>Не бачу поряд закладів</Text>
            )}
            {nearestPlacesModels.nearestPlaces ? (
              <Text style={{
                color:'rgba(255,255,255,0.5)',
                fontSize: scale(12)
              }}>Натисни щоб побачити всі</Text>
            ) : (
              <Text style={{
                color:'rgba(255,255,255,0.5)',
                fontSize: scale(12)
              }}>Натисни, щоб шукати ще</Text>
            )}
            
          </View>
         </View>
         <View style={{
          paddingHorizontal: scale(15),
          paddingBottom: scale(15)
         }}>
          <Text style={{
              color:'rgba(255,255,255,0.5)',
              fontSize: scale(12)
            }}>Якщо так трапилось, що через їбаних кацапів ти без світла – подивись на мапі, які заклади працюють без світла і можуть зарядити твої пристрої. В деяких ти можеш працювати з ноутбуком. </Text>
         </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default MapViewBlock