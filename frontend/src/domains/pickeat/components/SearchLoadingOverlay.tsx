import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  text: string;
};

function SearchLoadingOverlay({ text }: Props) {
  const modalRoot = document.querySelector('#modal') as HTMLElement;

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return ReactDOM.createPortal(
    <S.Container>
      <S.GlassMagnifierImage src="/images/glassMagnifier.png" alt="돋보기" />
      <S.Text>{text}</S.Text>
    </S.Container>,
    modalRoot
  );
}

export default SearchLoadingOverlay;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
    background-color: #00000075;
    position: fixed;
    z-index: ${({ theme }) => theme.Z_INDEX.modal};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
  `,

  GlassMagnifierImage: styled.img`
    width: 200px;
    animation: ${keyframes`
      0% {
        transform: translateY(0) rotate(325deg);
      }
      50% {
        transform: translateY(-15px) rotate(325deg);
      }
      100% {
        transform: translateY(0) rotate(325deg);
      }
    `} 1.5s ease-in-out infinite;
  `,

  Text: styled.span`
    font: ${({ theme }) => theme.FONTS.body.xxlarge_bold};
    color: ${({ theme }) => theme.PALETTE.gray[0]};
  `,
};
