import { ApiConstants } from '@/constants';
import { useAuth } from '@/context';
import { useSegments } from 'expo-router';
import { useEffect, useState } from 'react'
import mySocket from '../mySocket';


export type TOrderResponse = {
  spotId: number;
  spotName: string;
  clientDetails: {
      user: string;
      phone: string;
  };
  clientId: number;
  status: 'NEW' | 'APPLY' | 'PROCESS' | 'READY' | 'DENY';
  details: Array<{
      dishId: number;
      amount: number;
      groups: Array<{
          id: number;
          max: number;
          min: number;
          name: string;
          groups: Array<{
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

const useCheckIsOrdersExist = (status : string[]) => {
  const segments = useSegments();
  const { authToken } = useAuth();
  const [ordersList, setOrdersList] = useState<TOrderResponse[] | null>(null);
  
  
  
  useEffect(() => {
    if (authToken) {
      const socket = mySocket(authToken);
      // socket.connect();

      // socket.on('connect', () => {
      //   // console.log('Socket IO connected');
      // });

      socket.on('connect_error', (e: any) => {
        console.log('SocketIO dont connect', e);
      });

      socket.emit('sendGetMyOrders', {"status":status}, (result: TOrderResponse[]) => {
        setOrdersList(result);
      });

      socket.on(`my_orders_${authToken}`, (update: { message: TOrderResponse; type: string }) => {
        console.log(update);
        
        if (update.type === "UPDATE") {
          setOrdersList(currentOrders => {
            if (currentOrders === null) return null;
            const updatedOrder = update.message;
            const index = currentOrders.findIndex(order => order.orderId === updatedOrder.orderId);
            if (index === -1) {
              // Если заказ не найден, добавляем его в список (опционально)
              return [...currentOrders, updatedOrder];
            } else {
              // Обновляем существующий заказ
              const updatedOrders = [...currentOrders];
              updatedOrders[index] = updatedOrder;
              return updatedOrders;
            }
          });
        }
      });

      // Очистка при размонтировании компонента
      return () => {
        // socket.off('connect');
        socket.off('connect_error');
        socket.off(`my_orders_${authToken}`);
        socket.disconnect();
      };
    }
  }, [authToken, segments]); 
  return ordersList;
};

export default useCheckIsOrdersExist;