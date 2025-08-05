import styled from '@emotion/styled';
import ReactDOM from 'react-dom';

type Props = {
  opened: boolean;
  onClose: () => void;
};

function Modal({ opened, onClose }: Props) {
  const modalRoot = document.querySelector('#modal') as HTMLElement;

  return ReactDOM.createPortal(
    opened && (
      <>
        <S.BackDrop onClick={() => onClose()} />
        <S.Container />
      </>
    ),
    modalRoot
  );
}

export default Modal;

const S = {
  BackDrop: styled.div`
    height: 100vh;
    width: 100%;
    background-color: rgba(1, 1, 1, 0.2);
    position: fixed;
  `,

  Container: styled.div`
    width: 500px;
    background-color: white;
    border-radius: ${({ theme }) => theme.RADIUS.medium3};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: ${({ theme }) => theme.PADDING.p10};
  `,
};
