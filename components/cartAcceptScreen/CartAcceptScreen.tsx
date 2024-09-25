import { Colors, mapJSON } from "@/constants";
import { useCart } from "@/context";
import { convertTimeToUnix, currentWorkTime, formatPrice, getItemInfo } from "@/services";
import { Redirect, router, useNavigation } from "expo-router";
import { FC,  useCallback,  useEffect, useRef, useState } from "react"
import { Animated, Image, Pressable, Text, View } from "react-native";
import {  useSafeAreaInsets } from "react-native-safe-area-context"
import { scale } from "react-native-size-matters";
import { Octicons } from "@expo/vector-icons";
import CartAcceptHeaderBar from "./CartAcceptHeaderBar";
import { SimpleSwitch } from "@/atoms";
import { useAcceptCartScreen } from "./useAcceptCartScreen";
import PlaceInfoBlock from "./PlaceInfoBlock";
import PickUpTimesBlock from "./PickUpTimesBlock";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CancelModal from "./modals/CancelModal";
import { useToast } from "react-native-toast-notifications";


const CartAcceptScreen : FC = ()=>{
    const HEADER_HEIGHT = 50
    const { cart, clearCart } = useCart();
    const {models, operations} = useAcceptCartScreen(cart.spotId)
    const {itemOperations, itemModels} = getItemInfo()
    const insets = useSafeAreaInsets()
    const navigation = useNavigation()
    const [isPriceLoading, setIsPriceLoading] = useState(true)
  	const [price, setPrice] = useState(0)
    const toast = useToast()
    const defaultTime = '10-30хв'
    const [selectedTime, setSelectedTime] = useState<string>(defaultTime)
 
    const cancelModalRef = useRef<BottomSheetModal>(null)
    const openCancelModal = useCallback(() => {
      cancelModalRef.current?.present()
    }, [])


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
      operations.getThisSpot()
    }, [cart]);

    useEffect(()=>{
      if(selectedTime !== defaultTime){
        setIsTimeSelected(true)
      }else{
        setIsTimeSelected(false)
      }
    },[selectedTime])


    const scrollY = useRef(new Animated.Value(0)).current
      const goBack = () => {
        navigation.goBack()
      }
      const [isTimeSelected, setIsTimeSelected] = useState(false)

      
      const handleMakeOrder = () =>{
        let pickTime = 0
        if(selectedTime === defaultTime){
          pickTime = 0
        }else{
          pickTime = convertTimeToUnix(selectedTime)
        }
        
        operations.makeOrder(

          {
          spotId: cart.spotId,
          comment: cart.comment,
          desiredTime: pickTime,
          payment: 'CASH',
          details: cart.cartItems.map(item => ({
            ...item,
            dishId: item.id, 
            id: undefined
          })).map(({ id, ...rest }) => rest) 
        }
      ).then(orderResponse => {
          console.log('orderResponse: ',orderResponse);
          clearCart()
          router.push({pathname: '/(app)/order/[orderId]', params: {orderId: orderResponse.orderId}})
        }).catch(e =>{
          
          toast.show(`Опа, опа! Не можу створити замовлення. Фіксики вже фіксять!`,{
            type: 'danger',
            placement: 'top',
            duration: 3000, 
          })
        })
        
      }

      if(cart.cartItems.length === 0){
        return <Redirect href={'/(app)/home'}/>
      }
    return (

        <View style={{flex: 1}}>
            <CartAcceptHeaderBar {...{ HEADER_HEIGHT, scrollY, goBack, clearCart}}/>
             <Animated.ScrollView
                onScroll={Animated.event(
            [
            {
                nativeEvent: { contentOffset: { y: scrollY } }
            }
            ],
      { useNativeDriver: true }
    )}
        >
        <View style={{
          marginTop: scale(80) + insets.top,
          gap:scale(30),
          paddingHorizontal: scale(15)
        }}>
      
         <View style={{
          gap: scale(15)
         }}>
         <Text style={{
            color: 'white',
            fontSize: scale(24),
            fontWeight: 'bold',
          }}>Самовивіз</Text>
         <View style={{
            gap: scale(15),
            flexDirection: 'row'
          }}>
            <View style={{
              backgroundColor: Colors.mDark,
              width: scale(120),
              height: scale(120),
              padding: scale(10),
              borderRadius: scale(15),
              gap:scale(10)         
            }}>
              <SimpleSwitch size={scale(30)} disabled value={true}/>
              <Text style={{
                  color:'white',
                  fontSize: scale(14),
                  fontWeight: 'bold'
                }}>Заберу сам</Text>
            </View>

            <View
            style={[{
              width: scale(120),
              height: scale(120),
              padding: scale(10),
              borderRadius: scale(15),
              gap:scale(10)         
            }, isTimeSelected ? {backgroundColor: Colors.mDark} : {backgroundColor: Colors.mDark15}
            ]}>
              <SimpleSwitch size={scale(30)} value={isTimeSelected}/>
              <Text style={{
                  color:'white',
                  fontSize: scale(14),
                  fontWeight: 'bold'
                }}>Заберу {isTimeSelected? `в ${selectedTime}`: 'ось-ось...'}</Text>
            </View>

          </View>
                
         </View>

          {models.spot && 
            <PickUpTimesBlock spot={models.spot} {...{selectedTime, setSelectedTime, defaultTime}}/>
          }

          <View style={{
            borderRadius: scale(15),
            overflow: 'hidden',
            gap: scale(5)
          }}>
            
        <PlaceInfoBlock spot={models.spot} spotName={cart.spotName}/>
              

          </View>

          <View style={{
            gap: scale(15),
            // marginTop: scale(15)
          }}>
            <Text style={{
              color: 'white',
              fontSize: scale(18),
              fontWeight: 'bold'
            }}>Програма лояльності</Text>
            <View style={{
              width: '100%',
              padding: scale(15),
              borderRadius: scale(15),
              backgroundColor: '#151515',
              flexDirection: 'row',
              alignItems: 'center',
              gap: scale(15)
            }}>
              <Octicons name="x-circle" size={24} color="white" />
              <Text style={{
                color: 'white',
                fontSize: scale(12),
                width: scale(250)
              }}>На жаль, у тебе жодної картки лояльності цього закладу</Text>
            </View>
          </View>
          </View>

          <View style={{
            backgroundColor: Colors.darky,
            borderTopLeftRadius: scale(15),
            borderTopRightRadius: scale(15),
            marginTop: scale(15)
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
              gap: scale(10),
            }}>
          
          
            <View style={{
              flexDirection:'row',
              justifyContent: 'space-between',
            }}>
              <Text style={{color: 'white', fontSize: scale(12)}}>Замовлення</Text>
              <Text style={{color: 'white', fontSize: scale(12)}}>{formatPrice(price)}</Text>
            </View>
            <View style={{
              flexDirection:'row',
              justifyContent: 'space-between',
            }}>
              <Text style={{color: 'white', fontSize: scale(12)}}>Кешбек</Text>
              <Text style={{color: 'white', fontSize: scale(12)}}>-0 ₴</Text>
            </View>

            <View style={{
              flexDirection:'row',
              justifyContent: 'space-between',
              marginTop: scale(5)
            }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: scale(16)}}>Підсумок</Text>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: scale(16)}}>{formatPrice(price)}</Text>
            </View>
          <Pressable 
          onPress={()=>{
            handleMakeOrder()
          }}
          android_ripple={{ color: 'rgba(255,120,120,0.3)' }}
          style={{flex: 1,
          backgroundColor: Colors.mDark,
          justifyContent: 'center',
          alignItems: 'center',
          padding: scale(15),
          borderRadius: scale(15),
          marginTop: scale(15),
          }}>
            <Text style={{color: 'white', fontSize: scale(16), fontWeight: 'bold'}}>Оформити</Text>
          </Pressable>
            </View>
          </View>

        
      </Animated.ScrollView>
      <CancelModal reference={cancelModalRef} price={formatPrice(price)} time={selectedTime}/>
      </View>
    )
}
export default CartAcceptScreen