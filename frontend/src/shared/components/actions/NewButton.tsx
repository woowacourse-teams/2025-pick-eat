import styled from '@emotion/styled';
import { ComponentProps } from 'react';

type Props = {
  text: string;
  size?: 'sm' | 'lg';
  fixed?: boolean;
} & ComponentProps<'button'>;

function NewButton({ text, size = 'lg', fixed = false, ...props }: Props) {
  return (
    <S.Button size={size} fixed={fixed} {...props}>
      {text}
    </S.Button>
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
  Button: styled.button<
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
