const fontFamily =
  'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

const fontFamilyStyle =
  'BM Kkubulim Static, BM Kkubulim, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif';

const FONTS = {
  display: {
    large: `700 60px/150% ${fontFamily}`,
    medium: `700 44px/150% ${fontFamily}`,
    small: `700 36px/150% ${fontFamily}`,
  },
  heading: {
    large: `700 28px/100% ${fontFamily}`,
    large_style: `700 28px/100% ${fontFamilyStyle}`,
    medium: `700 24px/150% ${fontFamily}`,
    medium_style: `700 24px/150% ${fontFamilyStyle}`,
    small: `700 20px/150% ${fontFamily}`,
    small_style: `600 20px/150% ${fontFamilyStyle}`,
    small_style_static: `600 22px/150% ${fontFamilyStyle}`,
  },
  body: {
    xxlarge: `400 24px ${fontFamily}`,
    xxlarge_bold: `600 24px ${fontFamily}`,
    xlarge: `400 20px ${fontFamily}`,
    xlarge_bold: `600 20px ${fontFamily}`,
    large: `400 18px ${fontFamily}`,
    large_bold: `600 18px ${fontFamily}`,
    medium: `400 16px ${fontFamily}`,
    medium_bold: `600 16px ${fontFamily}`,
    small: `400 15px/150% ${fontFamily}`,
    small_bold: `600 15px/150% ${fontFamily}`,
    xsmall: `400 14px/150% ${fontFamily}`,
    xsmall_bold: `600 14px/150% ${fontFamily}`,
    xxsmall: `400 12px/100% ${fontFamily}`,
    xxsmall_bold: `600 12px/150% ${fontFamily}`,
  },
  logo: `800 16px ${fontFamilyStyle}`,
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
    5: '#FFFBE6',
    10: '#FFF9D5',
    20: '#FFF7C1',
    30: '#FFF197',
    40: '#FFE56F',
    50: '#FFDA1E',
    60: '#F6AD00',
    70: '#C08600',
    80: '#744E00',
    90: '#2E1F00',
    95: '#190E00',
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
    40: '#F95F5F',
    50: '#D63D4A',
  },
  green: {
    50: '#69aa7fff',
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
  white: '0px 0px 20px 12px rgba(255,255,255,0.7)',
  level1: '2px 4px 20px 1px rgba(186,197,201,0.25)',
  level2: '0 2px 8px #0000001A',
  level3: '0 4px 20px #0000001F',
  level4: '0 8px 32px #0000002E',
};

export const RADIUS = {
  xsmall: '8px',
  small: '14px',
  medium: '20px',
  large: '24px',
  xlarge: '30px',
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
