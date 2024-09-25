import { LinearGradient } from 'expo-linear-gradient'
import { FC, useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import { useMyLoverDishes } from './useMyLoverDishes'
import { Colors } from '@/constants'
import { Separator } from '@/atoms'
import MyLoverListHeaderBar from './MyLoverListHeaderBar'
import MyLoverListItem from './MyLoverListItem'


const HEADER_HEIGHT = scale(35)

const MyLoverList: FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current
  const insets = useSafeAreaInsets();
  const {allLoverDishesModels, allLoverDishesOperations} = useMyLoverDishes()

  useEffect(()=>{
    allLoverDishesOperations.getDishes()
  },[])
  


  return (
    <LinearGradient
    style={{ flex: 1}}
    colors={['#21001C', '#49000F']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
  >
    {
        allLoverDishesModels.isLoverDishesLoading && (
            <View style={{
              flex:1,
              justifyContent:'center',
              alignItems: 'center',
              padding: scale(15),
              backgroundColor: Colors.darky50
            }}>
              <View style={{
                backgroundColor: Colors.mDark15,
                borderRadius: scale(15),
                width: '100%',
                padding: scale(30)  
              }}>
              <ActivityIndicator
                size={scale(24)}
                color={Colors.mDark}
              />
              </View>
            </View>
          )
    }

    {
      (!allLoverDishesModels.loverDishes || allLoverDishesModels.loverDishes.length === 0) && !allLoverDishesModels.isLoverDishesLoading && (
        <View style={{
          flex:1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: scale(15)
        }}>
           <MyLoverListHeaderBar HEADER_HEIGHT={HEADER_HEIGHT} scrollY={scrollY}/> 
          <View style={{
            width: '100%',
            borderRadius: scale(15),
            backgroundColor: Colors.darky,
            alignItems: 'center',
            justifyContent: 'center',
            padding: scale(30)
          }}>
            <Text style={{color: 'white', fontSize:scale(14), fontWeight: 'bold'}}>Упс... Не бачу улюблених страв або закладів, котику</Text>  
          </View>
        </View>
      )
    }
    {
      allLoverDishesModels.loverDishes && allLoverDishesModels.loverDishes.length > 0  && !allLoverDishesModels.isLoverDishesLoading && (
        <View style={{
          flex: 1,
        }}>
          <MyLoverListHeaderBar HEADER_HEIGHT={HEADER_HEIGHT} scrollY={scrollY}/> 
        
          <Animated.FlatList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            data={allLoverDishesModels.loverDishes}
            keyExtractor={item => item?.spotId?.toString()}
            ListHeaderComponent={<Separator height={scale(85) + insets.top}/>}
            ItemSeparatorComponent={()=> <Separator height={scale(30)}/>}
            ListFooterComponent={<Separator height={scale(15) + insets.bottom}/>}
            // onEndReached={loadMorePlaces}
            onEndReachedThreshold={0.5}
            initialNumToRender={3}
            maxToRenderPerBatch={6}
            windowSize={4}
           
            renderItem={({item}) =>{
              return(
                <MyLoverListItem  spotDishes={item}/>
                // <FeedBlock item={item}/>
              )
            }}
            />
        </View>
      )
    }
  </LinearGradient>
  )
}

export default MyLoverList