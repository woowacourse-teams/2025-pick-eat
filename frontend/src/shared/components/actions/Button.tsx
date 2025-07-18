/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { AppTheme } from '@styles/global';

type ColorKeyType = 'primary' | 'secondary' | 'gray';
type SizeKeyType = keyof typeof SIZE;
type StateType = 'default' | 'hover' | 'active';

type Props = {
  text: string;
  color?: ColorKeyType;
  size?: SizeKeyType;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ text, color = 'primary', size = 'full', ...props }: Props) {
  const theme: AppTheme = useTheme();

  return (
    <button css={getButtonStyle(color, size, theme)} {...props}>
      {text}
    </button>
  );
}

export default Button;

const SIZE = {
  xl: { width: '98px', height: '64px', fontSize: '19px' },
  lg: { width: '90px', height: '56px', fontSize: '19px' },
  md: { width: '78px', height: '48px', fontSize: '17px' },
  sm: { width: '64px', height: '40px', fontSize: '15px' },
  xs: { width: '60px', height: '32px', fontSize: '15px' },
  full: { width: '100%', height: '48px', fontSize: '17px' },
};

const getColor = (color: ColorKeyType, theme: AppTheme, state: StateType) => {
  const SIZE_MAP = {
    primary: theme.PALLETE.primary,
    secondary: theme.PALLETE.secondary,
    gray: theme.PALLETE.gray,
  };

  const COLOR_MAP: Record<StateType, keyof typeof theme.PALLETE.primary> = {
    default: 50,
    hover: 30,
    active: 70,
  };

  const GRAY_COLOR_MAP: Record<StateType, keyof typeof theme.PALLETE.gray> = {
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
  theme: AppTheme
) => css`
  width: ${size ? SIZE[size].width : '100%'};
  height: ${SIZE[size].height};
  font-size: ${SIZE[size].fontSize};
  font-weight: 400;
  border-radius: 8px;
  color: ${color === 'primary' ? `white` : `#1E2124`};
  background-color: ${getColor(color, theme, 'default')};
  border: ${color === 'gray' ? `1px solid ${theme.PALLETE.gray[60]}` : 'none'};
  cursor: pointer;

  &:hover {
    background-color: ${getColor(color, theme, 'hover')};
  }

  &:active {
    background-color: ${getColor(color, theme, 'active')};
  }

  &:disabled {
    background-color: #cdd1d5;
    cursor: not-allowed;
    border: none;
    color: #6d7882;
  }
`;
