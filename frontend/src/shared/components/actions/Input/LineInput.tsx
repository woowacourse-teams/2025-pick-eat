import styled from '@emotion/styled';
import { ComponentProps, ReactNode, useId } from 'react';

type Props = {
  label?: string;
  color?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
} & ComponentProps<'input'>;

function LineInput({ label, color, rightIcon, leftIcon, ...props }: Props) {
  const inputId = useId();
  return (
    <S.Container>
      {leftIcon && <S.LeftIcon>{leftIcon}</S.LeftIcon>}
      {label && (
        <S.Label htmlFor={inputId} color={color}>
          {label}
        </S.Label>
      )}
      <S.LineInput
        id={inputId}
        leftIcon={leftIcon ? true : false}
        color={color}
        {...props}
      />
      {rightIcon && <S.RightIcon>{rightIcon}</S.RightIcon>}
    </S.Container>
  );
}
export default LineInput;

const Icon = styled.div`
  position: absolute;
  bottom: 8px;
`;

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
  LineInput: styled.input<{ color?: string; leftIcon: boolean }>`
    width: 100%;

    padding-bottom: ${({ theme }) => theme.PADDING.p3};

    padding-left: ${({ theme, leftIcon }) => (leftIcon ? theme.PADDING.p8 : 0)};
    border: none;

    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    border-bottom: 2px solid ${({ theme }) => theme.PALETTE.primary[100]};

    &:focus {
      border-bottom: 2px solid
        ${({ theme, color }) => (color ? color : theme.PALETTE.primary[50])};
      outline: none;
    }
  `,
  LeftIcon: styled(Icon)`
    left: 0;
  `,
  RightIcon: styled(Icon)`
    right: 0;
    cursor: pointer;
  `,
};
