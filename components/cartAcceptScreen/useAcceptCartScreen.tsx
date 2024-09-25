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
  logo?: string,
  poster?: string,
  cover?: string
  lastPost: number
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
  wifi: {
    name: string
    password: string
  }
  socials: {
    type: string,
    link: string,
    name?: string | null,
  }[]
  isVerified: boolean
  isVisible: boolean
}

export const useAcceptCartScreen = (placeId: number)=> {
  const requestPlaceURL = `${ApiConstants.BACKEND_API.BASE_API_URL}/spots/get/${placeId}`
  const makeOrderURL = `https://cityfood.com.ua/api/menu/make-order?lang=uk`
  const {authToken} = useAuth()
  const [isLoadingSpot, setIsLoadingSpot] = useState(true)
 
  const [spot, setSpot] = useState<ScreenSpotItem>()

  const getThisSpot = async () =>{
  
    setIsLoadingSpot(true)
  try{
    const {data} = await axios.get<any,AxiosResponse<ScreenSpotItem>>(requestPlaceURL,
      {
        params:{
          // stars: true,
          worktime: true,
          location: true,
          // kitchen: true,
          // socials: true,
          // wifi: true
        },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })        
      setSpot(data)
  }catch(err){
    console.log('usePlaceScreen getThisSpot Error : ', err );
    
  }finally{
    setIsLoadingSpot(false)
  }
  
}

const makeOrder = async (order: any) => {
  console.log(JSON.stringify(order));
  
  try {
    const response = await axios.post(makeOrderURL, {
      ...order
    }, {
      headers: { // Правильное использование ключа для заголовков
        Authorization: `Bearer ${authToken}`
        // Здесь вы можете добавить другие заголовки, если это необходимо
      }
    });

    const data = response.data;
    console.log('zaebis', data);
    return data;
    
  } catch (error) {
    console.error('Error making order:', error); // Изменён текст ошибки для соответствия контексту
    return null;
  }
};

  return {
		models: {spot,isLoadingSpot},
		operations: { getThisSpot,makeOrder },
}
}
