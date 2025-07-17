import styled from '@emotion/styled';
import { AppTheme } from '@styles/global';

type Props = {
  text: string;
  color: 'primary' | 'secondary' | 'gray';
  size?: keyof typeof SIZE;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ text, color = 'primary', size, ...props }: Props) {
  return (
    <S.Container color={color} size={size} {...props}>
      {text}
    </S.Container>
  );
}

export default Button;

type StateType = 'default' | 'hover' | 'active';

const getColor = (color: Props['color'], theme: AppTheme, state: StateType) => {
  const palleteMap = {
    primary: theme.PALLETE.primary,
    secondary: theme.PALLETE.secondary,
    gray: theme.PALLETE.gray,
  };

  const shadeMap: Record<
    'default' | 'hover' | 'active',
    keyof typeof theme.PALLETE.primary
  > = {
    default: 50,
    hover: 30,
    active: 70,
  };

  if (color === 'gray') {
    const grayShadeMap: Record<
      'default' | 'hover' | 'active',
      keyof typeof theme.PALLETE.gray
    > = {
      default: 5,
      hover: 0,
      active: 10,
    };
    return palleteMap['gray'][grayShadeMap[state]];
  }

  return palleteMap[color][shadeMap[state]];
};

const SIZE = {
  xl: { width: '98px', height: '64px', fontSize: '19px' },
  lg: { width: '90px', height: '56px', fontSize: '19px' },
  md: { width: '78px', height: '48px', fontSize: '17px' },
  sm: { width: '64px', height: '40px', fontSize: '15px' },
  xs: { width: '60px', height: '32px', fontSize: '15px' },
};

const S = {
  Container: styled.button<Pick<Props, 'color' | 'size'>>`
    width: ${({ size }) => (size ? SIZE[size].width : `100%`)};
    height: ${({ size }) => (size ? SIZE[size].height : SIZE['md'].height)};
    font-size: ${({ size }) =>
      size ? SIZE[size].fontSize : SIZE['md'].fontSize};
    font-weight: 400;
    color: ${({ color }) => (color === 'primary' ? `white` : `#1E2124`)};

    border-radius: 5px;
    border: ${({ color }) => (color === 'gray' ? `solid 1px #58616A` : '')};

    background-color: ${({ color, theme }) =>
      getColor(color, theme, 'default')};

    &:hover {
      background-color: ${({ color, theme }) =>
        color === 'gray'
          ? theme.PALLETE.gray[0]
          : getColor(color, theme, 'hover')};
    }

    &:active {
      background-color: ${({ color, theme }) =>
        color === 'gray'
          ? theme.PALLETE.gray[10]
          : getColor(color, theme, 'active')};
    }

    &:disabled {
      background-color: #cdd1d5;
      cursor: not-allowed;
      border: none;
      color: #6d7882;
    }
  `,
};
