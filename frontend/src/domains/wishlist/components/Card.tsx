import Arrow from '@components/assets/icons/Arrow';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';

type Props = {
  title: string;
  imageUrl: string;
};

function Card({ title, imageUrl }: Props) {
  return (
    <S.Container>
      <S.TopWrapper>
        <S.TitleArea>
          <S.Title>{title}</S.Title>
          <S.Description>식당 투표하기</S.Description>
        </S.TitleArea>
        <Arrow size="lg" direction="right" color={THEME.PALETTE.gray[10]} />
      </S.TopWrapper>
      <S.Image src={imageUrl} width={276} height={276} alt="" />
    </S.Container>
  );
}
export default Card;

const S = {
  Container: styled.div`
    width: 260px;
    height: 268px;
    overflow: hidden;
    position: relative;

    padding: 37px 26px 0;

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: 30px;
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level1};
  `,
  TopWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  TitleArea: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Title: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
  Description: styled.span`
    font: ${({ theme }) => theme.FONTS.body.large};
  `,
  Image: styled.img`
    position: absolute;
    top: 10px;
    left: 0;
  `,
};
