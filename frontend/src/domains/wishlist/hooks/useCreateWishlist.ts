import { wishlist } from '@apis/wishlist';

import { validate } from '@utils/validate';

import { useState } from 'react';
import { useSearchParams } from 'react-router';

export const useCreateWishlist = () => {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleName = (name: string) => {
    setName(name);
  };

  const createWishlist = async () => {
    try {
      if (validate.isEmpty(name)) throw new Error('찜 이름을 입력하세요.');
      wishlist.post(roomId, name);
      alert('찜 목록 등록!');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return { name, handleName, error, createWishlist };
};
