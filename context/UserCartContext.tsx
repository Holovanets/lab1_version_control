import React, { createContext, useState, useEffect, useContext, ReactNode, FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';

interface Additive {
  id: number;
  selectedAdditives: number[];
}

type CartItem = {
  id: number; // Dish ID
  amount: number;
  groups: Additive[]; // Array of selected groups
};

type CartType = {
  spotId: number;
  spotName: string;
  cartItems: CartItem[];
  comment: string | null; // Comment for the cart
};
interface CartContextProviderProps {
	children: ReactNode
}
type CartContextType = {
  cart: CartType;
  addToCart: (item: CartItem, spotId: number, spotName: string) => void; // Теперь включает добавки
  increaseItemQuantity: (itemId: number, spotId: number, groups: Additive[]) => void; // Теперь включает добавки
  decreaseItemQuantity: (itemId: number, spotId: number, groups: Additive[]) => void; // Теперь включает добавки
  removeAllInstancesFromCart: (itemId: number, spotId: number) => void; 
  removeItemWithAdditivesFromCart: (itemId: number, spotId: number, groups: Additive[]) => void; // Удаляет блюдо с конкретными добавками
  isInCart: (itemId: number, spotId: number) => boolean; // Проверяет наличие блюда в корзине
  countItemInCart: (itemId: number, spotId: number) => number; // Считает количество конкретного блюда в корзине
  countItemWithAdditivesInCart: (itemId: number, spotId: number, groups: Additive[]) => number;
  clearCart: () => void; // Очищает корзину
  addCommentToCart: (comment: string) => void; // Функция для установки комментария

};


const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: FC<CartContextProviderProps> = ({ children }) => {
  const toast = useToast()
  const [cart, setCart] = useState<CartType>({ spotId: 0, spotName: '', cartItems: [], comment: '' });

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) setCart(JSON.parse(storedCart));
    };

    loadCart();
  }, []);

  useEffect(() => {
      AsyncStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  // Функция для сравнения массивов чисел
  function compareNumbersArray(a: number[], b: number[]): boolean {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((num, index) => num === sortedB[index]);
  }
  
  // Обновлённая функция для сравнения массивов добавок
  function compareAdditives(a: Additive[] | null, b: Additive[] | null): boolean {
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;
    if (a.length !== b.length) return false;
  
    // Сортировка по id для последовательного сравнения
    const sortedA = [...a].sort((x, y) => x.id - y.id);
    const sortedB = [...b].sort((x, y) => x.id - y.id);
  
    // Сравнение каждого элемента в массиве
    return sortedA.every((additive, index) => 
      additive.id === sortedB[index].id &&
      compareNumbersArray(additive.selectedAdditives, sortedB[index].selectedAdditives)
    );
  }
  

const addToCart = (newItem: CartItem, spotId: number, spotName: string) => {
  setCart(currentCart => {
    if (currentCart.spotId !== spotId && currentCart.cartItems.length > 0) {
      toast.show('Сорі, котику, але спочатку потрібно очистити стару корзину', {
        type: 'custom',
        placement: 'top',
      });
      return currentCart; 
    }

    const existingItemIndex = currentCart.cartItems.findIndex(item => 
      item.id === newItem.id && compareAdditives(item.groups, newItem.groups)
    );

    const updatedCartItems = [...currentCart.cartItems];
    if (existingItemIndex > -1) {
      updatedCartItems[existingItemIndex] = {
        ...updatedCartItems[existingItemIndex],
        amount: updatedCartItems[existingItemIndex].amount + 1
      };
    } else {
      updatedCartItems.push({ ...newItem, amount: 1 });
    }

    return { ...currentCart, spotId, spotName, cartItems: updatedCartItems };
  });
};

  
  const addCommentToCart = (comment: string) => {
    setCart(currentCart => ({
      ...currentCart,
      comment: comment,
    }));
  };

  const increaseItemQuantity = (itemId: number, spotId: number, groups: Additive[]) => {
    setCart(currentCart => {
      if (currentCart.spotId === spotId) {
        const updatedCartItems = currentCart.cartItems.map(item => {
          if (item.id === itemId && compareAdditives(item.groups, groups)) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        });
        return { ...currentCart, cartItems: updatedCartItems };
      }
      return currentCart;
    });
  };
  



const removeAllInstancesFromCart = (itemId: number, spotId: number) => {
  setCart(currentCart => {
    if (currentCart.spotId === spotId) {
      return {
        ...currentCart,
        cartItems: currentCart.cartItems.filter(item => item.id !== itemId),
      };
    }
    return currentCart;
  });
};
const removeItemWithAdditivesFromCart = (itemId: number, spotId: number, groups: Additive[]) => {
  setCart(currentCart => {
    if (currentCart.spotId === spotId) {
      const updatedCartItems = currentCart.cartItems.filter(item => 
        !(item.id === itemId && compareAdditives(item.groups, groups))
      );
      return { ...currentCart, cartItems: updatedCartItems };
    }
    return currentCart;
  });
};



const decreaseItemQuantity = (itemId: number, spotId: number, groups: Additive[]) => {
  setCart(currentCart => {
    if (currentCart.spotId === spotId) {
      const updatedCartItems = currentCart.cartItems.reduce((acc, item) => {
        if (item.id === itemId && compareAdditives(item.groups, groups)) {
          const newAmount = item.amount - 1;
          if (newAmount > 0) {
            acc.push({ ...item, amount: newAmount });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as CartItem[]);
      return { ...currentCart, cartItems: updatedCartItems };
    }
    return currentCart;
  });
};



  
  
  
  const isInCart = (itemId: number, spotId: number) => {
    return cart.spotId === spotId && cart.cartItems.some(item => item.id === itemId);
  };
  
  const countItemInCart = (itemId: number, spotId: number) => {
    return cart.spotId === spotId ? cart.cartItems.reduce((total, item) => {
      return item.id === itemId ? total + item.amount : total; 
    }, 0) : 0;
  };
  
  const countItemWithAdditivesInCart = (itemId: number, spotId: number, groups: Additive[]) => {
    if (cart.spotId !== spotId) return 0;
  
    return cart.cartItems.reduce((total, item) => {
      if (item.id === itemId && compareAdditives(item.groups, groups)) {
        return total + item.amount;
      }
      return total;
    }, 0);
  };

  
  const clearCart = () => {
    setCart({ spotId: 0, spotName: '', cartItems: [], comment: '' });
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      addCommentToCart,
      increaseItemQuantity,
      removeAllInstancesFromCart,
      removeItemWithAdditivesFromCart,
      decreaseItemQuantity,
      isInCart,
      countItemInCart,
      countItemWithAdditivesInCart,
      clearCart
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
