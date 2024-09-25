import { AdressStateContextProvider, LocationStateContextProvider,CartProvider, AuthContextProvider } from '@/context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Redirect, Slot, SplashScreen, Stack } from 'expo-router';
import { ToastProvider } from 'react-native-toast-notifications'
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Linking from 'expo-linking';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



// export const unstable_settings = {
  //   // Ensure that reloading on `/modal` keeps a back button present.
  //   initialRouteName: '(auth)/login',
  // };
  
  SplashScreen.preventAutoHideAsync();
  export default function AuthLayout() {

  return (
    <GestureHandlerRootView style={{flex:1}}>
    <BottomSheetModalProvider>
      <ToastProvider offsetTop={60}
          renderType={{
            custom_type: (toast) => (
              <View style={{padding: 15, backgroundColor: 'grey', borderLeftColor: 'orange', borderRightWidth: 5, borderRadius: 15}}>
                <Text>{toast.message}</Text>
              </View>
            )
          }}
      >
      <AuthContextProvider>
        <LocationStateContextProvider>
          <AdressStateContextProvider>
            <CartProvider>
              {/* <StompSessionProvider url="wss://your-websocket-server.com/path"> */}
                {/* <Slot/> */}
                  <Stack screenOptions={{
                    contentStyle: {
                      backgroundColor: '#070707'
                    }
                  }}>
                      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
                      <Stack.Screen name="(auth)/authentificate" options={{ headerShown: false }} />
                      <Stack.Screen name="(auth)/enterName" options={{ headerShown: false }} />
                      <Stack.Screen name="(app)" options={{ headerShown: false }} />
                  </Stack>
                {/* </StompSessionProvider> */}
            </CartProvider>
          </AdressStateContextProvider>
        </LocationStateContextProvider>
      </AuthContextProvider>
      </ToastProvider>    
    </BottomSheetModalProvider>
  </GestureHandlerRootView>
  )
}