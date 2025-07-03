
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-slate-800/90 border-slate-700">
            <CardHeader className="text-center">
              <span className="text-6xl mb-4 block">💀</span>
              <CardTitle className="text-red-400">Something went wrong!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-slate-300">
                The graveyard encountered an unexpected error.
              </p>
              <p className="text-sm text-slate-400">
                {this.state.error?.message}
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-green-600 hover:bg-green-500"
              >
                Resurrect Page
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
