import { SerializedStyles, css } from '@emotion/react';

export const setMobileStyle = (style: SerializedStyles) => css`
  @media screen and (max-width: 768px) {
    ${style}
  }
`;
