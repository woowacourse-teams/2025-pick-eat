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
        <Arrow size="xlg" direction="right" color={THEME.PALETTE.gray[10]} />
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

    padding: ${({ theme }) => theme.PADDING.p8}
      ${({ theme }) => theme.PADDING.p4} 0 ${({ theme }) => theme.PADDING.p7};

    border-radius: ${({ theme }) => theme.RADIUS.xlarge};
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
    align-items: start;
  `,
  TitleArea: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Title: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,
  Description: styled.span`
    font: ${({ theme }) => theme.FONTS.body.large};
  `,
};
