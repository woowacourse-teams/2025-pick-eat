import styled from '@emotion/styled';
import { QRCodeSVG } from 'qrcode.react';

type Props = {
  url: string;
  size?: number;
};

function QRCode({ url, size }: Props) {
  return (
    <S.Container>
      <QRCodeSVG value={url} size={size} />
    </S.Container>
  );
}

export default QRCode;

const S = {
  Container: styled.div`
    padding: 14px;
    border: 1px solid ${({ theme }) => theme.PALETTE.gray[30]};
    border-radius: ${({ theme }) => theme.RADIUS.large};
  `,
};
