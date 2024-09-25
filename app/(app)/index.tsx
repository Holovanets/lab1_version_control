import { useUserAdressStateContext, useUserLocationStateContext } from "@/context"
import { Redirect, SplashScreen, useRouter } from "expo-router"
import { useEffect } from "react"

function Index (){
	const {userLocation, setUserLocation} = useUserLocationStateContext()
	const {userAdress, setUserAdress } = useUserAdressStateContext()
	const router = useRouter()

	if (!userLocation || !userAdress || userAdress === 'Неможливо визначити адресу') {
		return <Redirect href='/(app)/setInitialLocation'/>
		// router.push('/setInitialLocation')
	}else{
    return <Redirect href='/(app)/home'/>
		// router.push('/(app)/home')
  }
}
export default Index