import { useLocalSearchParams, useNavigation } from "expo-router";
import { FC,  useEffect, useRef, useState } from "react"
import { Animated, Image, Linking, Pressable, Text, View } from "react-native";
import {  useSafeAreaInsets } from "react-native-safe-area-context"
import { scale } from "react-native-size-matters";
import useOrder from "./useOrder";
import { useAuth } from "@/context";
import OrderHeaderBar from "./OrderHeaderBar";
import { convertTimeFromUnix, formatPrice, usePlace } from "@/services";
import { Colors } from "@/constants";
import CircularProgress from "react-native-circular-progress-indicator";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import OrderTimer from "./OrderTimer";
import OrderInfoPlace from "./OrderInfoPlace";
import OrderSteps from "./OrderSteps";


const OrderScreen : FC = ()=>{
  const HEADER_HEIGHT = scale(270)
    const { orderId } = useLocalSearchParams()
    const {authToken, refreshAuthToken} = useAuth()
    const insets = useSafeAreaInsets()
    const navigation = useNavigation()
    const order = useOrder(+orderId)
    const {spotModels, spotOperations} = usePlace(order?.spotId, false, false, false, false, true)

    useEffect(()=>{
      if(order){
        spotOperations.getThisSpot()
      }     
      
    },[orderId, order?.spotId])
    // TODO Костыль ебаный
    useEffect(()=>{
      refreshAuthToken()
    },[])


    const scrollY = useRef(new Animated.Value(0)).current
      const goBack = () => {
        navigation.goBack()
      }
 
    return (
        <View style={{flex: 1}}>
            <OrderHeaderBar {...{ HEADER_HEIGHT, scrollY, goBack, orderId}}/>
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
      <View 			
      style={{
				marginTop: -1000,
				paddingTop: 1000,
				alignItems: 'center',
				overflow: 'hidden'
			}}>
        <Animated.Image
          source={spotModels.spot?.poster? { uri: spotModels.spot?.poster } : require('@/assets/images/main/empty_dish_screen.png')}
          resizeMode='cover'
          style={{
            height: HEADER_HEIGHT,
            width: '120%',
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                })
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75]
                })
              }
            ]
          }}
        />
        <Animated.Image
          source={require('/assets/images/main/gradient_dark.png')}
          resizeMode='cover'
          style={{
            marginTop: -HEADER_HEIGHT,
            height: HEADER_HEIGHT,
            width: '200%',
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                })
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75]
                })
              }
            ]
          }}
        />
	
				<Animated.View
				style={{
          position: 'absolute',
					bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: Colors.darky,
          borderTopLeftRadius: scale(20),
          borderTopRightRadius: scale(20),
          padding: scale(15),
          flexDirection: 'row',
          gap: scale(15),
					transform: [
						{
							translateY: scrollY.interpolate({
								inputRange: [0, scale(50), HEADER_HEIGHT],
								outputRange: [0, scale(30), HEADER_HEIGHT - 50],
								extrapolate: 'clamp'
							})
						}
					]
				}}
			>
          {(order?.status && order.desiredTime && order.createdAt) && (order.status !== 'ARCHIVED' && order.status !== 'DENY')
          ? <OrderTimer status={order?.status} desiredTime={order?.desiredTime} createdAt={order?.createdAt}/>
          : null
          }
			</Animated.View>
       </View>
       <View style={{
        paddingVertical: scale(15),
        gap: scale(15)
       }}>

       {order && 
        <View style={{
          paddingHorizontal: scale(15)
        }}>
          <OrderSteps status={order.status} orderCreate={order?.createdAt ? convertTimeFromUnix(order?.createdAt) : '...'}/>
        </View>
       }
       {(spotModels.spot && order?.orderId) 
       ? <OrderInfoPlace spot={spotModels.spot} orderId={order?.orderId}/> 
       : <View style={{
        height: scale(80),
        backgroundColor: Colors.mDark15,
        borderRadius: scale(15),
        marginTop: scale(15),
        marginHorizontal: scale(15  )
       }}></View> }
        <View style={{
          padding: scale(15),
          backgroundColor: '#151515',
          borderRadius: scale(15),
          marginHorizontal: scale(15),
          justifyContent: 'space-between'
        }}>
          <Text style={{
            color: 'white',
            fontSize: scale(16),
            fontWeight: 'bold'
          }}>
            Ваше замовлення
          </Text>
          <View style={{
            marginTop: scale(30),
            gap: scale(10)
          }}>
            
          {order?.details? 
            order.details.map((dish, index)=>(
              <View key={dish.dishId + index} style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
               <View style={{
                 flexDirection: 'row',
                 gap: scale(10),
               }}>

                <Image
                    source={dish?.image ? { uri: dish?.image } : require('@/assets/images/main/empty_dish_screen.png')}
                    resizeMode='cover'
                    style={{
                      borderRadius:scale(15),
                      height: scale(50),
                      width: scale(50),
                    }}
                  />
                  <View style={{
                    position: 'absolute',
                    left: scale(20),
                    top: scale(20),
                    backgroundColor: Colors.darky,
                    height: scale(30),
                    width: scale(30),
                    borderRadius:scale(15),
                    justifyContent:'center',
                    alignItems: 'center'
                  }}>
                    <Text style={{
                      color:'white',
                      fontSize: scale(12)
                    }}>x{dish.amount}</Text>
                  </View>

                  <View style={{
                    justifyContent: 'center'
                  }}>
                    <Text style={{
                      color: 'white',
                      fontSize: scale(12),
                      width: scale(150)
                    }}>
                      {dish.name || '...'}
                    </Text>

                    <View style={{
                      marginTop: scale(10)
                    }}>
                      
                    {(dish.groups.length === 0 || !dish.groups) ? (
                      <Text style={{
                        color: 'white',
                        fontSize: scale(12)
                      }}>
                        Без додатків
                      </Text>
                    ) : dish.groups.map(group => (
                        <View key={group.id + dish.dishId} style={{
                          flexDirection: 'column'
                        }}>
                            <Text  style={{
                            color: 'rgba(255,255,255,1)',
                            fontSize: scale(12),
                            width: scale(130),
                          }}>
                            {group.name || 'Додаток'}
                          </Text>
                          {group.additives.map(additive => (
                            <Text key={additive.id + dish.dishId + group.id} style={{
                              color: 'rgba(255,255,255,0.5)',
                              fontSize: scale(12),
                              width: scale(130),
                            }}>
                              {`   ${additive.name || '...'} - ${formatPrice(additive.price)} x${additive.selectedAmount}`}
                            </Text>
                          ))}
                        </View>
                        
                      ))}
                    
                    </View>
                  </View>

               </View>
                
                <View style={{
                  alignItems: 'flex-end'
                }}>

                <Text style={{
                  color: Colors.mDark,
                  fontSize: scale(14),
                  fontWeight: 'bold'
                }}>{formatPrice(dish.price)}</Text>
                </View>
              </View>
            ))
          : null}

          </View>

        </View>


        <View style={{
          padding: scale(15),
          backgroundColor: '#151515',
          borderRadius: scale(15),
          marginHorizontal: scale(15),
          justifyContent: 'space-between'
        }}>
          <Text style={{
            color: 'white',
            fontSize: scale(16),
            fontWeight: 'bold'
          }}>
            Деталі замовлення
          </Text>
          <View style={{
            marginTop: scale(30),
            gap: scale(5)
          }}>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text style={{
              color: 'white',
              fontSize: scale(14)
            }}>Комантар:</Text>
            <Text style={{
              color: 'white',
              fontSize: scale(12),
              width: scale(200),
              textAlign: 'right'
            }}>{order?.comment? order.comment : 'Без коментарів'}</Text>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text style={{
              color: 'white',
              fontSize: scale(14)
            }}>Оплата:</Text>
            <Text style={{
              color: 'white',
              fontSize: scale(12)
            }}>{order?.payment}</Text>
          </View>


          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text style={{
              color: 'white',
              fontSize: scale(14)
            }}>Отримувач:</Text>
            <Text style={{
              color: 'white',
              fontSize: scale(12)
            }}>{order?.clientDetails.user}</Text>
          </View>


          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text style={{
              color: 'white',
              fontSize: scale(14)
            }}>Створено:</Text>
            <Text style={{
              color: 'white',
              fontSize: scale(12)
            }}>{order?.createdAt ? convertTimeFromUnix(order?.createdAt) : '...'}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text style={{
              color: 'white',
              fontSize: scale(14)
            }}>До видачі:</Text>
            <Text style={{
              color: 'white',
              fontSize: scale(12)
            }}>{order?.desiredTime? convertTimeFromUnix(order?.desiredTime) : '...'}</Text>
          </View>




          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: scale(15)
          }}>
            <Text style={{
              color: 'white',
              fontSize: scale(16),
              fontWeight: 'bold'
            }}>До оплати:</Text>
            <Text style={{
              color: 'white',
              fontSize: scale(16),
              fontWeight: 'bold'
            }}>{order?.total ? formatPrice(order?.total) : '...'}</Text>
          </View>

          </View>
        </View>


       </View>
      </Animated.ScrollView>
      </View>
    )
}
export default OrderScreen