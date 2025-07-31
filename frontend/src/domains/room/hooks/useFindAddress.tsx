import useDebounce from '@hooks/useDebounce';

import { useEffect, useState } from 'react';

import { AddressType, getAddressByKeyword } from '../utils/convertAddress';

export const useFindAddress = () => {
  const [address, setAddress] = useState<string>('');
  const [addressList, setAddressList] = useState<AddressType[] | null>(null);

  const [query, setQuery] = useState<string>('');

  const debouncedQuery = useDebounce(query, 500);

  const handleInputChange = (value: string) => {
    setAddress(value);
    setQuery(value);
  };

  const handleAddressClick = (value: string) => {
    setAddress(value);
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

  return {
    address,
    handleInputChange,
    addressList,
    handleAddressClick,
  };
};
