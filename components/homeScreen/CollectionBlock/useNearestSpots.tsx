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
  isVisivle: boolean
  isVerified: boolean
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

export const useNearestSpots = () =>{
  const requestNearestURL = `${ApiConstants.BACKEND_API.BASE_API_URL}/spots/near-best`

  const {userLocation} = useUserLocationStateContext()
  const {authToken} = useAuth()

  const [isLoadingNearest, setIsLoadingNearest] = useState(false)
 
  const [nearestSpots, setNearestSpots] = useState<SpotItem[]>()

  const getNearest = async () =>{
  
  setIsLoadingNearest(true)
  try{
    const {data} = await axios.get<any,AxiosResponse<SpotItem[]>>(requestNearestURL,
      {
        params:{
          geolat: userLocation?.coords.latitude || 46.3698536,
          geolng: userLocation?.coords.longitude || 30.726982,
          radius: 50000,
          limit: 10,
          skip: 0,
          stars: true
        },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })        
      setNearestSpots(data)
  }catch(err){
    console.log('useNearestSpots getNearest Error : ', err );
    
  }finally{
    setIsLoadingNearest(false)
  }
  
}
const requestTopPositionsURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.MENU}/top-liked`

const [isLoadingTopLiked, setIsLoadingTopLiked] = useState(false)
 
const [topLiked, setTopLiked] = useState<DishItem[]>()

const getTopLiked = async (spotId: number) =>{
  
  setIsLoadingTopLiked(true)
  try{
    const {data} = await axios.get<any,AxiosResponse<DishItem[]>>(requestTopPositionsURL,
      {
        params:{
          spotId: spotId,
          max: 2,
          lang: 'uk'
        },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })        
      setTopLiked(data)
  }catch(err){
    console.log('useNearestSpots getTopLiked Error : ', err );
    
  }finally{
    setIsLoadingTopLiked(false)
  }
  
}
  return {
		models: { nearestSpots, isLoadingNearest, topLiked },
		operations: { getNearest, getTopLiked },
}
}