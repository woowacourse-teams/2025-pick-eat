import { User, users } from '@apis/users';

import useDebounce from '@hooks/useDebounce';

import { useEffect, useState } from 'react';

export const useFindMember = () => {
  const [nickName, setNickName] = useState<string>('');
  const [memberList, setMemberList] = useState<User[] | null>(null);

  const [query, setQuery] = useState<string>('');

  const debouncedQuery = useDebounce(query, 500);

  const handleInputChange = (value: string) => {
    setNickName(value);
    setQuery(value);
  };

  const handleMemberClick = (fn: () => void) => {
    setNickName('');
    fn();
    setMemberList(null);
    setQuery('');
  };

  useEffect(() => {
    const findAddress = async () => {
      if (!debouncedQuery) {
        setMemberList(null);
        return;
      }
      const data = await users.getMembers(debouncedQuery);
      setMemberList(data);
    };
    findAddress();
  }, [debouncedQuery]);

  return {
    nickName,
    handleInputChange,
    memberList,
    handleMemberClick,
  };
};
