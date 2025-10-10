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

function FillInput({
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
      <S.InputWrapper error={error}>
        {label && (
          <S.Label htmlFor={inputId} color={color} required={required}>
            {label}
          </S.Label>
        )}
        <S.Input
          id={inputId}
          placeholder={placeholder}
          required={required}
          color={color}
          {...props}
        />
        {xIcon && (
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

export default FillInput;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  InputWrapper: styled.div<{ error: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p4};

    border: 1px solid
      ${({ theme, error }) =>
        error ? theme.PALETTE.red[40] : theme.PALETTE.gray[5]};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: ${({ theme }) => theme.RADIUS.medium};

    &:focus-within {
      border: 1px solid ${({ theme }) => theme.PALETTE.gray[95]};

      background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    }
  `,
  Label: styled.label<{ required?: boolean }>`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.body.small};

    &::after {
      color: ${({ theme }) => theme.PALETTE.red[40]};
      font: ${({ theme }) => theme.FONTS.body.small_bold};
      content: ${({ required }) => (required ? "'*'" : '')};
    }
  `,
  Input: styled.input`
    width: 100%;

    border: none;

    background-color: transparent;

    color: ${({ theme }) => theme.PALETTE.gray[95]};
    font: ${({ theme }) => theme.FONTS.body.medium_bold};

    &:placeholder-shown {
      color: ${({ theme }) => theme.PALETTE.gray[30]};
    }

    &:focus {
      outline: none;
    }
  `,
  ClearIcon: styled.button`
    position: absolute;
    right: 12px;
    bottom: 8px;
  `,
  FeedbackMessage: styled.div<{ error: boolean }>`
    padding-left: ${({ theme }) => theme.PADDING.p4};

    color: ${({ theme, error }) =>
      error ? theme.PALETTE.red[40] : theme.PALETTE.gray[20]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};
  `,
};
