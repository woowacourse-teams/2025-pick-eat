import { css } from '@emotion/react';

const TYPOGRAPHY = {
  display: {
    large: css`
      font-size: 60px;
      line-height: 150%;
      font-weight: 700;
    `,
    medium: css`
      font-size: 44px;
      line-height: 150%;
      font-weight: 700;
    `,
    small: css`
      font-size: 36px;
      line-height: 150%;
      font-weight: 700;
    `,
  },
  heading: {
    large: css`
      font-size: 32px;
      line-height: 150%;
      font-weight: 700;
    `,
    medium: css`
      font-size: 24px;
      line-height: 150%;
      font-weight: 700;
    `,
    small: css`
      font-size: 19px;
      line-height: 150%;
      font-weight: 700;
    `,
  },
  body: {
    large: css`
      font-size: 19px;
      line-height: 150%;
      font-weight: 400;
    `,
    large_bold: css`
      font-size: 19px;
      line-height: 150%;
      font-weight: 700;
    `,
    medium: css`
      font-size: 17px;
      line-height: 150%;
      font-weight: 400;
    `,
    medium_bold: css`
      font-size: 17px;
      line-height: 150%;
      font-weight: 700;
    `,
    small: css`
      font-size: 15px;
      line-height: 150%;
      font-weight: 400;
    `,
    small_bold: css`
      font-size: 15px;
      line-height: 150%;
      font-weight: 700;
    `,
    xsmall: css`
      font-size: 13px;
      line-height: 150%;
      font-weight: 400;
    `,
    xsmall_bold: css`
      font-size: 13px;
      line-height: 150%;
      font-weight: 700;
    `,
  },
};

const PALLETE = {
  gray: {
    0: '#FFFFFF',
    5: '#F4F5F6',
    10: '#E6E8EA',
    20: '#CDD1D5',
    30: '#B1B8BE',
    40: '#8A949E',
    50: '#6D7882',
    60: '#58616A',
    70: '#464C53',
    80: '#33363D',
    90: '#1E2124',
    95: '#131416',
    100: '#000000',
  },
  primary: {
    0: '#FFFFFF',
    5: '#FDF5FC',
    10: '#F9DCF5',
    20: '#E3B4DC',
    30: '#E09AD6',
    40: '#D17CC6',
    50: '#BD5EB0',
    60: '#A14D95',
    70: '#89397E',
    80: '#692860',
    90: '#511A4A',
    95: '#2F0D2B',
    100: '#000000',
  },
  secondary: {
    0: '#FFFFFF',
    5: '#FFFAE8',
    10: '#FCF0C0',
    20: '#FFEA96',
    30: '#FFE070',
    40: '#FFD038',
    50: '#FABB00',
    60: '#E08A00',
    70: '#765400',
    80: '#472F00',
    90: '#2E1F00',
    95: '#190E00',
    100: '#000000',
  },
};

export const THEME = {
  TYPOGRAPHY,
  PALLETE,
};

export type CustomTheme = typeof THEME;
