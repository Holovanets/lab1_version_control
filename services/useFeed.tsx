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

export const useFeed = () =>{
  const requestNearestURL = `${ApiConstants.BACKEND_API.BASE_API_URL}/spots/nearest`

  const {userLocation} = useUserLocationStateContext()
  const {authToken} = useAuth()

  const [isLoadingNearest, setIsLoadingNearest] = useState(false)
 
  const [nearestSpots, setNearestSpots] = useState<SpotItem[]>()
  const getNearest = async (page: number) => {
    setIsLoadingNearest(true);
    try {
      const response = await axios.get<SpotItem[]>(requestNearestURL, {
        params: {
          geolat: userLocation?.coords.latitude || 46.3698536,
          geolng: userLocation?.coords.longitude || 30.726982,
          limit: 6,
          skip: page * 6,
          stars: true,
          electricity: true
        },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      // console.log(response.data);
      return response.data; // Прямо возвращаем массив SpotItem
    } catch (err) {
      console.log('useNearestSpots getNearest Error:', err);
      return [];
    } finally {
      setIsLoadingNearest(false);
    }
  };


  return {
		feedModels: { nearestSpots, isLoadingNearest },
		feedOperations: { getNearest }
}
}