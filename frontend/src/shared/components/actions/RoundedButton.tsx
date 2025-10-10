import styled from '@emotion/styled';
import { ComponentProps, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
} & ComponentProps<'button'>;

function RoundedButton({ children, ...props }: Props) {
  return <S.Button {...props}>{children}</S.Button>;
}

export default RoundedButton;

const S = {
  Button: styled.button`
    width: 272px;
    height: 60px;

    background-color: ${({ theme }) => theme.PALETTE.primary[50]};

    color: ${({ theme }) => theme.PALETTE.gray[100]};

    font: ${({ theme }) => theme.FONTS.body.large_bold};

    border-radius: ${({ theme }) => theme.RADIUS.xlarge};

    &:disabled {
      border: none;

      background-color: ${({ theme }) => theme.PALETTE.gray[20]};

      color: ${({ theme }) => theme.PALETTE.gray[50]};

      cursor: not-allowed;
    }
  `,
};
