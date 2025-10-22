import styled from '@emotion/styled';
import { ReactNode, ComponentProps } from 'react';

type Props = {
  children: ReactNode;
} & ComponentProps<'p'>;

function VisuallyHidden({ children, ref, ...rest }: Props) {
  return (
    <S.Container tabIndex={-1} ref={ref} {...rest}>
      {children}
    </S.Container>
  );
}

export default VisuallyHidden;

const S = {
  Container: styled.p`
    width: 1px;
    height: 1px;
    overflow: hidden;
    position: absolute;

    margin: -1px;
    padding: 0;
    border: 0;

    white-space: nowrap;
    clip: rect(0 0 0 0);
  `,
};
