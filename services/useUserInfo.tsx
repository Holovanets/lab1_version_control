import { useAuth, useUserLocationStateContext } from "@/context"
// import { GOOGLE_MAPS_API_KEY } from "@env"
import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"

import { Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiConstants } from "@/constants";
type AuthInfo = AxiosResponse<{
  id: number
  name: string | null
  surname: string | null
  avatar: string | null
  lastPost: number
  authMe: {
    userId: number
    email: string | null
    phone: string | null
    confirmations: {
      email: boolean
      phone: boolean
    }
  }
}>
export const useUserInfo = () =>{
  const {authToken} = useAuth()
  const [responseData, setResponseData] = useState<AuthInfo['data']>()
  const requestURL = `${ApiConstants.BACKEND_API.BASE_API_URL}/users/me`


useEffect(()=>{
  const fetchUserInfo = async ()=>{
    try{
      const { data } = await axios.get<any, AuthInfo>(requestURL, {
        params:{
          'with-auth': true
        },
        headers: {
          Authorization: `Bearer ${authToken}`
        },
      });
      setResponseData(data)
      // console.log('userInfo: ', data);
      
    }catch(err){
      console.log('useUserInfo Error :', err);
      return
    }
  }
  fetchUserInfo()
},[authToken])

 
  return responseData
}