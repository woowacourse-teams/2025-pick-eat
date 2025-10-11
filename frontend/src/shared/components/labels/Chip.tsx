import Delete from '@components/assets/icons/Delete';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';

type Props = {
  variant?: 'filled' | 'outlined';
  color?: 'white' | 'primary';
  removeButton?: boolean;
  onRemove?: () => void;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
};

const SIZE = {
  sm: { height: 24, font: THEME.FONTS.body.small },
  md: { height: 32, font: THEME.FONTS.body.medium },
  lg: { height: 40, font: THEME.FONTS.body.large },
};

function Chip({
  variant = 'filled',
  color = 'white',
  removeButton = false,
  size = 'md',
  onRemove,
  children,
}: Props) {
  return (
    <S.Container variant={variant} color={color} size={size}>
      <S.Text variant={variant} size={size}>
        {children}
      </S.Text>
      {removeButton && (
        <S.RemoveButton onClick={onRemove}>
          <Delete size="xs" />
        </S.RemoveButton>
      )}
    </S.Container>
  );
}

export default Chip;

const S = {
  Container: styled.div<Pick<Props, 'variant' | 'color' | 'size'>>`
    width: fit-content;
    height: ${({ size = 'md' }) => SIZE[size].height}px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};

    padding: ${({ theme }) => theme.PADDING.p3}
      ${({ theme }) => theme.PADDING.p4};

    ${({ variant, theme }) =>
      variant === 'outlined' && `border: 1px solid ${theme.PALETTE.gray[10]}`};

    background-color: ${({ theme, color }) =>
      color === 'primary' ? theme.PALETTE.primary[50] : theme.PALETTE.gray[0]};
    border-radius: ${({ theme }) => theme.RADIUS.xlarge};

    ${({ variant, theme }) =>
      variant === 'filled' && `box-shadow:${theme.BOX_SHADOW.level2}`};
  `,

  Text: styled.div<Pick<Props, 'variant' | 'size'>>`
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme, variant }) =>
      variant === 'outlined'
        ? theme.PALETTE.gray[50]
        : theme.PALETTE.gray[100]};
    font: ${({ size = 'md' }) => SIZE[size].font};
  `,

  RemoveButton: styled.button``,
};
