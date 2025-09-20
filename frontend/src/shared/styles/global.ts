const fontFamily =
  'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

const fontFamilyStyle =
  'BM Kkubulim, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif';

const FONTS = {
  display: {
    large: `700 60px/150% ${fontFamily}`,
    medium: `700 44px/150% ${fontFamily}`,
    small: `700 36px/150% ${fontFamily}`,
  },
  heading: {
    large: `700 32px/150% ${fontFamily}`,
    large_style: `700 36px/150% ${fontFamilyStyle}`,
    medium: `700 24px/150% ${fontFamily}`,
    medium_style: `700 28px/150% ${fontFamilyStyle}`,
    small: `600 19px/150% ${fontFamily}`,
    small_style: `600 22px/150% ${fontFamilyStyle}`,
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

const PALETTE = {
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
  red: {
    50: '#FF5A5F',
  },
  green: {
    50: '#39D26C',
  },
  kakao: {
    50: '#FEE500',
    100: '#191600',
  },
};

export const Z_INDEX = {
  base: 0,
  below: -1,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  overlay: 400,
  sidenav: 500,
  modal: 1000,
  popover: 1100,
  toast: 1200,
  tooltip: 1300,
  max: 9999,
};

export const BOX_SHADOW = {
  level1: '0 1px 2px #00000014',
  level2: '0 2px 8px #0000001A',
  level3: '0 4px 20px #0000001F',
  level4: '0 8px 32px #0000002E',
};

export const RADIUS = {
  xsmall: '2px',
  small: '4px',
  medium: '6px',
  medium2: '8px',
  medium3: '10px',
  large: '12px',
  xlarge: '14px',
  half: '50%',
};

export const GAP = {
  level1: '2px',
  level2: '4px',
  level3: '8px',
  level4: '12px',
  level5: '16px',
  level6: '20px',
  level7: '24px',
  level8: '32px',
  level9: '40px',
  level10: '48px',
  level11: '64px',
  level12: '80px',
};

export const PADDING = {
  p1: '2px',
  p2: '4px',
  p3: '8px',
  p4: '12px',
  p5: '16px',
  p6: '20px',
  p7: '24px',
  p8: '32px',
  p9: '40px',
  p10: '48px',
  p11: '64px',
  p12: '80px',

  px1: '2px',
  px2: '4px',
  px3: '8px',
  px4: '12px',
  px5: '16px',
  px6: '20px',
  px7: '24px',
  px8: '32px',
  px9: '40px',
  px10: '48px',
  px11: '64px',
  px12: '80px',

  py1: '2px',
  py2: '4px',
  py3: '8px',
  py4: '12px',
  py5: '16px',
  py6: '20px',
  py7: '24px',
  py8: '32px',
  py9: '40px',
  py10: '48px',
  py11: '64px',
  py12: '80px',
};

export const THEME = {
  PALETTE,
  FONTS,
  Z_INDEX,
  BOX_SHADOW,
  RADIUS,
  GAP,
  PADDING,
};

export type CustomTheme = typeof THEME;
