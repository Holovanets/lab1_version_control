import { LoginScreen} from '@/components'
import { Colors } from '@/constants'
import { useAuth } from '@/context'
import { SplashScreen } from 'expo-router'
import { FC, useEffect, useRef } from 'react'
import { Animated, Text, View } from 'react-native'




const Login: FC = () => {
	const {authToken, refreshToken, isAuthLoading} = useAuth()
	useEffect(()=>{
		const screen = async ()=>{
			await SplashScreen.hideAsync()
		}
		if(!refreshToken && !isAuthLoading){
			screen()
		}
	},[isAuthLoading])
	
	return (
			<LoginScreen/>
	)
}

export default Login
