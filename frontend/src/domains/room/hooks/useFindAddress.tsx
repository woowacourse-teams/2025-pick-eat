import useDebounce from '@hooks/useDebounce';

import { useEffect, useState } from 'react';

import { AddressType, getAddressByKeyword } from '../utils/convertAddress';

export const useFindAddress = () => {
  const [location, setLocation] = useState<string>();
  const [addressList, setAddressList] = useState<AddressType[] | null>();

  const handleChangeInput = (value: string) => {
    setLocation(value);
  };

  const handleClickAddress = (value: string) => {
    setLocation(value);
    setAddressList(null);
  };

  const debouncedQuery = useDebounce(location, 500);

  useEffect(() => {
    const findAddress = async () => {
      if (!location) return;
      const data = await getAddressByKeyword(location);
      setAddressList(data);
    };
    if (debouncedQuery) {
      findAddress();
    }
  }, [debouncedQuery]);

  return { location, handleChangeInput, addressList, handleClickAddress };
};
