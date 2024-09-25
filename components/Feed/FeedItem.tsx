import { FC } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { Colors } from '@/constants'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import LocationBlock from './LocationBlock'
import ReviewsBlock from './ReviewsBlock'
import DistanceBlock from './DistanceBlock'
import { SpotItem } from '@/services/useFeed'

interface IProps {
  item: SpotItem
}

const FeedItem: FC<IProps> = ({item}) => {
  return (
    <View key={item.id} style={{
      width: '100%',
      backgroundColor: Colors.darky,
      borderRadius: scale(15),
      overflow: 'hidden'
    }}>
    <Link
      href={{
        pathname: '/(app)/place/[id]',
        params: { id: item.id }
      }}
      key={item.id}
      asChild
    >
      <TouchableOpacity
        style={{
          width: '100%',
          borderRadius: scale(15),
          backgroundColor: Colors.darky,
          overflow: 'hidden',
          alignItems: 'center',
        }}
      >
        <Image
          source={ item.poster? { uri: item.poster } : require('@/assets/images/main/empty_dish_screen.png')}
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
            backgroundColor: Colors.darky,
            paddingTop: scale(35),
          }}
        >
          <Text style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: scale(12),
            paddingHorizontal: scale(15),
            marginBottom: scale(10),
          }}>{item.description}</Text>
          {item.location && (
            <LocationBlock item={item} />
          )}
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
            source={item.logo? { uri: item.logo} : require('@/assets/images/main/empty_dish.png')}
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
              {item.name && item.name.length > 25? item?.name.substring(0, 22) + '...' : item?.name}
            </Text>
          </View>
          <ReviewsBlock item={item} />
        </View>
        {item.location && (
          <DistanceBlock item={item} />
        )}
        
      </TouchableOpacity>
    </Link>
    </View>
  )
}

export default FeedItem