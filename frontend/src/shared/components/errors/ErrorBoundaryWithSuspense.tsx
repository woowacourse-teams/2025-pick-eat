import LoadingSpinner from '@components/assets/LoadingSpinner';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactNode, Suspense } from 'react';

import ErrorBoundary from './ErrorBoundary';

type Props = {
  children: ReactNode;
  isSuspense?: boolean;
  fallback?: ReactNode;
};

function ErrorBoundaryWithSuspense({
  children,
  isSuspense = true,
  fallback = <LoadingSpinner />,
}: Props) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset}>
      {isSuspense ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        children
      )}
    </ErrorBoundary>
  );
}

export default ErrorBoundaryWithSuspense;
