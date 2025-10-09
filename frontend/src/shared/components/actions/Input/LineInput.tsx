import Erase from '@components/assets/icons/Erase';

import styled from '@emotion/styled';
import { ComponentProps, ReactNode, useId } from 'react';

type Props = {
  placeholder?: string;
  required?: boolean;
  label?: string;
  color?: string;
  xIcon?: boolean;
  onClear?: () => void;
  feedbackMessage?: ReactNode;
  error?: boolean;
} & ComponentProps<'input'>;

function LineInput({
  placeholder = '입력해 주세요.',
  required,
  label,
  color,
  xIcon,
  onClear,
  feedbackMessage,
  error = false,
  ...props
}: Props) {
  const inputId = useId();
  return (
    <S.Container>
      {label && (
        <S.Label htmlFor={inputId} color={color} required={required}>
          {label}
        </S.Label>
      )}
      <S.LineInput
        id={inputId}
        placeholder={placeholder}
        required={required}
        error={error}
        color={color}
        {...props}
      />
      {xIcon && (
        <S.ClearIcon type="button" onClick={onClear}>
          <Erase />
        </S.ClearIcon>
      )}
      {feedbackMessage && (
        <S.FeedbackMessage error={error}>{feedbackMessage}</S.FeedbackMessage>
      )}
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

    label {
      color: ${({ theme }) => theme.PALETTE.gray[50]};
    }

    &:focus-within label {
      color: ${({ theme }) => theme.PALETTE.primary[50]};
    }
  `,
  Label: styled.label<{ required?: boolean }>`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    font: ${({ theme }) => theme.FONTS.body.small};

    &::after {
      color: #f95f5f;
      font-weight: bold;
      content: ${({ required }) => (required ? "'*'" : '')};
    }
  `,
  LineInput: styled.input<{
    color?: string;
    error: boolean;
  }>`
    width: 100%;

    padding-bottom: ${({ theme }) => theme.PADDING.p3};

    border: none;

    background-color: transparent;

    color: ${({ theme }) => theme.PALETTE.gray[95]};

    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    border-bottom: 2px solid
      ${({ theme, error }) => (error ? '#F95F5F' : theme.PALETTE.gray[30])};

    &:placeholder-shown {
      color: ${({ theme }) => theme.PALETTE.gray[20]};
      border-bottom: 2px solid ${({ theme }) => theme.PALETTE.gray[30]};
    }

    &:focus {
      border-bottom: 2px solid
        ${({ theme, color }) => (color ? color : theme.PALETTE.primary[50])};
      outline: none;
    }
  `,
  ClearIcon: styled.button`
    position: absolute;
    right: 0;
    bottom: 8px;
  `,
  FeedbackMessage: styled.div<{ error: boolean }>`
    color: ${({ theme, error }) =>
      error ? '#F95F5F' : theme.PALETTE.gray[20]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};
  `,
};
