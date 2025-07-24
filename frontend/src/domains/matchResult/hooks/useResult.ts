import { apiClient } from '@apis/apiClient';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';

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
  const [result, setResult] = useState<RestaurantResponse[]>();
  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get('code') ?? '';

  useEffect(() => {
    const fetchResult = async () => {
      const response = await apiClient.get<RestaurantResponse[]>(
        `rooms/${roomCode}/result`
      );

      if (response) setResult(response);
    };

    fetchResult();
  }, []);

  const getResult = () => {
    if (!result) return null;
    const randomIndex = Math.floor(Math.random() * result.length);

    return result[randomIndex];
  };

  return { getResult };
};

export default useResult;
