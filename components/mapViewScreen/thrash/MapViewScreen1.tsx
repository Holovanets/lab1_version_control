import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { Marker, Region } from 'react-native-maps'
import ClusteredMapView from './ClusteredMapView'
import { useUserLocationStateContext } from '@/context'
import { useNearestPlaces } from '@/services/index'



const getRandomLatitude = (min = 48, max = 56) => {
  return Math.random() * (max - min) + min
}

const getRandomLongitude = (min = 14, max = 24) => {
  return Math.random() * (max - min) + min
}

const getRegionForZoom = (lat: number, lon: number, zoom: number) => {
  const distanceDelta = Math.exp(Math.log(360) - zoom * Math.LN2)
  const { width, height } = Dimensions.get('window')
  const aspectRatio = width / height
  return {
    latitude: lat,
    longitude: lon,
    latitudeDelta: distanceDelta * aspectRatio,
    longitudeDelta: distanceDelta,
  }
}

const getZoomFromRegion = (region: Region) => {
  return Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)
}

interface Markers {
  id: number
  latitude: number
  longitude: number
}

const MapViewScreen: FC = () => {

	const { userLocation } = useUserLocationStateContext()
  const {nearestPlacesModels, nearestPlacesOperations} = useNearestPlaces()

  const map = useRef(null)

  const [zoom, setZoom] = useState<number>(18)
  const [markers, setMarkers] = useState<Markers[]>([
    { id: 0, latitude: 53.91326738786109, longitude: 27.523712915343737 },
  ])
  const [region, setRegion] = useState<Region>({
    latitude: 46.37526738786109,
    longitude: 30.721712915343737,
    latitudeDelta: 1.5,
    longitudeDelta: 1.5,
  })

  const generateMarkers = useCallback((lat: number, long: number) => {
    const markersArray = []

    for (let i = 0; i < 50; i++) {
      markersArray.push({
        id: i,
        latitude: getRandomLatitude(lat - 0.05, lat + 0.05),
        longitude: getRandomLongitude(long - 0.05, long + 0.05),
      })
    }
    setMarkers(markersArray)
  }, [])


 
  const onRegionChangeComplete = (newRegion: Region) => {
    setZoom(getZoomFromRegion(newRegion))
    setRegion(newRegion)
  }

  
  useEffect(()=>{
    const getSpots = () =>{
			if(userLocation && userLocation.coords){
				nearestPlacesOperations.getNearest(userLocation?.coords.latitude, userLocation?.coords.longitude, 3000, 30, 0, false, false)	
				// setSearchCircleCenter({latitude: userLocation?.coords.latitude, longitude: userLocation?.coords.longitude, latitudeDelta: 1.5, longitudeDelta: 1.5})
			}
			return
		}
		getSpots()

		if(nearestPlacesModels.nearestPlaces){
			setMarkers(
				nearestPlacesModels.nearestPlaces.map(place =>(
					{
						id: place.id,
						logo: place.logo,
						latitude: place.location.geolat,
						longitude: place.location.geolng
					}
				))
			)
			
		}
		return () => {
			getSpots()
		}
		
  },[])
  useEffect(() => {
    // generateMarkers(region.latitude, region.longitude)
    if(nearestPlacesModels.nearestPlaces){
      setMarkers(nearestPlacesModels.nearestPlaces?.map(place =>(
        {
          id: place.id,
          latitude: place.location.geolat,
          longitude: place.location.geolng
        }
      )))
    }
  }, [nearestPlacesModels.nearestPlaces])


  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <ClusteredMapView
        clusterColor="red"
        ref={map}
        mapType="hybrid"
        style={{
          flex: 1, width: '100%', height: '100%'
        }}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}>
        {markers.map((item) => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
          />
        ))}
      </ClusteredMapView>
      
    </View>
  )
}

export default MapViewScreen