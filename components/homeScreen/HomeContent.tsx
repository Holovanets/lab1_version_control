import { FC } from 'react'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'
import CashBack from './cashBackBlock/CashBack'
import Constants from 'expo-constants'
import { Sizes } from '@/constants'
import NearYouBlock from './NearYouBlock/NearYouBlock'

import CollectionBlock from './CollectionBlock/CollectionBlock'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MapViewBlock from './MapViewBlock/MapViewBlock'

const HomeContent: FC = () => {
 
  const clearAsyncStorage = async() => {
    await AsyncStorage.clear();
		console.log('storage clean');
}
  return (
    <View
    style={{
      paddingTop: scale(190 + 16 + Constants.statusBarHeight),
    }}
  >
    {/* <Pressable style={{width: '100%', height: 50, paddingHorizontal: scale(15), borderRadius: scale(15), backgroundColor: Colors.price}} onPress={()=>clearAsyncStorage()}></Pressable> */}
    <View style={{paddingHorizontal: Sizes.mainPadding}}>
      <CashBack />
    </View>
    {/* <Promotions />
    */}
    <MapViewBlock/>
    <NearYouBlock/>
    <CollectionBlock title='Найкращі поруч' />
    <View style={{height: scale(15)}}></View>
  </View>
  )
}

export default HomeContent
