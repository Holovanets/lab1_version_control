import { Colors } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable, Text, View, Linking } from 'react-native'
import { scale } from 'react-native-size-matters'

interface IProps {
  placeSocials?: {
    type: string
    link: string
    name?: string | null | undefined
  }[]
}

const HorizontalLinks: FC<IProps> = ({placeSocials}) => {
  const handlePress = (type: string, link: string)=>{
    if(type==='phone'){
      Linking.openURL(`tel:${link}`)
    }else{
      Linking.openURL(link)
    }
  }
  return (
    <View style={{marginTop:scale(15), marginHorizontal: scale(15), gap:2, backgroundColor: Colors.mDark15, borderRadius: scale(15), overflow: 'hidden'}}>

    {placeSocials?.map(item =>(
      <Pressable
      android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
      onPress={()=>handlePress(item.type, item.link)}
      key={item.link}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(15),
        paddingVertical: scale(10),
        alignItems: 'center',
        backgroundColor: '#151515'
      }}>
        <View style={{flexDirection: 'row', gap: scale(15), alignItems: 'center'}}>
        {item.type === 'instagram' ? (
          <Ionicons name="image-outline" size={28} color={Colors.mDark} />
          ) : item.type === 'phone' ? (
            <Ionicons name="call" size={28} color={Colors.mDark} />
            
        ) : (
          <Ionicons name="link" size={28} color={Colors.mDark} />
        )}
          <View style={{gap:(scale(2))}}>


            
            {item.type === 'instagram' ? (
          <Text style={{fontSize:scale(14), color:Colors.mDark}}>Наша галерея</Text>
          ) : item.type === 'phone' ? (
            <Text style={{fontSize:scale(14), color:Colors.mDark}}>Зателефонуй нам</Text>
            
        ) : (
          <Text style={{fontSize:scale(14), color:Colors.mDark}}>Інше</Text>
        )}
            <Text style={{fontSize:scale(12), color:'rgba(255,255,255,0.5)'}}>{item.name || ''}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color={Colors.mDark} />
    </Pressable>
    ))}


  </View>
  )
}

export default HorizontalLinks