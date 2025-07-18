import '@emotion/react';
import { CustomTheme } from '@styles/global';

declare module '@emotion/react' {
  type Theme = Theme & CustomTheme;
}
