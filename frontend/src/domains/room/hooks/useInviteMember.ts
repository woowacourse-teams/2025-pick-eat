import { User } from '@apis/users';

import { useState } from 'react';

export const useInviteMember = () => {
  const [selectedMemberList, setSelectedMemberList] = useState<User[]>([]);

  const handleAddSelectedMember = (value: User) => {
    if (selectedMemberList.find(member => member.id === value.id)) {
      alert('이미 추가된 멤버입니다.');
      return;
    }
    setSelectedMemberList(prev => [...prev, value]);
  };

  const handleDeleteSelectedMember = (id: number) => {
    setSelectedMemberList(prev => prev.filter(member => member.id !== id));
  };

  return {
    selectedMemberList,
    handleAddSelectedMember,
    handleDeleteSelectedMember,
  };
};
