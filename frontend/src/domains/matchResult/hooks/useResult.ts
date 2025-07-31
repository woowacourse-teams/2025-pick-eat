import { pickeat } from '@apis/pickeat';
import { RestaurantResponse } from '@apis/restaurant';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';

const useResult = () => {
  const [result, setResult] = useState<RestaurantResponse[]>();
  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get('code') ?? '';

  useEffect(() => {
    const fetchResult = async () => {
      const response = await pickeat.getResult(roomCode);

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
