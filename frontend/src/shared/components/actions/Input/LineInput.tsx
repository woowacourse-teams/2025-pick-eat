import styled from '@emotion/styled';
import { ComponentProps, ReactNode, useId } from 'react';

type Props = {
  label?: string;
  color?: string;
  icon?: ReactNode;
} & ComponentProps<'input'>;

function LineInput({ label, color, icon, ...props }: Props) {
  const inputId = useId();
  return (
    <S.Container>
      {label && (
        <S.Label htmlFor={inputId} color={color}>
          {label}
        </S.Label>
      )}
      <S.LineInput id={inputId} color={color} {...props} />
      {icon && <S.Icon>{icon}</S.Icon>}
    </S.Container>
  );
}
export default LineInput;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
    position: relative;
  `,
  Label: styled.label<{ color?: string }>`
    color: ${({ theme, color }) => (color ? color : theme.PALETTE.primary[50])};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
  LineInput: styled.input<{ color?: string }>`
    width: 100%;

    padding-bottom: ${({ theme }) => theme.PADDING.p3};
    border: none;

    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    border-bottom: 2px solid ${({ theme }) => theme.PALETTE.primary[100]};

    &:focus {
      border-bottom: 2px solid
        ${({ theme, color }) => (color ? color : theme.PALETTE.primary[50])};
      outline: none;
    }
  `,
  Icon: styled.div`
    position: absolute;
    right: 0;
    bottom: 8px;
    cursor: pointer;
  `,
};
