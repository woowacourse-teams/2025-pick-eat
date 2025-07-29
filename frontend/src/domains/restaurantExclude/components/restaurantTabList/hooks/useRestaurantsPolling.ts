import { Restaurant, restaurants } from "@apis/restaurant";

import { useEffect, useState } from "react";


export function useRestaurantsPolling(initialData: Restaurant[] = []) {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    const [restaurantsData, setRestaurantsData] = useState<Restaurant[]>(initialData);

    useEffect(() => {
        let isUnmounted = false;

        const fetchRestaurantList = async () => {
        try {
            const data = await restaurants.get(code ?? '');
            if (!isUnmounted) setRestaurantsData(data);
        } catch (e) {
            console.error('식당 목록 가져오기 실패:', e);
            if (!isUnmounted) setRestaurantsData([]);
        }
        };

        fetchRestaurantList();

        const intervalId = setInterval(fetchRestaurantList, 10000);

        return () => {
        isUnmounted = true;
        clearInterval(intervalId);
        };
    }, [code]);

    return restaurantsData;
}

