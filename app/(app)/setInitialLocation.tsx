import { SetLocationScreen } from '@/components'
import { Colors } from '@/constants'
import { useUserAdressStateContext, useUserLocationStateContext } from '@/context'
import { Redirect, SplashScreen } from 'expo-router'
import { FC, useEffect, useRef } from 'react'
import { Animated, Text, View } from 'react-native'




const SetInitialLocation: FC = () => {
	useEffect(()=>{
		const screen = async ()=>{
			await SplashScreen.hideAsync()
		}
		screen()
	},[])
	const {userLocation, setUserLocation} = useUserLocationStateContext()
	const {userAdress, setUserAdress } = useUserAdressStateContext()
	if (userLocation && userAdress && userAdress !== 'Неможливо визначити адресу') {
		// console.log(true);
		return <Redirect href='/home'/>
	}
	return (
		<View >
			<SetLocationScreen/>
		</View>
	)
}

export default SetInitialLocation
