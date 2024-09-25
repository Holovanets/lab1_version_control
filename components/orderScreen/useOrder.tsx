import { ApiConstants } from '@/constants';
import { useAuth } from '@/context';
import mySocket from '@/services/mySocket';
import { useSegments } from 'expo-router';
import { useEffect, useState } from 'react'

export type TOrderResponse = {
  spotId: number;
  spotName: string;
  clientDetails: {
      user: string;
      phone: string;
  };
  clientId: number;
  status: 'NEW' | 'APPLY' | 'PROCESS' | 'READY' | 'DENY' | 'ARCHIVED';
  details: Array<{
      dishId: number;
      amount: number;
      image: string;
      groups: Array<{
          id: number;
          max: number;
          min: number;
          name: string;
          additives: Array<{
              id: number;
              name: string;
              price: number;
              selectedAmount: number;
          }>;
      }>;
      name: string;
      price: number;
      mealCost: number;
      ready: boolean;
  }>;
  comment: string;
  desiredTime: number;
  time: number;
  payment: 'CASH' | string; 
  createdAt: number;
  total: number;
  orderId: number;

};

const useOrder = (orderId: number) => {
  const [order, setOrder] = useState<TOrderResponse | null>(null);
  const {authToken, refreshAuthToken} = useAuth()
  // console.log('Use Order. Пытаюсь получить заказ', orderId, '. Токен :', authToken);
  // console.log(JSON.stringify(order));
  
  useEffect(() => {
    if (authToken) {
      console.log(authToken);
      
      const socket = mySocket(authToken);

      socket.on('connect_error', (e: any) => {
        console.error('SocketIO dont connect', e.message);
        // refreshAuthToken()
        });
        
        socket.emit('sendGetOrder', {"id":orderId}, (result: TOrderResponse) => {
          console.log('Заказ получил');
          
          setOrder(result);
        });
        socket.on(`my_orders_${authToken}`, (update) => {
          if (update.message && update.message.orderId === orderId) {
            console.log('Message:', update.message);
            console.log('Type:', update.type);
            console.log('All:', update);
            setOrder(update.message); // Обновляем состояние только если это нужный заказ
          }
        });
        socket.emit('connect-error',   (response : any) => {
          console.error('На сокетк токен устарел', JSON.stringify(response));
          console.log(response);
          
          // refreshAuthToken()
        });
        
        // Очистка при размонтировании компонента
        return () => {
          socket.off('connect_error');
          socket.off(`my_orders_${authToken}`);
          socket.disconnect();
        };
      }
  }, [authToken, orderId]); 
  return order;
};

export default useOrder;