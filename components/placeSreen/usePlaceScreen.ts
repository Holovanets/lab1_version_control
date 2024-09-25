import { ApiConstants } from "@/constants";
import { useAuth } from "@/context";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

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
export type ScreenSpotItem ={
  id: number
  owner: number
  name: string
  description?: string
  slug?: string
  logo?: string
  poster?: string
  cover?: string
  lastPost: number
  isVisible: boolean
  isVerified: boolean
  organizationId: number
  location: {
    geolat: number,
    geolng: number,
    city: string,
    address: string,
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
  kitchen: {
    type: string,
    other?: string
  }
  wifi?: {
    name: string | null
    password: string | null
  }
  socials: {
    type: string,
    link: string,
    name?: string | null,
  }[]
  electricity: {
    spotId: number,
    status: number,
    share: number,
  } | null
}

export const usePlaceScreen = (placeId: number)=> {
  const requestPlaceURL = `${ApiConstants.BACKEND_API.BASE_API_URL}/spots/get/${placeId}`
  const {authToken} = useAuth()
  const [isLoadingSpot, setIsLoadingSpot] = useState(true)
 
  const [spot, setSpot] = useState<ScreenSpotItem | null>()

  const getThisSpot = async () =>{
  
    setIsLoadingSpot(true)
  try{
    const {data} = await axios.get<any,AxiosResponse<ScreenSpotItem>>(requestPlaceURL,
      {
        params:{
          stars: true,
          worktime: true,
          location: true,
          kitchen: true,
          socials: true,
          wifi: true,
          electricity: true
        },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })        
      setSpot(data)
  }catch(err){
    console.log('usePlaceScreen getThisSpot Error : ', err );
    setSpot(null)
    
  }finally{
    setIsLoadingSpot(false)
  }
  
}

  return {
		models: {spot,isLoadingSpot},
		operations: { getThisSpot },
}
}
