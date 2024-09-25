import { ApiConstants } from "@/constants"
import axios, { AxiosResponse } from "axios"

type LoginResponse = AxiosResponse<{
  message : string
}>
type AuthResponse = AxiosResponse<{
  confirmed: boolean
  isNew: boolean
  nameNeeded: boolean
  authMe: {
    userId: number
    email: string
    phone: string
    confirmations: {
      email: boolean
      phone: boolean
    }
  }
  tokens:{
    auth_token: string
    refresh_token: string
  }
}>
type AuthWithNameResponse = AxiosResponse<{
  done: boolean
  authMe: {
    userId: number
    email: string
    phone: string
    confirmations: {
      email: boolean
      phone: boolean
    }
  }
  tokens: {
    auth_token: string
    refresh_token: string
  }
}>
export const loginRequest = async (data: {phone:string})=>{
  const requestLoginURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.AUTH}${ApiConstants.BACKEND_API.BY_PHONE}/request-auth`
    const res = await axios.post<any,LoginResponse>(requestLoginURL,
      {
          phone: data.phone,
      }).then().catch(err => {throw new Error('Щось напуталось під час авторизації') })

}
export const authentificateRequest = async (data: {phone: string, code: string})=>{
  const requestAuthentificateURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.AUTH}${ApiConstants.BACKEND_API.BY_PHONE}/auth-code`
    const res = await axios.post<any,AuthResponse>(requestAuthentificateURL ,
      {
          phone: data.phone,
          code: data.code
      })
      if(res.status !== 200){
        throw new Error('Error during the login process')
      }
      return res.data
}
export const authentificateWithNameRequest = async (data: {phone: string, code: string, name: string, surname: string})=>{
  const requestAuthentificateURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.AUTH}${ApiConstants.BACKEND_API.BY_PHONE}/set-name`
    const res = await axios.post<any,AuthWithNameResponse>(requestAuthentificateURL ,
      {
          phone: data.phone,
          code: data.code,
          name: data.name,
          surname:data.surname
      })
      if(res.status !== 200){
        throw new Error('Error during the login process')
      }
      return res.data
}