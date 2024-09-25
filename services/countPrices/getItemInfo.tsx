import { ApiConstants } from "@/constants"
import { useAuth, useUserLocationStateContext } from "@/context"
import axios, { AxiosResponse } from "axios"
import { useState } from "react"
interface Additive {
  id: number;
  price: number; // Предположим, что у добавки есть цена
  name: string; // И имя
}
interface AdditivesGroup {
  id: number;
  name: string;
  additives: Additive[];
  max: number;
  min: number;
  multipleSelection: boolean;
  uiPosition: number;
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
    id: number
    calories: number
    proteins: number
    fats: number
    carbohydrates: number
  } 
  description: string | null
  categoryId: number
  weight: number | null
  image: string | null
  position: number
  visible: boolean
  liked: number
  delivery: []
  groups:AdditivesGroup[]
}

export const getItemInfo = () =>{
  const requestItemURL = `${ApiConstants.BACKEND_API.BASE_API_URL}/menu`

  const {authToken} = useAuth()

  const [isLoadingItem, setIsLoadingItem] = useState(false)
  const [itemDetails, setItemDetails] = useState<DishItem | null>(null)

  const getItem = async (spotId: number, id: number) => {
    console.log(id);
    
    setIsLoadingItem(true);
    try {
      const response = await axios.get<DishItem>(requestItemURL, {
        params: {
          spotId: spotId,
          id: id,
          lang: 'uk'
        },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setItemDetails(response.data)
    } catch (err) {
      console.log('getItemPrice getItemCost Error:', err);
    } finally {
      setIsLoadingItem(false);
    }
  };
  const getItemReturn = async (spotId: number, id: number) => {
    try {
      const response = await axios.get<DishItem>(requestItemURL, {
        params: {
          spotId: spotId,
          id: id,
          lang: 'uk'
        },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return response.data
    } catch (err) {
      console.log('getItemPrice getItemCost Error:', err);
    }
  };


  return {
		itemModels: { isLoadingItem,itemDetails },
		itemOperations: { getItem,getItemReturn}
}
}