import styled from '@emotion/styled';

type Props = {
  children: React.ReactNode;
};

function Badge({ children }: Props) {
  return (
    <S.Container>
      <S.Text>{children}</S.Text>
    </S.Container>
  );
}

export default Badge;

const S = {
  Container: styled.div`
    width: fit-content;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};

    padding: 0 ${({ theme }) => theme.PADDING.p3};
    border: 1px solid ${({ theme }) => theme.PALETTE.gray[10]};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: ${({ theme }) => theme.RADIUS.xlarge};
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
