import { useState } from 'react';

export const useModal = () => {
  const [mounted, setMounted] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleCloseModal = (e?: MouseEvent) => {
    e?.stopPropagation();
    setOpened(false);
  };

  const handleOpenModal = () => {
    setOpened(true);
    setMounted(true);
  };

  const handleUnmountModal = (e?: MouseEvent) => {
    e?.stopPropagation();
    setOpened(false);
    setMounted(false);
  };

  return {
    mounted,
    opened,
    handleCloseModal,
    handleOpenModal,
    handleUnmountModal,
  };
};
