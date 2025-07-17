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
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,

  Label: styled.label`
    color: ${({ theme }) => theme.PALLETE.gray[60]};
    ${({ theme }) => theme.TYPOGRAPHY.body.small}
  `,

  InputBox: styled.input`
    width: 100%;
    height: 56px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.PALLETE.gray[60]};
    padding: 6px;
    ${({ theme }) => theme.TYPOGRAPHY.body.large};
  `,
};
