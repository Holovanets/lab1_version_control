import { ApiConstants } from "@/constants"
import { useAuth } from "@/context"
import axios, { AxiosResponse } from "axios"
import { useState } from "react"

export type LoverResponse ={
  spotId: number
  dishes: TLikedMenu[]
}

export type TLikedMenu = {
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
  groups: Array<{
    id: number;
    max: number;
    min: number;
    name: string;
    additives: Array<{
        id: number;
        name: string;
        price: number;
        selectedAmount: number;
    }>;
}>;
  calories:{
    calories: number
    proteins: number
    fats: number
    carbohydrates: number
  } 
  description: string | null
  weights: {
    weightId: number | null
    value: number | null
  }[]
  image: string | null
  position: number
  visible: boolean
  liked: number
  delivery: []
  categoryId: number
}

export const useMyLoverDishes = () =>{
  const requestNetworkPlacesURL = `${ApiConstants.BACKEND_API.BASE_API_URL}/menu/liked-dishes`

  const {authToken} = useAuth()

  const [isLoverDishesLoading, setIsLoverDishesLoading] = useState(true)
  const [loverDishes, setLoverDishes] = useState<LoverResponse[]>()

  const getDishes = async () =>{
  
    setIsLoverDishesLoading(true)
  try{
    const {data} = await axios.get<any,AxiosResponse<LoverResponse[]>>(requestNetworkPlacesURL,
      {
        params:{
          lang: 'uk'
        },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })        
      setLoverDishes(data)
      // console.log(data);
      
  }catch(err){
    console.log('useLoverDishes getDishes Error : ', err );
    
  }finally{
    setIsLoverDishesLoading(false)
  }
  
}

  return {
		allLoverDishesModels: { loverDishes, isLoverDishesLoading},
		allLoverDishesOperations: { getDishes  },
}
}