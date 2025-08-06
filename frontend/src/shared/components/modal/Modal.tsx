import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Inner from './Inner';

export type ModalProps = {
  opened: boolean;
  mounted: boolean;
  onClose: () => void;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeButton?: boolean;
  onUnmount?: () => void;
};

function Modal({
  mounted,
  opened,
  onClose,
  children,
  size = 'md',
  closeButton = true,
  onUnmount,
}: ModalProps) {
  if (!mounted) return;
  const modalRoot = document.querySelector('#modal') as HTMLElement;

  useEffect(() => {
    if (!opened) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [opened]);

  return ReactDOM.createPortal(
    <>
      <Inner
        opened={opened}
        onClose={onClose}
        size={size}
        closeButton={closeButton}
        onUnmount={onUnmount}
      >
        {children}
      </Inner>
    </>,
    modalRoot
  );
}

export default Modal;
