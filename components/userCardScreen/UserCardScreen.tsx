import { Colors } from "@/constants";
import { useCart } from "@/context";
import { formatPrice, useUserInfo } from "@/services";
import { useNavigation, useRouter } from "expo-router";
import { FC, useEffect, useRef, useState } from "react"
import { Animated, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { scale } from "react-native-size-matters";
import { Feather, Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import UserCardHeaderBar from "./userCardHeaderBar";
import QRCode from "react-native-qrcode-svg";
import { Ticker } from "@/atoms";
import UserCardProfile from "./UserCardProfile";
import UserCardTransactions from "./UserCardTransactions";

const userCardScreen : FC = ()=>{
    const HEADER_HEIGHT = 50
    const insets = useSafeAreaInsets()
    const navigation = useNavigation()
    const scrollY = useRef(new Animated.Value(0)).current
    const goBack = () => {
      navigation.goBack()
    }
    const [userCard, setUserCard] = useState<string>('0000000000')
    const [userName, setUserName] = useState<string>('')
    const [userAvatar, setUserAvatar] = useState<string | null>(null)
    const [userSurname, setUserSurname] = useState<string>('Завантажую')
    const userInfo = useUserInfo()
    useEffect(() => {
      if(userInfo?.authMe?.phone){
        setUserCard(userInfo.authMe.phone)
      }
      if(userInfo?.name){
        setUserName(userInfo.name)
      }
      if(userInfo?.surname){
        setUserSurname(userInfo.surname)
      }
      if(userInfo?.avatar){
        setUserAvatar(userInfo.avatar)
      }
    }, [userInfo])  

  const [cashBackValue, setCashBackValue] = useState<number>(2515)

  
    return (
      <LinearGradient
			style={{ flex: 1}}
			colors={['#21001C', '#49000F']}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
		>
        <View style={{flex: 1}}>
            <UserCardHeaderBar {...{ HEADER_HEIGHT, scrollY, goBack}}/>
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
            }}>
             
            <View style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                color: 'white',
                fontSize: scale(14)
              }}>Ваш баланс</Text>
                <View style={{
                flexDirection: 'row',
                alignItems:'center'
              }}>
                <Ticker number={(cashBackValue - (cashBackValue % 100)) / 100} textSize={scale(32)}/>
                <Text style={{ fontSize: scale(32), color: '#fff' }}>,</Text>
                <Ticker number={cashBackValue % 100} textSize={scale(32)}/>
                <Text style={{ fontSize: scale(32), color: '#fff' }}> ₴</Text>
              </View>
            </View>

            <View style={{
              backgroundColor: Colors.darky,
              padding: scale(15),
              gap: scale(15),
              borderTopEndRadius: scale(30),   
              borderTopStartRadius: scale(30),   
              marginTop: scale(30)
            }}>

           
              <View style={{
                width: '100%',
                backgroundColor: Colors.darky,
                borderRadius: scale(15),
                padding: scale(30),
                alignItems: 'center',
                overflow: 'hidden'
              }}>
                <Image
                  source={require('@/assets/images/main/userCard_left_bg.png')}
                  resizeMode="cover"
                  style={{
                    position: 'absolute',
                    height: '130%',
                    width:'50%',
                    left: -50,
                    top: -10
                  }}
                />
                <Image
                  source={require('@/assets/images/main/userCard_right_bg.png')}
                  resizeMode="cover"
                  style={{
                    position: 'absolute',
                    height: '130%',
                    width:'50%',
                    right: -50,
                    top: -10
                  }}
                />

                <View style={{  borderRadius: scale(15), padding: scale(15),overflow:'hidden', backgroundColor:'white', justifyContent: 'center', alignItems: 'center'}}>
                  <QRCode value={`${userCard || 'no phone'}`} size={scale(200)}/>
                </View>
                
              </View>
              <UserCardProfile number={userCard} name={userName} surname={userSurname} cashBackValue={cashBackValue} avatar={userAvatar}/>
              <View style={{
                padding: scale(15),
                backgroundColor: '#151515',
                borderRadius: scale(15)
              }}>
              <Text style={{
                color:'white',
                fontSize: scale(12),

              }}>
              Це твій персональний купон. Скоро ти зможеш показувіати його офіціанту, або касиру перед оплатою чеку у закладі. На цей купон накопичується твій кешбек, який ти можеш використати при створенні замовлення із додатка, онлайн меню, або для оплати у закладі.
              </Text>
              </View>
              <UserCardTransactions/>

            </View>

            </View>
          {/* <View style={{height: scale(300)}}/> */}
         </Animated.ScrollView>	
        </View>
      </LinearGradient>
    )
}
export default userCardScreen