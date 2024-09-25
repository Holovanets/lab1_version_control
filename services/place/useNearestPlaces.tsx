import { ApiConstants } from "@/constants"
import { useAuth } from "@/context"
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
  isVerified: boolean
  electricity: {
    spotId: number,
    status: number | undefined,
    share: number | undefined,
  }| null
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

export const useNearestPlaces = () =>{
  const requestNearestURL = `${ApiConstants.BACKEND_API.BASE_API_URL}/spots/near-best`

  const {authToken} = useAuth()

  const [isLoadingNearestPlaces, setIsLoadingNearestSpots] = useState(true)
 
  const [nearestPlaces, setNearestPlaces] = useState<SpotItem[]>()

  const getNearest = async (geolat: number, geolng: number,radius: number, limit: number, skip: number, stars: boolean, worktime: boolean, electricity: boolean) =>{
  
    setIsLoadingNearestSpots(true)
  try{
    const {data} = await axios.get<any,AxiosResponse<SpotItem[]>>(requestNearestURL,
      {
        params:{
          geolat: geolat || 46.3698536,
          geolng: geolng || 30.726982,
          radius: radius || 5000,
          limit: limit || 10,
          skip: skip || 0,
          stars: stars || false,
          worktime: worktime || false,
          electricity: electricity || false
        },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })        
      setNearestPlaces(data)
  }catch(err){
    console.log('useNearestPlaces getNearest Error : ', err );
    
  }finally{
    setIsLoadingNearestSpots(false)
  }
  
}

  return {
		nearestPlacesModels: { nearestPlaces, isLoadingNearestPlaces },
		nearestPlacesOperations: { getNearest },
}
}