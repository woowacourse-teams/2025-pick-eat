import { QRCodeSVG } from 'qrcode.react';

type Props = {
  url: string;
  size?: number;
};

function QRCode({ url, size }: Props) {
  return <QRCodeSVG value={url} size={size} />;
}

export default QRCode;
