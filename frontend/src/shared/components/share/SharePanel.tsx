import styled from '@emotion/styled';

import CopyLink from './CopyLink';
import QRCode from './QRCode';

type Props = {
  url: string;
  description: string;
};

function SharePanel({ url, description }: Props) {
  return (
    <S.Container>
      <S.TitleArea>
        <S.TitlePointText>공유하기</S.TitlePointText>
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
    gap: ${({ theme }) => theme.GAP.level7};

    margin: ${({ theme }) => theme.PADDING.p5} 0;
  `,
  TitleArea: styled.div`
    text-align: center;
  `,
  TitlePointText: styled.h1`
    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,
  Description: styled.span`
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
};
