import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const swing = keyframes`
  0% { transform: rotate(-45deg); }
  50% { transform: rotate(45deg); }
  100% { transform: rotate(-45deg); }
`;
function Twinkles() {
  return (
    <S.Container>
      <S.TwinkleImage1 src="/images/twinkle.svg" alt="반짝이" />
      <S.TwinkleImage2 src="/images/twinkle.svg" alt="반짝이" />
      <S.TwinkleImage3 src="/images/twinkle.svg" alt="반짝이" />
    </S.Container>
  );
}

export default Twinkles;

const S = {
  Container: styled.div`
    height: 100%;
    position: relative;
  `,
  TwinkleImage1: styled.img`
    width: 30px;
    position: absolute;
    top: -80px;
    left: 40px;

    animation: ${swing} 2s ease-in-out infinite;
  `,
  TwinkleImage2: styled.img`
    width: 18px;
    position: absolute;
    bottom: 10px;
    left: -40px;

    animation: ${swing} 1s ease-in-out infinite;
  `,
  TwinkleImage3: styled.img`
    width: 32px;
    position: absolute;
    right: -30px;
    bottom: -30px;

    animation: ${swing} 3s ease-in-out infinite;
  `,
};
