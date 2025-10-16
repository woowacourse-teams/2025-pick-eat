import Cross from '@components/assets/icons/Cross';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';

function Title() {
  return (
    <S.Container>
      <S.TitleBox>
        <S.Title>식당 제외하기</S.Title>
      </S.TitleBox>
      <S.Description>
        안 땡기는 식당에
        <S.IconWrapper>
          <Cross color={THEME.PALETTE.gray[0]} size="sm" strokeWidth={4} />
        </S.IconWrapper>
        버튼을 눌러주세요.
      </S.Description>
    </S.Container>
  );
}

export default Title;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level2};

    padding: ${({ theme }) => theme.PADDING.px6} 0;
  `,
  TitleBox: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};
  `,
  Title: styled.h1`
    color: ${({ theme }) => theme.PALETTE.gray[95]};
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
  Imoji: styled.img`
    width: 48px;
  `,
  Description: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    color: ${({ theme }) => theme.PALETTE.gray[70]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
  IconWrapper: styled.div`
    width: 20px;
    height: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: ${({ theme }) => theme.PADDING.p2};

    background-color: ${({ theme }) => theme.PALETTE.red[40]};

    border-radius: 1000px;
  `,
};
