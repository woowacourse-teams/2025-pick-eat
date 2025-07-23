import styled from '@emotion/styled';

type Props = {
  message?: string;
};

function ErrorMessage({ message }: Props) {
  return <S.Wrapper>{message}</S.Wrapper>;
}

export default ErrorMessage;

const S = {
  Wrapper: styled.span`
    height: 25px;
    color: ${({ theme }) => theme.PALETTE.primary[70]};
    font: ${({ theme }) => theme.FONTS.body.small_bold};
  `,
};
