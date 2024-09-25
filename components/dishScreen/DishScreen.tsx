import { Colors } from '@/constants'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { FC, useEffect, useRef, useState } from 'react'
import { Text, View, Animated, Pressable } from 'react-native'
import { PlaceDishResponse, useDish } from './useDish'
import { scale } from 'react-native-size-matters'
import DishHeaderBar from './DishHeaderBar'
import DishImageContent from './DishImageContent'
import { useCart } from '@/context'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { formatPrice } from '@/services'
import { Feather } from '@expo/vector-icons'
import { useToast } from 'react-native-toast-notifications'
import axios from 'axios'
import { HeartLike, Ticker } from '@/atoms'
import DishAdditivesBlock from './DishAdditivesBlock'
import { getAdditivesInfo } from '../cartScreen/getAdditivesInfo'
interface GroupAdditives {
  id: number;
  selectedAdditives: number[];
}
const HEADER_HEIGHT = scale(270)


const DishScreen: FC = () => {
  
  const { placeId, dishId, spotName } = useLocalSearchParams()

	const insets = useSafeAreaInsets();
  const navigation = useNavigation()
  const scrollY = useRef(new Animated.Value(0)).current
  const {countItemInCart} = useCart()
  
    const goBack = () => {
      navigation.goBack()
    }


  const {models, operations} = useDish(+placeId)
  
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [dish, setDish] = useState<PlaceDishResponse['data']>()
  const [isLiked, setIsLiked] = useState<boolean | undefined>(false)
  const [likes, setLikes] = useState<number | undefined>(0)

  const [selectedAdditives, setSelectedAdditives] = useState<GroupAdditives[]>([]);
  const toggleAdditives = (groupId: number, additives: number[]) => {
    setSelectedAdditives(prev => {
        // Убираем старую запись группы, если она есть
        const otherGroups = prev.filter(group => group.id !== groupId);
        // Добавляем обновленную запись, только если массив additives не пуст
        if (additives.length > 0) {
            return [...otherGroups, { id: groupId, selectedAdditives: additives }];
        }
        // Если массив additives пуст, не добавляем группу обратно
        return otherGroups;
    });
};
const hexToRgb = (hex: string) =>{
  hex = hex.replace('#','')
  const r = parseInt(hex.substring(0,2),16)
  const g = parseInt(hex.substring(2,4),16)
  const b = parseInt(hex.substring(4,6),16)
  return `rgba(${r}, ${g}, ${b}, 0.5)`
}
function getWeightValue(weights: {
  weightId: number | null,
  value: number | null
}[]) {
  const item = weights.find(weight => weight.weightId === 1);
  return item ? item.value : null; // Возвращает значение или null, если элемент не найден
}
  useEffect(()=>{
    console.log(selectedAdditives);
    
  },[selectedAdditives])
	useEffect(()=>{
		(async ()=>{
			try{
				const result = await operations.getDishLikes(+dishId)
				setLikes(result?.response)
				// console.log(result?.response);
			}catch(err){
				console.error('Cant get likes', err)
			}
		})()
	},[isLiked])
	useEffect(()=>{
		(async ()=>{
			try{
				const result = await operations.getDishIsLiked(+dishId)
				setIsLiked(result?.response)
				// console.log(result);
			}catch(err){
				console.error('Cant get likes', err)
			}
		})()
	},[isLiked])
	const toggleLike = ()=>{
		if(isLiked){
			(async ()=>{
				try{
					const result = await operations.deleteLikeDish(+dishId)
					if(result === 200){
						setIsLiked(false)
					}
				}catch(err){
					console.error('Cant dislike', err)
				}
			})()
		}else{
			(async ()=>{
				try{
					const result = await operations.putLikeDish(+dishId)
					if(result === 200){
						setIsLiked(true)
					}
				}catch(err){
					console.error('Cant like', err)
				}
			})()
		}
	}
  useEffect(() => {
    setLoading(true)
    // console.log(` PlaceId, DishId: ${Number(placeId)}, ${Number(dishId)}`);
    operations.getDish(Number(dishId)).then((dish) => {setDish(dish)}).finally(()=>setLoading(false))
  }, [placeId, dishId]);

  const { addToCart } = useCart();
  function handleAddToCart() {
    const errors: string[] = [];
  
    // Перебираем группы добавок в блюде
    dish?.groups?.forEach(group => {
      // Получаем количество выбранных добавок в этой конкретной группе
      const selectedCount = selectedAdditives.filter(additive => additive.id === group.id).length;
  
      if (selectedCount < group.min) {
        errors.push(`Мінімум ${group.min} додатків у групі "${group.name}"`);
      }
      if (selectedCount > group.max && group.max > 0) {
        errors.push(`Максимум ${group.max} додатків у групі "${group.name}"`);
      }
    });
  
    if (errors.length > 0) {
      // Если есть ошибки, уведомляем пользователя
      alert("Котику, виправ наступні помилки: " + errors.join(", "));
      return; // Прерываем добавление в корзину
    }
  
    // Если все условия выполнены, добавляем товар в корзину
    const dishItem = {
      id: +dishId,
      amount: 1,
      groups: selectedAdditives // Убедитесь, что это правильная структура данных
    };
    addToCart(dishItem, +placeId, String(spotName));
    toast.show('Додано!',{
      type: 'success',
      placement: 'top',
      duration: 1000
    })
  }
  
  
  
  if(!dish){
    return(
      <View style={{paddingHorizontal: scale(15)}}>
        <View style={{
					backgroundColor: Colors.mDark15,
					width: '100%',
					padding: scale(15),
					borderRadius: scale(15),
					flexDirection: 'row',
					alignItems: 'center',
					gap: scale(15),
          marginTop: scale(120)
				}}>
					{loading ? (
						<Feather name="download-cloud" size={24} color={Colors.mDark} />
					) : (
						<Feather name="cloud-off" size={24} color={Colors.mDark} />
					)}
						<Text style={{
							color: 'white',
							fontSize: scale(14)
						}}>{loading ? 'Завантаження' : 'Страва десь поділася :('}</Text>
					</View>
          <Text style={{color:'white'}}>{JSON.stringify(dish)}</Text>
      </View>
    )
  }else{
    return (
      <View style={{backgroundColor: Colors.darky, flex: 1}}>
          <DishHeaderBar
            {...{ HEADER_HEIGHT, scrollY, goBack }}
          />
      
               <Animated.ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: scrollY } }
              }
            ],
            { useNativeDriver: true }
          )}
          style={{ backgroundColor: Colors.darky }}
        >
          <DishImageContent {...{HEADER_HEIGHT, scrollY}} img={dish.image}/>
            <View style={{marginTop: scale(15), width: '100%', alignItems: 'center', gap:scale(10), paddingHorizontal: scale(15)}}>
            <Text style={{color:'white', fontSize: scale(18), fontWeight: 'bold', textAlign: 'center'}}>{dish.name ? dish.name.length > 120
                    ? dish.name.substring(0, 120-3) + '...'
                    : dish.name : '...'}</Text>


            
            {(dish.tags && dish.tags.length > 0) ? (
              dish.tags.map(tag =>(
                <View key={tag.id} style={{
                  backgroundColor: hexToRgb(tag.color),
                  paddingVertical: scale(5),
                  paddingHorizontal: scale(10),
                  borderRadius: scale(10)
                }}>
                  <Text style={{
                    fontSize: scale(14),
                    color: 'white'
                  }}>
                    {tag.text}
                  </Text>
                </View>
              ))
            ) : null}
            
            <View style={{
              flexDirection: 'row',
              gap: scale(5)
            }}>
  
                <Text style={{color:'white', fontSize: scale(14)}}>{dish.weights && dish.weights.length > 0 && (
                  `${getWeightValue(dish.weights)}г`
                )}</Text>
         
            
              {dish.priceAtDiscount === 0 && (
                    <Text
                      style={{
                        fontSize: scale(14),
                        fontWeight: 'bold',
                        color: Colors.price
                      }}
                    >
                      {formatPrice(dish.price)}
                    </Text>
                  )}
                  {dish.priceAtDiscount > 0 && (
                    <View
                      style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
                    >
                      <View
                        style={{
                          backgroundColor: Colors.price,
                          paddingVertical: 3,
                          paddingHorizontal: 8,
                          borderRadius: 50
                        }}
                      >
                        <Text
                          style={{
                            fontSize: scale(14),
                            fontWeight: 'bold',
                            // color: Colors.price
                            color: Colors.darky
                          }}
                        >
                          {formatPrice(dish.priceAtDiscount)}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: scale(14),
                          fontWeight: 'bold',
                          color: 'rgb(120,120,120)',
                          textDecorationLine: 'line-through'
                        }}
                      >
                        {formatPrice(dish.price)}
                      </Text>
                    </View>
                  )}
      
              {/* <Text style={{color:Colors.price, fontSize: scale(14), fontWeight: 'bold'}}>{formatPrice(dish.price)}</Text> */}
            </View>
            <Pressable
			      	android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
			      	onPress={() => {
			      		toggleLike()
			      	}}
			      	style={[
                isLiked ? {backgroundColor: Colors.mDark15,} : {backgroundColor: '#151515'},
                {
			      		
			      		flexDirection: 'row',
			      		borderRadius: scale(15),
			      		gap: scale(15),
			      		paddingHorizontal: 15,
                width: '100%',
			      		paddingVertical: 10,
			      		alignItems: 'center',
			      		justifyContent: 'space-between'
			      	}]}
			      >
			      	<Text style={{ color: 'white', fontSize: scale(12), flex: 1 }}>
			      			{isLiked? 'Це твоя улюблена ласунка' : `Додавай страву до своїх ласунок `}
			      	</Text>
			      	<HeartLike isActive={isLiked || false} likes={likes || 0}/>
			      </Pressable>
            </View>
            <View style={{marginTop: scale(15), paddingHorizontal: scale(15)}}>

              <View style={{
                backgroundColor: '#151515',
                padding: scale(15),
                borderRadius: scale(15),
                gap: scale(30)
              }}>

              <Text style={{color: 'white'}}>
                {dish.description ? dish.description : models.fishDescriptions[Math.floor(Math.random() * models.fishDescriptions.length)]}
              </Text>
        

              <View>
              <Text style={{color: 'rgba(255,255,255,0.5)'}}>КБЖВ на 100г</Text>
                <View style={{
                  flexDirection: 'row',
                  marginTop: scale(15),
                  gap: scale(10)
                }}>
                <View>
                  <Text style={{color: 'white', fontSize: scale(14)}}>{dish.calories ? dish.calories.calories : 0}</Text>
                  <Text style={{color: 'rgba(255,255,255,0.5)', fontSize: scale(12)}}>ккал</Text>
                </View>
                <View>
                  <Text style={{color: 'white', fontSize: scale(14)}}>{dish.calories ? dish.calories.proteins : 0}</Text>
                  <Text style={{color: 'rgba(255,255,255,0.5)', fontSize: scale(12)}}>білки</Text>
                </View>
                <View>
                  <Text style={{color: 'white', fontSize: scale(14)}}>{dish.calories ? dish.calories.fats : 0}</Text>
                  <Text style={{color: 'rgba(255,255,255,0.5)', fontSize: scale(12)}}>жири</Text>
                </View>
                <View>
                  <Text style={{color: 'white', fontSize: scale(14)}}>{dish.calories ? dish.calories.carbohydrates : 0}</Text>
                  <Text style={{color: 'rgba(255,255,255,0.5)', fontSize: scale(12)}}>вуглеводи</Text>
                </View>
                </View>
              </View>

              </View>
              {dish.groups && dish.groups.length > 0 && <View style={{
                marginTop: scale(15),
                backgroundColor: '#151515',
                padding: scale(15),
                borderRadius: scale(15),
                gap: scale(20)
              }}>
                {dish.groups.map(group => (
                  <View key={group.id} style={{}}>
                    <DishAdditivesBlock
                      additivesGroup={group}
                      selectedAdditives={selectedAdditives.find(g => g.id === group.id)?.selectedAdditives || []}
                      onSelectionChange={(additives) => toggleAdditives(group.id, additives)}
                    />
                  </View>
                ))}

              </View>}
            </View>
            <View style={
              (selectedAdditives && selectedAdditives.length > 0) ? {
              height: scale(300)
            } : {
              height: scale(120)
            }
            }>


            </View>
            
      
          </Animated.ScrollView>
            <View style={[{
              position: 'absolute',
              bottom:0,
              left:0,
              right:0,
              // height: scale(80),
              paddingBottom: scale(15) + insets.bottom,
              borderTopLeftRadius: scale(20),
              borderTopRightRadius: scale(20),
              backgroundColor: Colors.darky,
              padding: scale(15),              
              gap: scale(5)
            },
              selectedAdditives && selectedAdditives.length > 0 && {paddingTop: scale(5)}
            ]}>
              {(selectedAdditives && dish) ? (
                getAdditivesInfo(dish, selectedAdditives)?.map((group, index) => (
                    <View key={dish.id + "-" + group.groupName + "-" + index} style={{ marginBottom: scale(2) }}>
                    <Text style={{
                        color: 'white',
                        fontSize: scale(10),
                        fontWeight: 'bold'
                    }}>
                        {group.groupName}
                    </Text>
                    {group.additives.map((additive, addIndex) => (
                        <View key={dish.id + "-" + group.groupName + "-" + addIndex} style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row'
                        }}>
                          <Text  style={{
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: scale(10)
                          }}>
                          {`   ${additive.name}`}
                          </Text>
                          <Text style={{
                            color: Colors.price,
                            fontSize: scale(10)
                          }}>
                            {`+${formatPrice(additive.price)}`}
                          </Text>
                        </View>
                    ))}
                    </View>
                ))
              ) : null}
             
              <View style={{
                gap: scale(15),
                flexDirection: 'row',
              }}>
              <Pressable 
              android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
              onPress={handleAddToCart}
              style={{
                flex: 1,
                paddingVertical: scale(15),
                backgroundColor: Colors.mDark,
                borderRadius: scale(10),
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{color:'white', fontSize: scale(16), fontWeight: 'bold'}}>
                  Додати страву
                </Text>
              </Pressable>
                {countItemInCart(+dish.id, +placeId) > 0 ? (
                  <View style={{
                    width: scale(50),
                    backgroundColor: Colors.mDark15,
                    borderRadius: scale(15),
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Text style={{
                      color: 'white',
                      fontSize: scale(14),
        
                    }}>{countItemInCart(+dish.id, +placeId)}</Text>
                    {/* <Ticker number={countItemInCart(+dish.id, +placeId)} textSize={scale(14)}/> */}
                  </View>
                ) : (
                  null
                )}
              </View>

            </View>
         
      </View>
      )
  }
}

export default DishScreen