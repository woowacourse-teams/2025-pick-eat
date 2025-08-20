import { useState } from 'react';

export const useModal = () => {
  const [mounted, setMounted] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleCloseModal = () => {
    setOpened(false);
  };

  const handleOpenModal = () => {
    setOpened(true);
    setMounted(true);
  };

  const handleUnmountModal = () => {
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
