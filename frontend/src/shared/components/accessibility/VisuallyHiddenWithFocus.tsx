import { ComponentProps, ReactNode, useEffect, useRef } from 'react';

import VisuallyHidden from './VisuallyHidden';

type Props = {
  children: ReactNode;
} & ComponentProps<'p'>;

function VisuallyHiddenWithFocus({ children, ...rest }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <VisuallyHidden ref={ref} {...rest}>
      {children}
    </VisuallyHidden>
  );
}
export default VisuallyHiddenWithFocus;
