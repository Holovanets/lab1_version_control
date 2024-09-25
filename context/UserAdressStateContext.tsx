import AsyncStorage from '@react-native-async-storage/async-storage';
import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'

interface AdressStateContextProviderProps {
	children: ReactNode
}




const useAdressStateStateContextValue = () => {
	const [userAdress, setUserAdress] = useState<string>()
	const [isAdressLoading, setIsAdressLoading] = useState(true);
	return { userAdress, setUserAdress, isAdressLoading, setIsAdressLoading }
}

type UserAdressStateContextValue = ReturnType<
	typeof useAdressStateStateContextValue
>
const UserAdressStateContext =
	createContext<UserAdressStateContextValue | null>(null)
	export const AdressStateContextProvider = ({ children }: AdressStateContextProviderProps) => {
		
		const { userAdress, setUserAdress,isAdressLoading, setIsAdressLoading  } = useAdressStateStateContextValue();
	
		// Загрузка адреса при инициализации
		useEffect(() => {
			const loadUserAdress = async () => {
				try {
					const storedAddress = await AsyncStorage.getItem('userAdress');
					if (storedAddress) setUserAdress(JSON.parse(storedAddress));
					// console.log('address loaded :', JSON.stringify(storedAddress));
					
				} catch (error) {
					console.error('Error loading user address:', error);
				}finally{
					setIsAdressLoading(false)
				}
			};
	
			loadUserAdress();
		}, []);
	
		// Сохранение адреса при его изменении
		useEffect(() => {
			const saveUserAdress = async () => {
				try {
					await AsyncStorage.setItem('userAdress', JSON.stringify(userAdress));
					// console.log('address changed to ', userAdress);
					
				} catch (error) {
					console.error('Error saving user address:', error);
				}
			};
			if (userAdress) saveUserAdress();
		}, [userAdress]);
	
		return (
			<UserAdressStateContext.Provider value={{ userAdress, setUserAdress,isAdressLoading, setIsAdressLoading }}>
				{children}
			</UserAdressStateContext.Provider>
		);
	};
	
export const useUserAdressStateContext = () => {
	const context = useContext(UserAdressStateContext)
	if (!context) {
		throw new Error(
			'useUserLocationStateContext must be used inside UserLocationStateContextProvider'
		)
	}
	return context
}
