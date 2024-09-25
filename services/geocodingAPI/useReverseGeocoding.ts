import { useUserAdressStateContext, useUserLocationStateContext } from "@/context"
import { GOOGLE_MAPS_API_KEY } from "@env"
import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { ReversGeocodingItem } from "./types/ReverseGeocodingItem"
import { Alert } from "react-native"


type ReverseGeocodingResponse = AxiosResponse<{
  // status: string,
  results: ReversGeocodingItem[]
}>


export const  useReverseGeocoding = (lat?: number, lng?: number) =>{
  const requestURL = 'https://maps.googleapis.com/maps/api/geocode/json'
  const [reverseAdress, setReverseAdress] = useState<ReverseGeocodingResponse['data']>()
  const {userAdress, setUserAdress } = useUserAdressStateContext()
  const latlng = `${lat},${lng}`

  useEffect(()=>{
    if(lat&& lng){
    (async () => {
      try{
      const {data} = await axios.get<any, ReverseGeocodingResponse>(requestURL,{
        params:{
          latlng: latlng,
          //TODO Понять почему ключ не подтягивается из env файла
          key: 'AIzaSyD1sq7kt50Rx3K--skpSGRIxby0S6woHU8',
          language: 'uk',
        }
      })
      setReverseAdress(data)
     
      
    }catch(err){
      console.log('useLocationTextSearch Error :', err);
      Alert.alert(
        `reverse goocoding err: `,
        `${err}`,
        [{ text: 'OK' }],
        { cancelable: false }
      )
      return
      }
    })()
  }
  },[lat, lng]) 
  return {reverseAdress}

}