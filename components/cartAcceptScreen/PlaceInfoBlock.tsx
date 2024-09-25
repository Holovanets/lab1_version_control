import { Colors, mapJSON } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Image, Text, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { scale } from 'react-native-size-matters'

interface IProps{
  spot: any
  spotName: string
}

const PlaceInfoBlock: FC<IProps> = ({spot, spotName}) => {
  return (
    <View style={{
      gap:scale(5)
    }}>
        <View style={{
              borderRadius: scale(5),
              overflow: 'hidden',
              backgroundColor: Colors.darky,
              height: scale(120),
            }}>
                {spot && spot.location && (
                    <MapView
			          	style={{ width: '100%', height: scale(120), justifyContent: 'center' }}
			          	initialRegion={{
                    latitude: Math.round(spot?.location.geolat * 10000)/10000,
                    longitude: Math.round(spot?.location.geolng * 10000)/10000,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421}
                  }
                  rotateEnabled={false}
                  scrollEnabled={false}
                  minZoomLevel={15}
			          	provider={PROVIDER_GOOGLE}
			          	showsUserLocation
			          	showsBuildings
			          	showsScale={true}
			          	showsIndoors={true}
			          	showsMyLocationButton={false}
                  customMapStyle={mapJSON}
			          >
                  <Marker
                  title={spotName || '...'}
                  // description={'Escobar grill cafe'}
                  coordinate={{
                    latitude: Math.round(spot?.location.geolat * 10000)/10000,
                    longitude: Math.round(spot?.location.geolng * 10000)/10000,
                  }}
                  />
                </MapView>
                  )}
                  </View>
                  <View style={{
                    borderRadius: scale(5),
                    padding: scale(15),
                    backgroundColor: '#151515',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: scale(10)
                  }}>
                    {spot?.logo ? (
                    <Image
                    source={{uri: spot.logo}}
                    style={{
                      width: scale(50),
                      height: scale(50),
                      borderRadius: scale(5)
                    }}
                  />
                  ) : (
                    <Image
                  source={require('@/assets/images/main/empty_dish.png')}
                  style={{
                    width: scale(50),
                    height: scale(50),
                    borderRadius: scale(5)
                  }}
                />
                  )}
                    <Text style={{color: 'white', fontSize: scale(14),fontWeight: 'bold', width: scale(180)}}>{
                      (spotName ? (spotName.length > 25 ? spotName.substring(0,25) + '...' : spotName) : '...')
                    }</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#151515',
                      borderRadius: scale(5),
                      flexDirection: 'row',
                      gap: scale(10),
                      alignItems: 'center',
                      padding: scale(15)
                    }}
                  >
				  	      <Ionicons name='locate' size={scale(24)} color={Colors.mDark} />
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: scale(14),
                        fontWeight: 'bold'
                      }}
                    >
                      {spot && spot.location.city? spot.location.city : '...'}
                    </Text>
                    <Text
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: scale(12)
                      }}
                    >
                      {spot && spot.location.address? spot.location.address : '...'}
                    </Text>
                  </View>
          </View>
    </View>
  )
}

export default PlaceInfoBlock