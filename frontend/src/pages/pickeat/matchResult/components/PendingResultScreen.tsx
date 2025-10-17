import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const shake = keyframes`
  0%, 10% {
    transform: rotate(0deg);
  }
  10%, 20% {
    transform: rotate(-4deg);
  }
  20%, 30% {
    transform: rotate(3deg);
  }
  30%, 40% {
    transform: rotate(-2deg);
  }
  40%, 50% {
    transform: rotate(1deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

function PendingResultScreen() {
  const [dotCount, setDotCount] = useState(0);
  const [readied, setReadied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, 200);

    const timeout = setTimeout(() => {
      setReadied(true);

      const nextTimeout = setTimeout(() => {}, 500);

      return () => {
        clearTimeout(nextTimeout);
      };
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
  const dots = '.'.repeat(dotCount).split('').join(' ');

  return (
    <S.Container>
      <S.CapsuleImage
        src={
          readied
            ? '/images/result/capsuleOpen.png'
            : '/images/result/capsuleClose.png'
        }
        animation={!readied}
      />
      <S.Text>
        {readied ? '식당 결과가 나왔어요!' : `결과를 추첨 중이에요 ${dots}`}
      </S.Text>
    </S.Container>
  );
}

export default PendingResultScreen;

const S = {
  Container: styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level8};
  `,
  CapsuleImage: styled.img<{ animation: boolean }>`
    width: 240px;

    animation: ${shake} 1s ease-in-out infinite;
    transform-origin: 50% 100%;
    ${({ animation }) => !animation && `animation: none`};
  `,
  Text: styled.p`
    font: ${({ theme }) => theme.FONTS.body.xxlarge_bold};
  `,
};
