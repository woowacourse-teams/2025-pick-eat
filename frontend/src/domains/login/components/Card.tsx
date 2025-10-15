import { THEME } from '@styles/global';

import styled from '@emotion/styled';

type Props = {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
};

const COLOR_STYLE = {
  odd: {
    backgroundColor: THEME.PALETTE.primary[40],
    color: THEME.PALETTE.gray[90],
  },
  even: {
    backgroundColor: THEME.PALETTE.gray[70],
    color: THEME.PALETTE.gray[0],
  },
};

function isEven(id: number): boolean {
  return id % 2 === 0;
}

function Card({ id, title, description, imgUrl }: Props) {
  return (
    <S.Container isEven={isEven(id)}>
      <S.Image src={imgUrl} alt={title} />
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Container>
  );
}

export default Card;

const S = {
  Container: styled.div<{ isEven: boolean }>`
    width: 240px;
    height: 300px;

    background-color: ${({ isEven }) =>
      isEven
        ? COLOR_STYLE['even'].backgroundColor
        : COLOR_STYLE['odd'].backgroundColor};
    color: ${({ isEven }) =>
      isEven ? COLOR_STYLE['even'].color : COLOR_STYLE['odd'].color};
    border-radius: ${({ theme }) => theme.RADIUS.xlarge};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
    padding: ${({ theme }) => theme.PADDING.p5};
  `,

  Image: styled.img`
    width: 180px;
    margin: 0 auto;
  `,

  Title: styled.span`
    font: ${({ theme }) => theme.FONTS.body.xxlarge_bold};
  `,

  Description: styled.p`
    font: ${({ theme }) => theme.FONTS.body.medium};
    white-space: pre-line;
  `,
};
