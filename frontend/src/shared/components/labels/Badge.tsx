import styled from '@emotion/styled';

type Props = {
  color?: 'primary' | 'secondary' | 'gray';
  children: React.ReactNode;
};

function Badge({ children, color = 'gray' }: Props) {
  return (
    <S.Container color={color}>
      <S.Text>{children}</S.Text>
    </S.Container>
  );
}

export default Badge;

const S = {
  Container: styled.div<{ color: 'primary' | 'secondary' | 'gray' }>`
    width: fit-content;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};

    padding: 0 ${({ theme }) => theme.PADDING.p3};
    border: 1px solid ${({ theme }) => theme.PALETTE.gray[10]};
    border-radius: 1000px;
  `,
  //TODO: font theme에서 뽑아쓰기
  Text: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font:
      500 11px/150% Pretendard,
      sans-serif;
  `,
};
