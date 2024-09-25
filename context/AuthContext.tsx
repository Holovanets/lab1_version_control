import { useRouter, useSegments } from "expo-router";
import { FC, PropsWithChildren, ReactNode, createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ApiConstants } from "@/constants";
import { useToast } from "react-native-toast-notifications";

type UserModel = {
  confirmed: boolean
  isNew: boolean
  nameNeeded: boolean
  authMe :{
    userId: number
    email: string
    phone: string
    confirmations: {
      email: boolean
      phone: boolean
    }
  }
}
interface AuthContextProviderProps {
  children: ReactNode
}

type AuthContextType = {
  authToken: string | null
  refreshToken: string | null
  updateAuthToken: (newToken : string, newRefreshToken? : string) => void
  setRefreshToken: (refreshToken: string) => void
  refreshAuthToken: () => Promise<string | null>
  isAuthLoading: boolean
}
const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider:FC<AuthContextProviderProps > = ({children}) =>{
  const [authToken, setAuthToken] = useState<string | null>(null)
  // const [authToken, setAuthToken] = useState<string | null>('awdaw')
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const segments = useSegments()
  const router = useRouter()
  console.log(segments);
  
  const toast = useToast()
  useEffect(()=>{
    const isAuthGroup = segments[0] === '(auth)'
    if((!authToken || authToken === null) && !isAuthGroup){
      console.log('User is not yet authentificated and he cannot see this page');
      
      router.replace('/login')
    }
    if (authToken && isAuthGroup){
      router.replace('/(app)')
    }
  },[segments, authToken])
  useEffect(() => {
    const loadTokens = async () => {
      console.log('Loading tokens...');
  
      try {
        const storedAuthToken = await AsyncStorage.getItem('authToken');
        const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
        
        if (storedAuthToken) {
          setAuthToken(storedAuthToken);
        }
        if (storedRefreshToken) {
          setRefreshToken(storedRefreshToken);
        }
      } catch (error) {
        console.error('Error loading tokens:', error);
      } finally {
        setIsAuthLoading(false);
        
      }
    };
  
    loadTokens().then(() => {
      console.log('Auth token : ', authToken);
      console.log('Refresh token : ', refreshToken);
    })
  }, []);

  const updateAuthToken = async (newToken: string, newRefreshToken?: string) => {
    try {
      // Проверяем, что newToken не null и не undefined
      if (newToken || newRefreshToken) {
        const authTokenString = typeof newToken === 'string' ? newToken : JSON.stringify(newToken);
        const refreshTokenString = typeof newRefreshToken === 'string' ? newRefreshToken : JSON.stringify(newRefreshToken);
        await AsyncStorage.setItem('authToken', authTokenString);
        await AsyncStorage.setItem('refreshToken', refreshTokenString );
        setAuthToken(authTokenString);
        setRefreshToken(refreshTokenString);
        console.log('New auth token = ', authTokenString);
        console.log('New refresh token = ', refreshTokenString);
        
      }
  
      // Проверяем, что newRefreshToken не null и не undefined
      // if (newRefreshToken) {
      //   await AsyncStorage.setItem('refreshToken', newRefreshToken);
      //   setRefreshToken(newRefreshToken);
      // }
    } catch (error) {
      console.error('Error updating tokens:', error);
    }
  };
  
  const refreshTokenURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.AUTH}${ApiConstants.BACKEND_API.TOKENS}/refresh`
  const refreshAuthToken = async () => {
    try {
      const response = await axios.post(refreshTokenURL, {
        refresh_token: refreshToken
      }, {
        // Не забудьте добавить любые необходимые заголовки, если они нужны
      });
  
      const data = response.data;
      await updateAuthToken(data.auth_token, data.refresh_token);
      // console.log('Token refreshed');
      return data.auth_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      toast.show('Трабли з авторизацією, перелогінитись треба');
      setAuthToken(null)
      setRefreshToken(null)
      return null;
    }
  };
  
  




  return (
    <AuthContext.Provider value={{authToken,isAuthLoading, updateAuthToken, refreshToken, setRefreshToken, refreshAuthToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () =>{
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}