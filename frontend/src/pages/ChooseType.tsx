import Button from '@components/actions/Button';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';

function Choosetype() {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Wrapper>
        <S.TitleArea>
          <S.TitleText>
            <S.PointText>🧀픽잇</S.PointText>과 음식점
            <br /> 쉽게 고르기
          </S.TitleText>
        </S.TitleArea>
        <S.ButtonWrapper>
          <Button
            text="추천에서 pick!"
            onClick={() => navigate('/choose-wishlist')}
          />
          <Button
            text="근처에서 pick!"
            color="secondary"
            onClick={() => navigate('/')}
          />
        </S.ButtonWrapper>
        <Button text="방 생성" color="gray" size="md" />
      </S.Wrapper>
    </S.Container>
  );
}

export default Choosetype;

const S = {
  Container: styled.div`
    height: calc(100% - ${HEADER_HEIGHT});
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Wrapper: styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level6};

    padding: ${({ theme }) => theme.PADDING.p11};

    border-radius: ${({ theme }) => theme.RADIUS.xlarge};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level3};

    ${setMobileStyle(css`
      width: 80%;

      padding: 0;
      box-shadow: none;
    `)}
  `,

  ButtonWrapper: styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  TitleArea: styled.div`
    text-align: center;
  `,

  TitleText: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,

  PointText: styled.span`
    color: ${({ theme }) => theme.PALETTE.primary[50]};
    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,
};
