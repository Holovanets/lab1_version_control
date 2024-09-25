import { FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { LatLng } from 'react-native-maps'
import { scale } from 'react-native-size-matters'

interface PlaceListItemProps {
  name: string
  address: string
  iconUrl: string

  onPress: ()=>void
}

const PlaceListItem: FC<PlaceListItemProps> = ({name, address, iconUrl, onPress}) => {
  return (
    <Pressable 
    android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
{...{onPress}}
    style={{
      backgroundColor:'rgba(255,255,255,0.1)',
      marginVertical: scale(5), 
      paddingHorizontal: scale(15), 
      paddingVertical: scale(10),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: scale(15)
      }}>
    <Image source={{uri:iconUrl}} style={{width:scale(25), height:scale(25)}} />
      <View style={{flex: 1}}>
        
      <Text style={{color: 'white', fontSize: scale(14), fontWeight: 'bold'}}>{name}</Text>
      <Text style={{color: 'rgba(255,255,255,0.5)', fontSize: scale(12)}}>{address}</Text>
    
      </View>
      </Pressable>
  )
}

export default PlaceListItem