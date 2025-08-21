import '@emotion/react';
import { CustomTheme } from '@styles/global';

declare module '@emotion/react' {
  interface Theme extends CustomTheme {}
}
