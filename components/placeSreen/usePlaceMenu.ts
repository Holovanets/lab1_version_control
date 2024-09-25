
import { ApiConstants } from '@/constants'
import { useAuth } from '@/context'
import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

type PlaceMenuResponse = AxiosResponse<{
    spotId: number
    id: number
    price: number
    salePrice: number | null
    tags: {
      spotId: number
      id: number
      text: string
      color: string
    }[] | []
    category: {
      spotId: number
      id: number
      name: string
      description: string | null
    }
    // name: {
    //   locale: 'en' | 'uk'
    //   value: string
    // }[]
    name:string
    calories: string | null
    description: string | null
    weight: number | null
    image: string | null
    position: number 
}[]>
export type PlaceCategoriesResponse = {
    spotId: number
    id: number
    name: string
    description: string | null
    dishVisible: boolean 
 
}
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
  // name: {
  //   locale: 'uk' | 'en'
  //   value: string
  // }[]
  name: string
  calories:{
    calories: number
    proteins: number
    fats: number
    carbohydrates: number
  } | {}
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
}[]>
type DishLikesResponse = AxiosResponse<{
  response: number
}>
type DishIsLikeResponse= AxiosResponse<{
  response: boolean
}>


const requestMenuURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.MENU}`
const requestCategoriesURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.MENU}${ApiConstants.BACKEND_API.CATEGORY}`
const requestGetByCategoryURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.MENU}/filter`
const requestGetDishLikesURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.MENU}/get-likes`
const requestGetDishIsLikedURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.MENU}/is-liked`
const requestPutLikeDishURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.MENU}/like`
const requestDeleteLikeURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.MENU}/dislike`


export const usePlaceMenu = (placeId: number) => {
  const [placeMenu, setPlaceMenu] = useState<PlaceMenuResponse['data']>()
  const [placeCategories, setPlaceCategories] = useState<PlaceCategoriesResponse[]>()
  const [loadingMenu, setLoadingMenu] = useState(false)
  const [loadingCategories, setLoadingCategories] = useState(false)
  const {authToken} = useAuth()

  const getMenu = async () =>{
    setLoadingMenu(true)
    try{
      const {data} = await axios.get<any,PlaceMenuResponse>(requestMenuURL,
        {
          params:{
            spotId: placeId,
            lang: 'uk'
          },
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })        
        setPlaceMenu(data)
    }catch(err){
      console.log('usePlaceMenu getMenu Error : ', err );
      
    }finally{
      setLoadingMenu(false)
    }
    
  }
  
  const getCategories = async () =>{
    // console.log('getting categories');
    
    setLoadingCategories(true)
    try{
      const {data} = await axios.get<any,AxiosResponse<PlaceCategoriesResponse[]>>(requestCategoriesURL,
        {
          params:{
            spotId: placeId,
            lang: 'uk'
          },
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
       
        setPlaceCategories(data)
    }catch(err){
      console.log('usePlaceMenu getCategories Error : ', err );
      
    }finally{
      setLoadingCategories(false)
    }
  }
  const getDishByCategory = async (categoryId: number) =>{    
        try{
          const {data} = await axios.get<any,PlaceDishResponse>(requestGetByCategoryURL,
            {
              params:{
                spotId: placeId,
                categoryId: categoryId,
                lang: 'uk'
              },
              headers: {
                Authorization: `Bearer ${authToken}`
              }
            })
            // setDishes(data)
            return(data)
        }catch(err){
          console.log('usePlaceMenu getDishByCategory Error: ', err)
        }
  }

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

	return {
		models: { placeMenu, placeCategories, loadingMenu,loadingCategories },
		operations: { getMenu, getCategories, getDishByCategory,getDishLikes,getDishIsLiked, putLikeDish, deleteLikeDish},
}
}
