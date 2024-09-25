import { Colors } from '@/constants'
import { SpotItem } from '@/services'
import { Octicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { FC, MutableRefObject } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import MapViewPlaceListItemReviewsBlock from './MapViewPlaceListItemReviewsBlock'
import MapViewPlacesListGoToMapBlock from './MapViewPlacesListGoToMapBlock'
import MapView from 'react-native-maps'
import MapViewMarkerElectricity from './MapViewMarkerElectricity'
import MapViewPlacesListItemElectricity from './MapViewPlacesListItemElectricity'

interface IProps {
  goToMap: (lat: number, lng: number) => void
  place: SpotItem
}

const MapViewPlacesListItem: FC<IProps> = ({place, goToMap}) => {

  return (
    <View  style={{
      width: '100%',
      backgroundColor: '#151515',
      borderRadius: scale(15),
      overflow: 'hidden',
      marginTop: scale(15)
    }}>
    <Link
      href={{
        pathname: '/(app)/place/[id]',
        params: { id: place.id }
      }}
      key={place.id}
      asChild
    >
      <TouchableOpacity
        style={{
          width: '100%',
          borderRadius: scale(15),
          // backgroundColor: Colors.darky,
          overflow: 'hidden',
          alignItems: 'center',
        }}
      >
        <Image
          source={ place.poster? { uri: place.poster } : require('@/assets/images/main/empty_dish_screen.png')}
          resizeMode='cover'
          resizeMethod='resize'
          style={{ 
            height: scale(130),
            width: '100%',
          }}
          
        />
        <LinearGradient
          style={{
            position: 'absolute',
            zIndex: 1,
            width: '100%',
            height: scale(130)
          }}
          colors={['rgba(0,0,0,0)', 'rgba(07,07,07,.3)']}
        />
        <View
          style={{
            width: '100%',
            // backgroundColor: Colors.darky,
            paddingTop: scale(35),
          }}
        >
          <View style={{
								flexDirection: 'row',
								gap: scale(10),
								paddingHorizontal: scale(15)
							}}>
								{place.isVerified ? (
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
								{place.isVerified && (
									<View style={{ 
										backgroundColor: Colors.darky,
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

              <MapViewPlacesListItemElectricity electricity={place.electricity}/>

              <Text style={{
                marginTop: scale(15),
                color: 'rgba(255,255,255,0.7)',
                fontSize: scale(12),
                paddingHorizontal: scale(15),
                marginBottom: scale(10),
              }}>{place.description}</Text>
              {/* {place.location && (
                <LocationBlock item={item} />
              )} */}
        </View>
        
          
        <View
          style={{
            position: 'absolute',
            top: scale(105),
            left: scale(15),
            flexDirection: 'row',
            gap: scale(15),
            zIndex: 2
          }}
        >
          <Image
            source={place.logo? { uri: place.logo} : require('@/assets/images/main/empty_dish.png')}
            resizeMode='cover'
            style={{ height: scale(50), width: scale(50), borderRadius: scale(10), backgroundColor: Colors.darky50}}
          />
          <View style={{ justifyContent: 'space-between' }}>
            <Text
              style={{
                color: 'white',
                fontSize: scale(16),
                fontWeight: 'bold'
              }}
            >
              {place.name && place.name.length > 25? place?.name.substring(0, 22) + '...' : place?.name}
            </Text>
          </View>
          <MapViewPlaceListItemReviewsBlock item={place} />
        </View>
        {place.location && (
          <MapViewPlacesListGoToMapBlock place={place} goToMap={goToMap} />
        )}
        
      </TouchableOpacity>
    </Link>
    </View>
  )
}

export default MapViewPlacesListItem