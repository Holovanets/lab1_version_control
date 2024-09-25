import { FC, RefObject } from 'react'
import { Pressable, Text, View } from 'react-native'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { Colors, mapJSON } from '@/constants'
import { CustomBackdrop, CustomBackground } from '@/atoms'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { scale } from 'react-native-size-matters'
import { Linking } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HorizontalLinks from './HorizontalLinks'

interface IModal {
	reference: RefObject<BottomSheetModal>
  placeLat: number
  placeLng: number
  placeName: string
  placeCity: string
  placeAdress: string
  placeSocials?: {
    type: string
    link: string
    name?: string | null | undefined
  }[]
}

const openGoogleMaps = (lat: number, lng: number) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
};
const PlaceInfoModal: FC<IModal> = ({reference, placeLat, placeLng, placeName, placeCity, placeAdress, placeSocials}) => {

  const handleClosePress = () => reference?.current?.close()
  return (
    		<BottomSheetModal
			backdropComponent={props => <CustomBackdrop {...props} reference={reference} />}
			backgroundComponent={props => <CustomBackground {...props} />}
			snapPoints={['80%']}
			backgroundStyle={{
				borderTopLeftRadius: scale(20),
				borderTopRightRadius: scale(20),
        backgroundColor: Colors.darky
			}}
			handleIndicatorStyle={{ backgroundColor: Colors.mDark }}
			index={0}
			ref={reference}
		>
			<BottomSheetScrollView>
        <View >
       
      <View style={{
        backgroundColor: '#151515',
        borderRadius: scale(15),
        marginHorizontal: scale(15),
        // marginTop: scale(5),
        overflow: 'hidden',
      }}>
      <MapView
				style={{ width: '100%', height: scale(200), justifyContent: 'center' }}
				initialRegion={{
          latitude: Math.round(placeLat * 10000)/10000,
          longitude: Math.round(placeLng * 10000)/10000,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421}
        }
        rotateEnabled={false}
        scrollEnabled={false}
        minZoomLevel={16}
				provider={PROVIDER_GOOGLE}
        zoomControlEnabled
        zoomEnabled
				showsUserLocation
				showsBuildings
				showsScale={true}
				showsIndoors={true}
				showsMyLocationButton={false}
        customMapStyle={mapJSON}
			>
        <Marker
        title={'Escobar'}
        description={'Escobar grill cafe'}
        coordinate={{
          latitude: Math.round(placeLat * 10000)/10000,
          longitude: Math.round(placeLng * 10000)/10000,
        }}
          // image={require('@/assets/images/main/place_map_pointer.png')}
        />
      </MapView>
          <View style={{paddingHorizontal:scale(15), paddingVertical: scale(15), backgroundColor: '#151515', borderBottomLeftRadius: scale(20),borderBottomRightRadius: scale(20)}}>
          <Text style={{color: 'white', fontSize: scale(18), fontWeight: 'bold'}}>{placeName}</Text>
          <Text style={{color: 'white', fontSize: scale(14), marginTop: scale(5)}}>{placeCity} {placeAdress}</Text>
          <Pressable
          onPress={()=>openGoogleMaps(placeLat, placeLng)}
           style={{width: '100%', paddingVertical: scale(15), backgroundColor: Colors.mDark, justifyContent: 'center', alignItems: 'center', marginTop: scale(15), borderRadius: scale(10)}}>
            <Text style={{color: 'white', fontSize: scale(14)}}>Відкрити на мапі</Text>
          </Pressable>
          </View>
      </View>

      <View style={{
        
      }}>

      </View>
         <HorizontalLinks placeSocials={placeSocials}/>
        </View>
        </BottomSheetScrollView>
        </BottomSheetModal>
  )
}

export default PlaceInfoModal