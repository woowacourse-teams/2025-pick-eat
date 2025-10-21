import { usersQuery } from '@apis/users';

import useDebounce from '@hooks/useDebounce';

import { useState } from 'react';

export const useFindMember = () => {
  const [nickname, setNickName] = useState<string>('');
  const debouncedQuery = useDebounce(nickname, 500);
  const { data: memberList } = usersQuery.useGetMembers(debouncedQuery);

  const handleInputChange = (value: string) => {
    setNickName(value);
  };

  const handleMemberClick = (onClick: () => void) => {
    setNickName('');
    onClick();
  };

  const handleCInputClear = () => {
    setNickName('');
  };

  return {
    nickname,
    handleInputChange,
    memberList,
    handleMemberClick,
    handleCInputClear,
  };
};
