import { User, users } from '@apis/users';

import useDebounce from '@hooks/useDebounce';

import { useEffect, useState } from 'react';

export const useFindMember = () => {
  const [nickname, setNickName] = useState<string>('');
  const [memberList, setMemberList] = useState<User[] | null>(null);

  const debouncedQuery = useDebounce(nickname, 500);

  const handleInputChange = (value: string) => {
    setNickName(value);
  };

  const handleMemberClick = (onClick: () => void) => {
    setNickName('');
    onClick();
    setMemberList(null);
  };

  const handleCInputClear = () => {
    setNickName('');
  };

  useEffect(() => {
    const findMember = async () => {
      if (!debouncedQuery) {
        setMemberList(null);
        return;
      }
      const data = await users.getMembers(debouncedQuery);
      setMemberList(data);
    };
    findMember();
  }, [debouncedQuery]);

  return {
    nickname,
    handleInputChange,
    memberList,
    handleMemberClick,
    handleCInputClear,
  };
};
