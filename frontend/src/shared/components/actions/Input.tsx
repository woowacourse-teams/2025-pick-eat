import styled from '@emotion/styled';
import { ComponentProps } from 'react';

type Props = {
  label?: string;
} & ComponentProps<'input'>;

function Input({ label, ...props }: Props) {
  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}
      <S.InputBox {...props} />
    </S.Container>
  );
}
export default Input;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  Label: styled.label`
    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,

  InputBox: styled.input`
    width: 100%;
    height: 56px;

    padding: 6px;
    border: 1px solid ${({ theme }) => theme.PALETTE.gray[60]};

    font: ${({ theme }) => theme.FONTS.body.medium};
    border-radius: 5px;

    &:focus {
      border: 2px solid ${({ theme }) => theme.PALETTE.primary[60]};
      outline: none;
    }
  `,
};
