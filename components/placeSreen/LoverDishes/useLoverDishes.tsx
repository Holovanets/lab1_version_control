import { ApiConstants } from "@/constants"
import { useAuth } from "@/context"
import axios, { AxiosResponse } from "axios"
import { useState } from "react"

type LoverResponse ={
  spotId: number
  dishes: DishItem[]
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

export const useLoverDishes = (spotId: number) =>{
  const requestNetworkPlacesURL = `${ApiConstants.BACKEND_API.BASE_API_URL}/menu/liked-dishes`

  const {authToken} = useAuth()

  const [isLoverDishesLoading, setIsLoverDishesLoading] = useState(true)
  const [loverDishes, setLoverDishes] = useState<DishItem[]>()

  const getDishes = async () =>{
  
    setIsLoverDishesLoading(true)
  try{
    const {data} = await axios.get<any,AxiosResponse<LoverResponse[]>>(requestNetworkPlacesURL,
      {
        params:{
          spotIds: spotId,
          lang: 'uk'
        },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })        
      setLoverDishes(data[0].dishes)
      // console.log(data);
      
  }catch(err){
    console.log('useLoverDishes getDishes Error : ', err );
    
  }finally{
    setIsLoverDishesLoading(false)
  }
  
}

  return {
		loverDishesModels: { loverDishes, isLoverDishesLoading},
		loverDishesOperations: { getDishes  },
}
}