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
    gap: 8px;

    padding: 8px 12px;

    background-color: ${({ theme, color }) => theme.PALLETE[color][10]};
    border-radius: 1000px;
  `,
  Text: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.PALLETE.gray[70]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};
  `,
};
