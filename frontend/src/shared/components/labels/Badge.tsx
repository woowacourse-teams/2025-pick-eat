import styled from '@emotion/styled';

type Props = {
  variant: 'outlined' | 'filled';
  color?: 'white' | 'primary';
  children: React.ReactNode;
};

function Badge({ variant, color = 'white', children }: Props) {
  return (
    <S.Container variant={variant} color={color}>
      <S.Text variant={variant}>{children}</S.Text>
    </S.Container>
  );
}

export default Badge;

const S = {
  Container: styled.div<Pick<Props, 'variant' | 'color'>>`
    width: fit-content;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};

    padding: 0 ${({ theme }) => theme.PADDING.p4};
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
      500 11px/150% Pretendard,
      sans-serif;
  `,
};
