import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong</h1>
          <p>죄송합니다. 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
