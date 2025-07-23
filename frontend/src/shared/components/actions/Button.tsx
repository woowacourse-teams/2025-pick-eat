/** @jsxImportSource @emotion/react */

import { css, Theme, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

type ColorKeyType = 'primary' | 'secondary' | 'gray';
type SizeKeyType = keyof typeof SIZE;
type StateType = 'default' | 'hover' | 'active';

type Props = {
  text: string;
  color?: ColorKeyType;
  size?: SizeKeyType;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  text,
  color = 'primary',
  size = 'full',
  leftIcon,
  rightIcon,
  ...props
}: Props) {
  const theme = useTheme();

  return (
    <S.Button css={getButtonStyle(color, size, theme)} {...props}>
      {leftIcon && <S.LeftIcon>{leftIcon}</S.LeftIcon>}
      <span>{text}</span>
      {rightIcon && <S.RightIcon>{rightIcon}</S.RightIcon>}
    </S.Button>
  );
}

export default Button;

const S = {
  Button: styled.button``,
  LeftIcon: styled.span`
    display: inline-flex;

    margin-right: 4px;
  `,
  RightIcon: styled.span`
    display: inline-flex;

    margin-left: 4px;
  `,
};

const SIZE = {
  xl: { width: '98px', height: '64px', fontSize: '19px' },
  lg: { width: '90px', height: '56px', fontSize: '19px' },
  md: { width: '78px', height: '48px', fontSize: '17px' },
  sm: { width: '64px', height: '40px', fontSize: '15px' },
  xs: { width: '60px', height: '32px', fontSize: '15px' },
  full: { width: '100%', height: '48px', fontSize: '17px' },
};

const getColor = (color: ColorKeyType, theme: Theme, state: StateType) => {
  const SIZE_MAP = {
    primary: theme.PALETTE.primary,
    secondary: theme.PALETTE.secondary,
    gray: theme.PALETTE.gray,
  };

  const COLOR_MAP: Record<StateType, keyof typeof theme.PALETTE.primary> = {
    default: 50,
    hover: 30,
    active: 70,
  };

  const GRAY_COLOR_MAP: Record<StateType, keyof typeof theme.PALETTE.gray> = {
    default: 5,
    hover: 0,
    active: 10,
  };

  const SIZE = color === 'gray' ? GRAY_COLOR_MAP[state] : COLOR_MAP[state];
  return SIZE_MAP[color][SIZE];
};

const getButtonStyle = (
  color: ColorKeyType,
  size: SizeKeyType,
  theme: Theme
) => css`
  width: ${size ? SIZE[size].width : '100%'};
  height: ${SIZE[size].height};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border: ${color === 'gray' ? `1px solid ${theme.PALETTE.gray[60]}` : 'none'};

  background-color: ${getColor(color, theme, 'default')};

  color: ${color === 'primary' ? `white` : `#1E2124`};
  font-size: ${SIZE[size].fontSize};
  font-weight: 400;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${getColor(color, theme, 'hover')};
  }

  &:active {
    background-color: ${getColor(color, theme, 'active')};
  }

  &:disabled {
    border: none;

    background-color: #cdd1d5;

    color: #6d7882;
    cursor: not-allowed;
  }
`;
