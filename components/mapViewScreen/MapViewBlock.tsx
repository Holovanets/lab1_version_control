import { Colors, SCREEN_WIDTH, mapJSON } from '@/constants'
import { FC, ReactNode, useEffect, useState, useRef, MutableRefObject } from 'react'
import { Image, LayoutAnimation, Platform, Text, TouchableOpacity, UIManager, View } from 'react-native'
import MapView, { Circle, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { scale } from 'react-native-size-matters'
//@ts-ignore
import SuperCluster, { ClusterFeature, PointFeature } from 'supercluster'
import { returnMapZoom } from './thrash/helpers'
import AnimatedCircle from './AnimatedCircle'
import { Ionicons, Octicons } from '@expo/vector-icons'
import MapViewMarkerElectricity from './MapViewMarkerElectricity'
import MapViewMarkerElectricityPreviewIcons from './MapViewMarkerElectricityPreviewIcons'
interface Cluster {
  type: 'Feature';
  properties: {
    cluster: boolean; // true, указывает что это кластер
    cluster_id: number; // уникальный идентификатор кластера
    point_count: number; // количество элементов в кластере
    point_count_abbreviated: number | string; // сокращенное отображение количества элементов, например "1K" для 1000
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // Долгота и широта кластера
  };
  id: number
}

interface Markers {
  id: number
  logo: string | undefined
  latitude: number
  longitude: number
  electricity: {
    spotId: number,
    status: number | undefined,
    share: number | undefined,
  }| null
}
interface IProps  {
  mapRef: MutableRefObject<MapView | undefined>
  onRegionChangeComplete: (region: Region) => void
  starterRegion: () => Region 
  searchCircleCenter: Region
  markers : Markers[] | undefined
  mapCenter: Region
  zoom: number
  setActivePlaceId: (id : number) => void
  activePlaceId: number
}
type ClusterOrPoint = PointFeature<any> | ClusterFeature<any>;




const ANIMATION_DURATION = 1000; // Длительность анимации в миллисекундах

const easeInOutQuad = (t:number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);


const MapViewBlock: FC<IProps> = ({
  mapRef,
  onRegionChangeComplete,
  starterRegion,
  searchCircleCenter,
  markers,
  mapCenter,
  zoom,
  setActivePlaceId,
  activePlaceId
}) => {

  const [clusters, setClusters] = useState<ClusterOrPoint[]>([]);
  const [superCluster, setSuperCluster] = useState<SuperCluster | null>(null)


  const [currentMapCenter, setCurrentMapCenter] = useState(searchCircleCenter)
  const [circleCenter, setCircleCenter] = useState(searchCircleCenter);

useEffect(() => {
  if(markers){
    const points = markers.map(marker => ({
      type: 'Feature',
      geometry: {
          type: 'Point',
          coordinates: [marker.longitude, marker.latitude]
      },
      properties: { cluster: false, markerId: marker.id, electricity: marker.electricity },
  }));
  const clusterIndex = new SuperCluster({
    radius: 40,
    maxZoom: 16,
    minZoom: 12,
    extent: 256,
    nodeSize: 64,
});
//@ts-ignore
clusterIndex.load(points);

  const bbox = calculateBBox((mapCenter || starterRegion()));
  const zooma = returnMapZoom((mapCenter || starterRegion()), bbox, 1);
  
  const dots = clusterIndex.getClusters(bbox, zooma)
  // console.log('CLusters: ', dots);
  setClusters(dots)
  setSuperCluster(clusterIndex)
  // setClusters(clusterIndex.getClusters(bbox, zooma))
  }
}, [markers, mapCenter]);

const animateCircle = (targetCenter:Region) => {
  const startTime = Date.now();
  const startCenter = { ...circleCenter };

  const animate = () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const t = Math.min(elapsedTime / ANIMATION_DURATION, 1); // Нормализуем время

    const easedT = easeInOutQuad(t); // Применяем easing функцию

    const newCenter = {
      latitude: startCenter.latitude + easedT * (targetCenter.latitude - startCenter.latitude),
      longitude: startCenter.longitude + easedT * (targetCenter.longitude - startCenter.longitude),
      latitudeDelta: mapCenter.latitudeDelta,
      longitudeDelta: mapCenter.longitudeDelta
    };

    setCircleCenter(newCenter);

    if (t < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

useEffect(() => {
  animateCircle(searchCircleCenter);
}, [searchCircleCenter]);



const calculateBBox = (region: Region): [number, number, number, number] => {
  const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
  console.log('region: ', JSON.stringify(region));
  
  return [
      longitude - longitudeDelta / 2, // westLng
      latitude - latitudeDelta / 2,   // southLat
      longitude + longitudeDelta / 2, // eastLng
      latitude + latitudeDelta / 2    // northLat
  ];
};

const _onClusterPress = (cluster: ClusterOrPoint | Cluster )=> () => {
  
 if(superCluster){
  const children = superCluster.getLeaves(Number(cluster.id), Infinity)
  // console.log('tap on ckluster');
  // console.log(cluster);
  
 

  const coordinates = children.map(({ geometry }) => ({
    latitude: geometry.coordinates[1],
    longitude: geometry.coordinates[0],
  }))
  console.log(coordinates);
  mapRef.current?.fitToCoordinates(coordinates,{edgePadding: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },})
 }
}

  return (
    <MapView
    style={{ flex: 1, justifyContent: 'center' }}
    {...{ onRegionChangeComplete }}
    onRegionChange={(reg)=>setCurrentMapCenter(reg)}
    initialRegion={starterRegion()}
    provider={PROVIDER_GOOGLE}
    customMapStyle={mapJSON}
    showsUserLocation
    showsBuildings
    showsScale={false}
    showsIndoors={true}
    showsCompass={false}
    showsMyLocationButton={false}
    // @ts-ignore
    ref={mapRef}
    minZoomLevel={13}
  >
   {searchCircleCenter && (
     <Circle
     center={circleCenter}
     radius={2100}
     strokeWidth={scale(2)}
     strokeColor={Colors.mDark}
     fillColor={Colors.mDark15}
     
   />
   )}
   <Circle
     center={currentMapCenter}
     radius={2100}
     strokeWidth={scale(0)}
     fillColor={Colors.mDark15}
     
   />

    {clusters.map(cluster => {
      
      
    // const [longitude, latitude] = cluster.geometry.coordinates;
    const latitude = Number(cluster.geometry.coordinates[1])
    const longitude= Number(cluster.geometry.coordinates[0])
    
    
    const { cluster: isCluster, point_count: count } = cluster.properties;

    return isCluster ? (
      
        <Marker
        tracksViewChanges={false}
            key={`cluster-${cluster.id}`}
            coordinate={{ latitude, longitude }}
          onPress={_onClusterPress(cluster)}
        >
            <View
            style={{
              backgroundColor: Colors.mDark,
              borderRadius: scale(15),
              height: scale(30),
              width: scale(30),
              justifyContent: 'center',
              alignItems: 'center'
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: scale(14)
                }}>{count}</Text>
            </View>
        </Marker>
    ) : (
        <Marker
            key={`marker-${cluster.properties.markerId}`}
            coordinate={{ latitude, longitude }}
            tracksViewChanges={false}
            onPress={()=>{
              if(cluster.properties.markerId !== activePlaceId){
                setActivePlaceId(cluster.properties.markerId)
              }else{
                setActivePlaceId(0)
              }
            }}
        >
            {markers && markers.find(m => m.id === cluster.properties.markerId)?.logo && (
              activePlaceId === cluster.properties.markerId ? (
                <View style={{
                  alignItems: 'center',
                  gap: scale(5)
                }}>
                  
                  <MapViewMarkerElectricity electricity={cluster.properties.electricity}/>
                  <View style={{
                    width: scale(50),
                    height: scale(50),
                    backgroundColor: Colors.mDark,
                    borderRadius: scale(15),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  
                    <Image
                      source={{ uri: markers.find(m => m.id === cluster.properties.markerId)?.logo }}
                      style={{ 
                        width: scale(40),
                        height: scale(40),
                        borderRadius: scale(10)
                      }}
                  />
                  
                  </View>
                </View>
              ) : (
                <View style={{
                  width: scale(50),
                  height: scale(50),
                  backgroundColor: Colors.darky,
                  borderRadius: scale(15),
                }}>
                  <Image
                      source={{ uri: markers.find(m => m.id === cluster.properties.markerId)?.logo }}
                      style={{ 
                        width: scale(50),
                        height: scale(50),
                        borderRadius: scale(15)
                       }}
                  />
                 <MapViewMarkerElectricityPreviewIcons electricity={cluster.properties.electricity}/>
                </View>
              )
            )}
        </Marker>
    );
})}

     
  </MapView>
  )
}



export default MapViewBlock