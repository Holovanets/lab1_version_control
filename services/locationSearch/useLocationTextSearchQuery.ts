import { useUserLocationStateContext } from "@/context"
// import { GOOGLE_MAPS_API_KEY } from "@env"
import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { LocationTextSearchItem } from "./types/LocationTextSearchItem"
import { Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
type LocationTextSearchQueryResponse = AxiosResponse<{
  status: string,
  results: LocationTextSearchItem[]
}>

export const useLocationTextSearchQuery = (searchQuery?: string) =>{
  const [responseData, setResponseData] = useState<LocationTextSearchQueryResponse['data']>()
  const {userLocation} = useUserLocationStateContext()


  const requestURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json'

  useEffect(()=>{
    if(searchQuery && searchQuery !== ''){
      (async () => {
        try{
          const {data} = await axios.get<any, LocationTextSearchQueryResponse>(requestURL,{
            params:{
              query: searchQuery,
              location: `${userLocation?.coords.latitude},${userLocation?.coords.longitude}`,
              language: 'uk',
              //TODO Понять почему ключ не подтягивается из env файла
              key: 'AIzaSyD1sq7kt50Rx3K--skpSGRIxby0S6woHU8'
            }
          })
          setResponseData(data)
        }catch(err){
          console.log('useLocationTextSearch Error :', err);
          Alert.alert(
            `text search err: `,
            `${err}`,
            [{ text: 'OK' }],
            { cancelable: false }
          )
          return
        }
      })()
    }
  },[searchQuery,userLocation?.coords.latitude,userLocation?.coords.longitude])
  return {responseData}
}