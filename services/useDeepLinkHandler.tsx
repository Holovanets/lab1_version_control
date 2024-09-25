import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';

const useDeepLinkHandler = () => {

    const handleOpenURL = (event: Linking.EventType) => {
        console.log(event.url);
        navigateToPlace(event.url);
    };

    const navigateToPlace = (url: string) => {
        const match = url.match(/\/app\/place\/(\d+)/); // Регулярное выражение для поиска ID заведения
        if (match) {
            const placeId = match[1]; // ID заведения
            router.navigate(`/(app)/place/${placeId}`)
        }
    };

    useEffect(() => {
        const init = async () => {
            
            const url = await Linking.getInitialURL();
            if (url) {
                console.log('Initial url is: ' + url);
                navigateToPlace(url);
            }
        };

        init();

        // Создаем подписку на события URL
        const subscription = Linking.addEventListener('url', handleOpenURL);

        // Возвращаем функцию для очистки
        return () => {
            subscription.remove();
        };
    }, []);
};

export default useDeepLinkHandler;
