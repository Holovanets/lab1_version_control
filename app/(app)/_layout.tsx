import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Redirect, SplashScreen, Stack } from 'expo-router'
import {LocationStateContextProvider, AdressStateContextProvider, useUserLocationStateContext, useUserAdressStateContext, useAuth} from '@/context'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthInterceptor} from '@/services';
export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: 'index'
}

export default function RootLayoutNav() {
	useAuthInterceptor()
		return (
						<Stack screenOptions={{
							contentStyle: {
								backgroundColor: '#070707'
							}
						 }}>
							<Stack.Screen name='index' options={{ headerShown: false }} />
							<Stack.Screen name='home' options={{ headerShown: false }} />
							<Stack.Screen name='mapViewPlaces' options={{ headerShown: false }} />
							<Stack.Screen name='myLoverList' options={{ headerShown: false }} />
							<Stack.Screen name='userCard' options={{ headerShown: false }} />
							<Stack.Screen name='setLocation' options={{ headerShown: false }} />
							<Stack.Screen name='setInitialLocation' options={{ headerShown: false }} />
							<Stack.Screen name='place/[id]' options={{ headerShown: false }} />
							<Stack.Screen name='place/dish/[dishId]' options={{ headerShown: false }} />
							<Stack.Screen name='cart' options={{ headerShown: false }} />
							<Stack.Screen name='cartAccept' options={{ headerShown: false }} />
							<Stack.Screen name='order/[orderId]' options={{ headerShown: false }} />
						</Stack>
		)

}
