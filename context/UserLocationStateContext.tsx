import AsyncStorage from '@react-native-async-storage/async-storage'
import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'

interface LocationStateContextProviderProps {
	children: ReactNode
}

type UserLocation = {
	coords: { latitude: number; longitude: number }
}

const useLocationStateStateContextValue = () => {
	const [userLocation, setUserLocation] = useState<UserLocation>()
	return { userLocation, setUserLocation }
}


type UserLocationStateContextValue = ReturnType<
	typeof useLocationStateStateContextValue
>
const UserLocationStateContext =
	createContext<UserLocationStateContextValue | null>(null)

	export const LocationStateContextProvider = ({ children }: LocationStateContextProviderProps) => {
		const { userLocation, setUserLocation } = useLocationStateStateContextValue();
	
		// Загрузка локации при инициализации
		useEffect(() => {
			const loadUserLocation = async () => {
				try {
					const storedLocation = await AsyncStorage.getItem('userLocation');
					if (storedLocation) {
						setUserLocation(JSON.parse(storedLocation));
						// console.log('location loaded is: ', JSON.stringify(storedLocation));
						
					}
				} catch (error) {
					console.error('Error loading user location:', error);
				}
			};
	
			loadUserLocation();
		}, []);
	
		// Сохранение локации при ее изменении
		useEffect(() => {
			const saveUserLocation = async () => {
				try {
					await AsyncStorage.setItem('userLocation', JSON.stringify(userLocation));
					// console.log('location changed to: ', JSON.stringify(userLocation));
					
				} catch (error) {
					console.error('Error saving user location:', error);
				}
			};
	
			if (userLocation) saveUserLocation();
		}, [userLocation]);
	
		return (
			<UserLocationStateContext.Provider value={{ userLocation, setUserLocation }}>
				{children}
			</UserLocationStateContext.Provider>
		);
	};
	

export const useUserLocationStateContext = () => {
	const context = useContext(UserLocationStateContext)
	if (!context) {
		throw new Error(
			'useUserLocationStateContext must be used inside UserLocationStateContextProvider'
		)
	}
	return context
}
