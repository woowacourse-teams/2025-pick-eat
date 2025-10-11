import styled from '@emotion/styled';
import { ReactNode } from 'react';

import CopyLink from './CopyLink';
import QRCode from './QRCode';

type Props = {
  url: string;
  title: string;
  description: ReactNode;
};

function SharePanel({ url, title, description }: Props) {
  return (
    <S.Container>
      <S.TitleArea>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.TitleArea>
      <QRCode url={url} />
      <CopyLink url={url} />
    </S.Container>
  );
}

export default SharePanel;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};

    padding: ${({ theme }) => theme.PADDING.p5};
  `,
  TitleArea: styled.div`
    text-align: center;
  `,
  Title: styled.h2`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
    font: ${({ theme }) => theme.FONTS.body.xlarge_bold};
  `,
  Description: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};
  `,
};
