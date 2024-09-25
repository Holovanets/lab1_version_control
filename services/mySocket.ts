import { useAuth } from '@/context';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';

const mySocket = (token: string):Socket =>{

  const socket = io('https://cityfood.com.ua', {
  path: '/api/orders-socket/conn',
  query: {
      token: token,
  },
  transports: ["websocket", "polling"],
  reconnectionAttempts: 0,
  reconnectionDelay: 5000,
  reconnection: false,
  autoConnect: false,
  transportOptions: {
      polling: {
          extraHeaders: {
              'X-Control-Tokens': 'client',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
              'Access-Control-Allow-Headers': '*',
              'Content-Type': 'application/json'
          }
      },
      
  }

})
  socket.connect()
  socket.on('connect', () => {
    console.log('Socket IO connected.');
  });
  socket.emit('connect-error',  (response : any) => {
    console.error('На сокетк токен устарел', JSON.stringify(response));
    console.log(response);
    
    // refreshAuthToken()
  });
  return socket
}


export default  mySocket