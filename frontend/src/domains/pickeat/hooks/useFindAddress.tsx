import useDebounce from '@hooks/useDebounce';

import { useEffect, useState } from 'react';

import { AddressType, getAddressListByKeyword } from '../utils/kakaoLocalAPI';

type Params = {
  onSelectedAddress?: (value: string) => void;
  option?: Record<string, string>;
};

export const useFindAddress = ({ onSelectedAddress, option }: Params = {}) => {
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
    setQuery('');
    onSelectedAddress?.(value);
  };

  useEffect(() => {
    const findAddress = async () => {
      if (!debouncedQuery) {
        setAddressList(null);
        return;
      }
      const data = await getAddressListByKeyword(debouncedQuery, option);
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
