import { ApiConstants } from "@/constants"
import { useAuth } from "@/context"
import axios, { AxiosResponse } from "axios"

export type PlaceDishResponse = AxiosResponse<{
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
  } 
  groups: {
    spotId: number
    id: number
    name: string
    max: number
    min: number
    additives: {
      id: number
      price: number
      name: string
      selectedAmount: number
      selected: boolean
    }[]
  }[]
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
}>
type DishLikesResponse = AxiosResponse<{
  response: number
}>
type DishIsLikeResponse= AxiosResponse<{
  response: boolean
}>

const requestGetDish = `${ApiConstants.BACKEND_API.BASE_API_URL}/menu`
const requestGetDishLikesURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.MENU}/get-likes`
const requestGetDishIsLikedURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.MENU}/is-liked`
const requestPutLikeDishURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.MENU}/like`
const requestDeleteLikeURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.MENU}/dislike`


export const useDish = (placeId: number) =>{
  const {authToken} = useAuth()
  const fishDescriptions = [
		"Опис страви вкрали інопланетяни",
		"Опис цієї страви з'їв QR-кіт 😸, така вона смачна",
		"Хтось бачив опис до цієї страви?",
		"Руки опускаються... Де ж опис до страви?",
		"Опису не буде.",
		"Страва є, фоточка є, ціна є. Але я точно щось забув..."
	]
  const getDishLikes = async (dishId: number) =>{    
    try{
      const {data} = await axios.get<any,DishLikesResponse>(requestGetDishLikesURL,
        {
          params:{
            spotId: placeId,
            id: dishId,

          },
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        // setDishes(data)
        return(data)
    }catch(err){
      console.log('usePlaceMenu getDishLikes Error: ', err)
    }
}
const getDishIsLiked = async (dishId: number) =>{    
    try{
      const {data} = await axios.get<any,DishIsLikeResponse>(requestGetDishIsLikedURL,
        {
          params:{
            spotId: placeId,
            id: dishId,

          },
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        // setDishes(data)
        return(data)
    }catch(err){
      console.log('usePlaceMenu getDishIsLike Error: ', err)
    }
}
const putLikeDish = async (dishId: number) => {
try {
    const response = await axios.put(`${requestPutLikeDishURL}?spotId=${placeId}&id=${dishId}`, {}, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return response.status;
} catch (err) {
    console.log('usePlaceMenu PutLikeDish Error: ', err);
}
};


const deleteLikeDish = async (dishId: number) =>{    
try{
  const data = await axios.delete<any,DishIsLikeResponse>(requestDeleteLikeURL,
    {
      params:{
        spotId: placeId,
        id: dishId,
      },
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    // setDishes(data)
    return(data.status)
}catch(err){
  console.log('usePlaceMenu deleteLikeDish Error: ', err)
}
}

  const getDish = async (dishId: number) =>{    
    try{
      const {data} = await axios.get<any,PlaceDishResponse>(requestGetDish,
        {
          params:{
            spotId: placeId,
            id: dishId,
            lang: 'uk',
            groups: true
          }
        })
        // setDishes(data)
        return(data)
    }catch(err){
      console.log('usePlaceMenu getDishByCategory Error: ', err)
    }
}
	return {
		models: { fishDescriptions },
		operations: { getDish,getDishLikes,getDishIsLiked, putLikeDish, deleteLikeDish },
}
}