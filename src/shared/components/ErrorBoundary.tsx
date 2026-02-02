import { AlertTriangle } from 'lucide-react';
import { Component } from 'react';

import { MagicCard } from '@/shared/components/magicui';
import { Button } from '@/shared/components/ui';
import { logger } from '@/shared/utils/logger';

import type { ErrorInfo, JSX, ReactNode } from 'react';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    logger.error('ErrorBoundary caught an error', _error, _errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): JSX.Element {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a] p-4">
          <MagicCard className="w-full max-w-md rounded-2xl">
            <div className="p-8">
              <div className="mb-4 flex justify-center">
                <AlertTriangle className="h-16 w-16 text-red-400" />
              </div>
              <h1 className="mb-4 text-center text-2xl font-bold text-white">
                Technical Difficulties
              </h1>
              <p className="mb-6 text-center text-white/80">
                We&apos;ve encountered an unexpected issue. Please reload the
                page to continue.
              </p>
              <Button
                onClick={this.handleReload}
                className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white hover:from-[#FF5252] hover:to-[#FF7043]"
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
