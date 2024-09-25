import { Colors } from "@/constants";
import { useCart } from "@/context";
import { currentWorkTime, formatPrice, getItemInfo } from "@/services";
import { useNavigation, useRouter } from "expo-router";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react"
import { Animated, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { scale } from "react-native-size-matters";
import CartHeaderBar from "./CartHeaderBar";
import CartItem from "./CartItem";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useCartScreen } from "./useCartScreen";
import AddCommentModal from "./modals/AddCommentModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const CartScreen : FC = memo(()=>{
    const HEADER_HEIGHT = 50
    const { cart, clearCart } = useCart();
    const insets = useSafeAreaInsets()
    const navigation = useNavigation()
    const router = useRouter()
    const {models, operations} = useCartScreen(cart.spotId)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
      setIsLoading(true)
      try{
        operations.getThisSpot()
      }catch{

      }
      finally{
        setIsLoading(false)
      }
    },[cart.spotId])
    
    
    

    const [price, setPrice] = useState(0)

    const {itemOperations, itemModels} = getItemInfo()
    const [isPriceLoading, setIsPriceLoading] = useState(true)
  
    const [isOpenNow, setIsOpenNow] = useState(false)
    const [is24Hour, setIs24Hour] = useState(false)
    const time = () =>{
      if(models.spot?.worktime){
        const dayType = currentWorkTime(models.spot?.worktime)
        const workTimeToday = models.spot?.worktime.find((day) => day.type === dayType);
        return workTimeToday
      }
    }
    console.log(isOpenNow);
    
  useEffect(()=>{

    function convertToMinutes(timeString : string) {
      const [hours, minutes] = timeString.split(':').map(Number);
      return hours * 60 + minutes;
    }
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    
    
    const timeWork = time();
    if (timeWork !== undefined) {
        const startMinutes = convertToMinutes(timeWork.start);
        const endMinutes = convertToMinutes(timeWork.end);
        setIsOpenNow(()=>{
          if(startMinutes === 0 && endMinutes === 0) {
            setIs24Hour(true)
            return true
          }
          return (nowMinutes >= startMinutes && nowMinutes < endMinutes);
        })
    }
    console.log(convertToMinutes(`${time()?.start}`) ,convertToMinutes(`${time()?.end}`) , nowMinutes);
    
    
  },[models.spot])
  




    useEffect(() => {
      const calculateTotalCost = async () => {
        let totalCost = 0;
        setIsPriceLoading(true);  // Предполагаем, что вы имеете такую функцию для управления UI
      
        try {
          for (const cartItem of cart.cartItems) {
            const dish = await itemOperations.getItemReturn(cart.spotId, cartItem.id);
            if (dish) {
              // Считаем стоимость основного блюда
              totalCost += (dish.price ?? 0) * cartItem.amount;
      
              // Считаем стоимость добавок
              for (const group of cartItem.groups) {
                for (const additiveId of group.selectedAdditives) {
                  const dishGroup = dish.groups.find(g => g.id === group.id); // Найдем соответствующую группу в данных блюда
                  if (dishGroup) {
                    const additive = dishGroup.additives.find(a => a.id === additiveId); // Найдем добавку
                    if (additive) {
                      // Добавим стоимость добавки, умноженную на количество блюд
                      totalCost += (additive.price ?? 0) * cartItem.amount;
                    }
                  }
                }
              }
            }
          }
          setPrice(totalCost);
        } catch (error) {
          console.error("Error calculating total cost", error);
        } finally {
          setIsPriceLoading(false);  // Обновим состояние загрузки
        }
      };
      calculateTotalCost()
      
    }, [cart]);


    const scrollY = useRef(new Animated.Value(0)).current
    
      const goBack = () => {
        navigation.goBack()
      }

      const addCommentModalRef = useRef<BottomSheetModal>(null)
      const openInfoModal = useCallback(() => {
        addCommentModalRef.current?.present()
      }, [])

  
    return (
      <LinearGradient
			style={{ flex: 1}}
			colors={['#21001C', '#49000F']}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
		>
        <View style={{flex: 1}}>
            <CartHeaderBar {...{ HEADER_HEIGHT, scrollY, goBack, clearCart}}/>
             <Animated.ScrollView
                onScroll={Animated.event(
            [
            {
                nativeEvent: { contentOffset: { y: scrollY } }
            }
            ],
      { useNativeDriver: true }
    )}
    // style={{ backgroundColor: '#070707' }}
        >

			<View style={{
                marginTop: scale(80) + insets.top,
                gap:scale(20),
            }}>

            <View style={{paddingHorizontal: scale(15)}}>
              <Pressable
              android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
              onPress={()=>router.push({pathname: '/(app)/place/[id]', params: { id: cart.spotId}})} 
              style={{  
                backgroundColor: Colors.darky,
                width: '100%',
                padding: scale(15),
                borderRadius: scale(15),
                flexDirection: 'row',
                alignItems:'center',
                justifyContent: 'space-between'
            }}>
                <View style={{
                  flexDirection: 'row',
                  gap: scale(15),
                  alignItems: 'center'
                }}>

                  {models.spot?.logo ? (
                    <Image
                    source={{uri: models.spot.logo}}
                    style={{
                      width: scale(70),
                      height: scale(70),
                      borderRadius: scale(15)
                    }}
                  />
                  ) : (
                    <Image
                  source={require('@/assets/images/main/empty_dish.png')}
                  style={{
                    width: scale(70),
                    height: scale(70),
                    borderRadius: scale(15)
                  }}
                />
                  )}

                  <Text style={{color: 'white', fontSize: scale(14), height: scale(50),fontWeight: 'bold', width: scale(160)}}>{
                     models.spot && models.spot.name && (models.spot.name.length > 16 ? models.spot.name.substring(0,16) + '...' : models.spot.name)
                  }</Text>
                  
                  {!isLoading && models.spot?.worktime && models.spot.worktime.length > 0 && (
											<View
											style={[
												time()?.nowork || !isOpenNow ? {backgroundColor: Colors.mDark15} : {backgroundColor: Colors.success15},
												{
												flexDirection: 'row',
												borderRadius: scale(10),
												padding: scale(7),
												gap: scale(10),
												alignContent: 'center',
												alignItems: 'center',
                        position: 'absolute',
                        left: scale(85),
                        bottom: scale(5)
											}]}
										>
											<Octicons name='clock' size={scale(12)} color={time()?.nowork || !isOpenNow ? Colors.mDark :  Colors.success} />
											<Text
												style={[
													time()?.nowork || !isOpenNow ? {color: Colors.mDark} : {color: Colors.success},
													{
													// color: 'white',
													fontSize: scale(12),
													fontWeight: '500'
												}]}
											>
												{is24Hour ? 'Цілодобово' : `${time()?.start} : ${time()?.end}`}
											</Text>
										</View>
					)}

                </View>
                <Octicons name='chevron-right' size={scale(32)} color={Colors.accentRed} />
              </Pressable>
             {((!isOpenNow || time()?.nowork) && models.spot?.isVerified ) && !isLoading && (

              <View style={{
                width: '100%',
                padding: scale(15),
                backgroundColor: Colors.mDark15,
                flexDirection: 'row',
                borderRadius: scale(15),
                gap: scale(10),
                alignItems: 'center'
              }}>
                <Ionicons name="warning-outline" size={24} color={Colors.mDark} />
                <View style={{
                  gap: scale(5)
                }}>
                  <Text style={{
                    fontSize: scale(14),
                    color:'white'
                  }}>Заклад не приймає замовлення</Text>
                  <Text style={{
                    fontSize: scale(12),
                    color:'rgba(255,255,255,0.5)',
                    width: scale(250)
                  }}>Вибач, котику, але створити замовлення можна тільки у робочий час.</Text>
                </View>
              </View>

             )}
             {!models.spot?.isVerified && !isLoading && (
               <View style={{
                width: '100%',
                padding: scale(15),
                backgroundColor: Colors.mDark15,
                flexDirection: 'row',
                borderRadius: scale(15),
                gap: scale(10),
                alignItems: 'center'
              }}>
                <Ionicons name="warning-outline" size={24} color={Colors.mDark} />
                <View style={{
                }}>
                  <Text style={{
                    fontSize: scale(14),
                    color:'white'
                  }}>Заклад не підтверджено</Text>
                  <Text style={{
                    fontSize: scale(12),
                    color:'rgba(255,255,255,0.5)',
                    width: scale(250)
                  }}>Вибач, котику, але створити замовлення можна тільки у підключених до нас закладах.</Text>
                  <Text style={{
                    fontSize: scale(12),
                    color:'rgba(255,255,255,0.5)',
                    width: scale(250)
                  }}>Ну нічо, скоро і його підключемо ^_^</Text>
                </View>
              </View>

             ) }
            </View>



              <View style={{
                paddingHorizontal: scale(15),
                gap: scale(10)
              }}>


                {cart.cartItems.length > 0 ? (
                  <View>
                    <View style={{
                      gap: scale(5),
                      backgroundColor: Colors.darky,
                      borderRadius: scale(15),
                      overflow: 'hidden'
                    }}>
                    {
                      cart.cartItems.map((item, index) => (
                        <CartItem id={item.id} amount={item.amount} spotId={cart.spotId} key={index} groups={item.groups}/>
                      ))
                    }
                    </View>
                    
                  </View>
                  
                ):(
                  <View style={{
                    width: '100%',
                    paddingVertical: scale(30),
                    borderRadius: scale(15),
                    backgroundColor: Colors.darky,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Text style={{color: 'white', fontSize:scale(14), fontWeight: 'bold'}}>Наповни корзину в закладі 👆🏻</Text>  
                  </View>
                )
              }
                <Pressable
                onPress={openInfoModal}
                style={{
                  width: '100%',
                  backgroundColor: Colors.darky50,
                  paddingVertical: scale(15),
                  paddingHorizontal: scale(20),
                  borderRadius: scale(15),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <View style={{
                    flexDirection: 'row',
                    gap: scale(15),
                    alignItems: 'center'
                  }}>
                  {(!cart.comment || cart.comment.length === 0) ? (
                    <>
                       <Octicons name="comment" size={scale(20)} color="white" />
                       <Text style={{
                         color: 'white',
                         fontSize: scale(12)
                       }}>Коментар для закладу</Text>
                    </>
                    ) : (
                      <>
                         <Octicons name="comment" size={scale(20)} color={Colors.success} />
                         <Text style={{
                           color: 'white',
                           fontSize: scale(12),
                           flex: 1,
                           paddingRight: scale(15)
                         }}>{cart.comment.length > 100 ? cart.comment.substring(0, 97) + '...' : cart.comment}</Text>
                      </>
                      )}
                  </View>
                  <Octicons name='chevron-right' size={scale(20)} color='white' />
                </Pressable>

              </View>
            </View>
            <View style={{height: scale(200)}}/>
                </Animated.ScrollView>
			
              {((isOpenNow && !time()?.nowork) && models.spot?.isVerified) && (

                <View style={{position: 'absolute', bottom:scale(15) + insets.bottom, left: scale(15), right:scale(15)}}>

                <View style={{
                  backgroundColor: Colors.mDark,
                  borderRadius: scale(15),
                }}>
                <Image
                source={require('@/assets/images/main/cart_bg.png')}
                resizeMode="cover"
                style={{
                  position: 'absolute',
                  width:'100%',
                  height:'100%',
                }}
                />
                  <View style={{
                    padding: scale(15),
                    gap: scale(15)
                  }}>
                  <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                  }}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: scale(14)}}>Підсумок корзини</Text>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: scale(14)}}>{isPriceLoading ? '...' : formatPrice(price)}</Text>
                  </View>
                <Pressable 
                onPress={()=>router.push('/(app)/cartAccept')}
                android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
                style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',padding: scale(15), borderRadius: scale(15)}}>
                  <Text style={{color: Colors.mDark, fontSize: scale(16), fontWeight: 'bold'}}>Оформити замовлення</Text>
                </Pressable>
                  </View>
                </View>
                </View>

              )}


      </View>
      <AddCommentModal reference={addCommentModalRef}/>
      </LinearGradient>
    )
})
export default CartScreen