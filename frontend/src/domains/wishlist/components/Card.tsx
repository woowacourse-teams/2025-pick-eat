import Arrow from '@components/assets/icons/Arrow';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';

const CARD_SIZE = {
  sm: 200,
  lg: 260,
};

type Props = {
  title: string;
  imageUrl: string;
  onClick: () => void;
  size?: 'sm' | 'lg';
};

function Card({ title, imageUrl, onClick, size = 'lg' }: Props) {
  return (
    <S.Container size={size} onClick={onClick}>
      <S.Image src={imageUrl} alt="" />
      <S.TopWrapper>
        <S.TitleArea>
          <S.Title>{title}</S.Title>
          <S.Description>식당 투표하기</S.Description>
        </S.TitleArea>
        <Arrow size="lg" direction="right" color={THEME.PALETTE.gray[10]} />
      </S.TopWrapper>
    </S.Container>
  );
}
export default Card;

const S = {
  Container: styled.div<{ size: 'sm' | 'lg' }>`
    width: ${({ size }) => CARD_SIZE[size]}px;
    height: ${({ size }) => CARD_SIZE[size]}px;
    overflow: hidden;
    position: relative;

    padding: 37px 26px;
    border: 1px solid red;
    border-radius: 30px;
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level1};
    cursor: pointer;
  `,
  Image: styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    object-fit: cover;
    object-position: center;
  `,
  TopWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  TitleArea: styled.div`
    display: flex;
    flex-direction: column;
    z-index: 1;
  `,
  Title: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
  Description: styled.span`
    font: ${({ theme }) => theme.FONTS.body.large};
  `,
};
