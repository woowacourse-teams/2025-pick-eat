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
  const roomCode = '36f41043-01a3-401d-bdc6-e984b62722d3';

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
