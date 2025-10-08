import styled from '@emotion/styled';
import { ComponentProps, ReactNode } from 'react';

type Props = {
  size?: 'sm' | 'lg';
  fixed?: boolean;
  children?: ReactNode;
} & ComponentProps<'button'>;

function NewButton({ size = 'lg', fixed = false, children, ...props }: Props) {
  return (
    <S.Container size={size} fixed={fixed} {...props}>
      {children}
    </S.Container>
  );
}

export default NewButton;

//TODO:폰트 theme에서 뽑아쓰기
const SIZE = {
  sm: { width: '108px', height: '40px', font: '500 16px/150% Pretendard' },
  lg: {
    width: '100%',
    height: '52px',
    font: '600 17px/150% Pretendard',
  },
} as const;

const S = {
  Container: styled.button<
    Pick<Props, 'fixed'> & { size: NonNullable<Props['size']> }
  >`
    width: ${({ size, fixed }) => (fixed ? '90%' : SIZE[size].width)};
    height: ${({ size }) => SIZE[size].height};

    background-color: #ffda1e;

    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font: ${({ size }) => SIZE[size].font};

    border-radius: 12px;

    ${({ fixed, theme }) =>
      fixed &&
      `position:fixed;
       z-index:${theme.Z_INDEX.fixed};
       left: 50%;
       bottom: calc(env(safe-area-inset-bottom) + ${theme.PADDING.p6});
       transform: translateX(-50%);
       `}

    &:disabled {
      border: none;

      background-color: ${({ theme }) => theme.PALETTE.gray[20]};

      color: ${({ theme }) => theme.PALETTE.gray[50]};

      cursor: not-allowed;
    }
  `,
};
