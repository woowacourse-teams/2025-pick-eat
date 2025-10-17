import { useState } from 'react';

type ModalOptions = {
  defaultOpened?: boolean;
  defaultMounted?: boolean;
};

export const useModal = (options: ModalOptions = {}) => {
  const { defaultOpened = false, defaultMounted = false } = options;
  const [mounted, setMounted] = useState(defaultMounted);
  const [opened, setOpened] = useState(defaultOpened);

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
