import '@emotion/react';
import { AppTheme } from '@styles/global';

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
