import useDebounce from '@hooks/useDebounce';

import { useEffect, useState } from 'react';

import { AddressType, getAddressByKeyword } from '../utils/convertAddress';

export const useFindAddress = () => {
  const [location, setLocation] = useState<string>('');
  const [addressList, setAddressList] = useState<AddressType[] | null>(null);

  const [query, setQuery] = useState<string>('');

  const debouncedQuery = useDebounce(query, 500);

  const handleChangeInput = (value: string) => {
    setLocation(value);
    setQuery(value);
  };

  const handleClickAddress = (value: string) => {
    setLocation(value);
    setAddressList(null);
  };

  useEffect(() => {
    const findAddress = async () => {
      if (!debouncedQuery) {
        setAddressList(null);
        return;
      }
      const data = await getAddressByKeyword(debouncedQuery);
      setAddressList(data);
    };
    findAddress();
  }, [debouncedQuery]);

  return { location, handleChangeInput, addressList, handleClickAddress };
};
