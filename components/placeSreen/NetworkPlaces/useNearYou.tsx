import { ApiConstants } from "@/constants"
import { useAuth, useUserLocationStateContext } from "@/context"
import axios, { AxiosResponse } from "axios"
import { useState } from "react"
const worktimeTypes = [
  "weekdays", // будни
  "weekends", // выходные,

  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",

  "saturday",
  "sunday"
] as const;

type WorktimeType = typeof worktimeTypes[number];
export type SpotItem ={
  id: number
  owner: number
  name: string
  description?: string
  slug?: string
  logo?: string,
  poster?: string,
  cover?: string
  lastPost: number
  location: {
    geolat: number,
    geolng: number,
    city: string | null,
    address: string | null,
    distance?: number
  }
  stars: {
    star1: number,
    star2: number,
    star3: number,
    star4: number,
    star5: number,
    total: number
  } | null
  worktime: {
    spotId?: number,
    type: WorktimeType,

    start: string,
    end: string,
    nowork?: boolean
  }[]
}
export type DishItem = {
  spotId: number
  id: number
  price: number,
  priceAtDiscount: number,
  tags: {
    spotId: number
    id: number
    text: string
    color: string
  }[] | []
 
  name: string
  calories:{
    calories: number
    proteins: number
    fats: number
    carbohydrates: number
  } | {}
  description: string | null
  weight: number | null
  image: string | null
  position: number
  visible: boolean
  liked: number
  delivery: []
}

export const useNearYou = (orgId: number) =>{
  const requestNetworkPlacesURL = `${ApiConstants.BACKEND_API.BASE_API_URL}/spots/by-organization/${orgId}`

  const {userLocation} = useUserLocationStateContext()
  const {authToken} = useAuth()

  const [isLoadingNearYou, setIsLoadingNearYou] = useState(true)
 
  const [nearYouSpots, setNearYouSpots] = useState<SpotItem[]>()

  const getNearest = async () =>{
  
    setIsLoadingNearYou(true)
  try{
    const {data} = await axios.get<any,AxiosResponse<SpotItem[]>>(requestNetworkPlacesURL,
      {
        params:{
          // geolat: userLocation?.coords.latitude || 46.3698536,
          // geolng: userLocation?.coords.longitude || 30.726982,
          // limit: 10,
          // skip: 0,
          // radius: 2500,
          // stars: true
          location: true
        },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })        
      setNearYouSpots(data)
  }catch(err){
    console.log('useNearYou getNearest(Network places) Error : ', err );
    
  }finally{
    setIsLoadingNearYou(false)
  }
  
}

  return {
		models: { nearYouSpots, isLoadingNearYou },
		operations: { getNearest },
}
}