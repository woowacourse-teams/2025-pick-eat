import styled from '@emotion/styled';

type Props = {
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function RoundedButton({ text, ...props }: Props) {
  return <S.Button {...props}>{text}</S.Button>;
}

export default RoundedButton;

const S = {
  Button: styled.button`
    width: 272px;
    height: 60px;

    background-color: #ffda1e;

    color: ${({ theme }) => theme.PALETTE.gray[100]};

    //TODO:theme에서 뽑아쓰기
    font:
      600 17px/150% Pretendard,
      sans-serif;

    border-radius: 30px;

    &:disabled {
      border: none;

      background-color: ${({ theme }) => theme.PALETTE.gray[20]};

      color: ${({ theme }) => theme.PALETTE.gray[50]};

      cursor: not-allowed;
    }
  `,
};
