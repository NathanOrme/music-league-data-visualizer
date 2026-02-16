/**
 * @file ErrorBoundary.tsx
 * @description A React component that catches JavaScript errors in its child component tree and displays a fallback UI.
 *
 */

import { AlertTriangle } from 'lucide-react';
import { Component } from 'react';

import { MagicCard } from '@/shared/components/magicui';
import { Button } from '@/shared/components/ui';
import { logger } from '@/shared/utils/logger';
import { errorBoundaryStyles } from '@/styles/ErrorBoundary.styles';

import type { ErrorInfo, JSX, ReactNode } from 'react';

/**
 * @interface State
 * @description The state for the ErrorBoundary component.
 * @property {boolean} hasError - Indicates whether an error has been caught.
 */
interface State {
  hasError: boolean;
}

/**
 * Catches JavaScript errors in its child component tree and displays a fallback UI.
 *
 * @component
 * @example
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<
  { children: ReactNode },
  State
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Updates state so the next render will show the fallback UI.
   *
   * @param _error - The error that was thrown.
   * @returns {State} The new state with hasError set to true.
   */
  static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  /**
   * Logs the error to an error reporting service.
   *
   * @param _error - The error that was thrown.
   * @param _errorInfo - An object with a componentStack key.
   */
  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    logger.error('ErrorBoundary caught an error', _error, _errorInfo);
  }

  /**
   * Reloads the page to recover from the error.
   */
  handleReload = (): void => {
    window.location.reload();
  };

  /**
   * Renders the children or a fallback UI if an error has occurred.
   *
   * @returns {JSX.Element} The rendered component.
   */
  render(): JSX.Element {
    if (this.state.hasError) {
      return (
        <div className={errorBoundaryStyles.container}>
          <MagicCard className={errorBoundaryStyles.card}>
            <div className="p-8">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-16 w-16 text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">
                Technical Difficulties
              </h1>
              <p className="text-white/80 mb-6">
                We&apos;ve encountered an unexpected issue. Please
                reload the page to continue.
              </p>
              <Button
                onClick={this.handleReload}
                className={errorBoundaryStyles.button}
              >
                Reload Page
              </Button>
            </div>
          </MagicCard>
        </div>
      );
    }
    return this.props.children as JSX.Element;
  }
}

export default ErrorBoundary;
