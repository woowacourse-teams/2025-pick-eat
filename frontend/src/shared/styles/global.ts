
const fontFamily =
  'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

const FONTS = {
  display: {
    large: `700 60px/150% ${fontFamily}`,
    medium: `700 44px/150% ${fontFamily}`,
    small: `700 36px/150% ${fontFamily}`,
  },
  heading: {
    large: `700 32px/150% ${fontFamily}`,
    medium: `700 24px/150% ${fontFamily}`,
    small: `600 19px/150% ${fontFamily}`,
  },
  body: {
    large: `400 19px/150% ${fontFamily}`,
    large_bold: `700 19px/150% ${fontFamily}`,
    medium: `400 17px/150% ${fontFamily}`,
    medium_bold: `700 17px/150% ${fontFamily}`,
    small: `400 15px/150% ${fontFamily}`,
    small_bold: `700 15px/150% ${fontFamily}`,
    xsmall: `400 13px/150% ${fontFamily}`,
    xsmall_bold: `700 13px/150% ${fontFamily}`,
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
  PALLETE,
  FONTS
};

export type CustomTheme = typeof THEME;
