import styled from '@emotion/styled';

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
    position: relative;
    height: 100%;
  `,
  TwinkleImage1: styled.img`
    width: 30px;
    position: absolute;
    top: -80px;
    left: 40px;
    transform: rotate(-20deg);
  `,
  TwinkleImage2: styled.img`
    width: 18px;
    position: absolute;
    bottom: 10px;
    left: -40px;
    transform: rotate(-14deg);
  `,
  TwinkleImage3: styled.img`
    width: 32px;
    position: absolute;
    bottom: -30px;
    right: -20px;
    transform: rotate(30deg);
  `,
};
