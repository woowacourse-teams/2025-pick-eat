import Erase from '@components/assets/icons/Erase';

import styled from '@emotion/styled';
import { ComponentProps, ReactNode, useId } from 'react';

type Props = {
  label?: string;
  color?: string;
  xIcon?: boolean;
  onClear?: () => void;
  feedbackMessage?: ReactNode;
  error?: boolean;
} & ComponentProps<'input'>;

function LineInput({
  value,
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
      <S.InputWrapper>
        {label && (
          <S.Label htmlFor={inputId} color={color} required={required}>
            {label}
          </S.Label>
        )}
        <S.Input
          value={value}
          id={inputId}
          placeholder={placeholder}
          required={required}
          error={error}
          color={color}
          autoComplete="off"
          {...props}
        />
        {xIcon && typeof value === 'string' && value?.length > 0 && (
          <S.ClearIcon type="button" onClick={onClear}>
            <Erase />
          </S.ClearIcon>
        )}
      </S.InputWrapper>
      {feedbackMessage && (
        <S.FeedbackMessage error={error}>{feedbackMessage}</S.FeedbackMessage>
      )}
    </S.Container>
  );
}
export default LineInput;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  InputWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
    position: relative;

    label {
      color: ${({ theme }) => theme.PALETTE.gray[50]};
    }

    &:focus-within label {
      color: ${({ theme }) => theme.PALETTE.primary[60]};
    }
  `,
  Label: styled.label<{ required?: boolean }>`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    font: ${({ theme }) => theme.FONTS.body.small};

    &::after {
      color: ${({ theme }) => theme.PALETTE.red[40]};
      font: ${({ theme }) => theme.FONTS.body.small_bold};
      content: ${({ required }) => (required ? "'*'" : '')};
    }
  `,
  Input: styled.input<{
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

    &::placeholder {
      color: ${({ theme }) => theme.PALETTE.gray[30]};
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
      error ? theme.PALETTE.red[40] : theme.PALETTE.gray[20]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};
  `,
};
