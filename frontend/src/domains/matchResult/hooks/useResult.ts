import { apiClient } from '@apis/apiClient';
import { useState, useEffect } from 'react';

type RestaurantResponse = {
  id: number;
  name: string;
  category: '한식' | '중식' | '일식' | '양식' | '기타';
  distance: number;
  roadAddressName: string;
  likeCount: number;
  x: number;
  y: number;
};

const useResult = () => {
  const [result, setResult] = useState<RestaurantResponse>();
  const roomCode = '05882bbe-93f9-4b5c-8c33-52d9b6732939';

  useEffect(() => {
    const fetchResult = async () => {
      const response = await apiClient.get<RestaurantResponse>(
        `/rooms/${roomCode}/result`,
        {
          'Content-Type': 'application/json',
        }
      );

      if (response) setResult(response);
    };

    fetchResult();
  }, []);

  return { result };
};

export default useResult;
