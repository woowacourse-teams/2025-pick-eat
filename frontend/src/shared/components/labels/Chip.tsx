import Delete from '@components/assets/icons/Delete';

import styled from '@emotion/styled';

type Props = {
  variant?: 'filled' | 'outlined';
  color?: 'white' | 'primary';
  removeButton?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
};

function Chip({
  variant = 'filled',
  color = 'white',
  removeButton = false,
  onRemove,
  children,
}: Props) {
  return (
    <S.Container variant={variant} color={color}>
      <S.Text variant={variant}>{children}</S.Text>

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
  Container: styled.div<Pick<Props, 'variant' | 'color'>>`
    width: fit-content;
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
  //TODO: font theme에서 뽑아쓰기
  Text: styled.div<Pick<Props, 'variant'>>`
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme, variant }) =>
      variant === 'outlined'
        ? theme.PALETTE.gray[50]
        : theme.PALETTE.gray[100]};
    font:
      400 14px/100% Pretendard,
      sans-serif;
  `,

  RemoveButton: styled.button`
    width: 16px;
    height: 16px;

    background-color: ${({ theme }) => theme.PALETTE.gray[10]};
    border-radius: ${({ theme }) => theme.RADIUS.half};
  `,
};
