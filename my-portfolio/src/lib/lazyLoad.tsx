import React, { Suspense, type ComponentType } from 'react';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

// Error boundary for lazy loaded components
class LazyErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ComponentType }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback || (() => (
        <div className="text-center p-4">
          <p>Something went wrong loading this component.</p>
        </div>
      ));
      return <Fallback />;
    }

    return this.props.children;
  }
}

// Higher-order component for lazy loading
export function withLazyLoading<T extends object>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  fallback?: React.ComponentType
) {
  const LazyComponent = React.lazy(importFunc);

  return React.forwardRef<any, T>((props, ref) => (
    <LazyErrorBoundary fallback={fallback}>
      <Suspense fallback={<LoadingSpinner />}>
        <LazyComponent {...props} ref={ref} />
      </Suspense>
    </LazyErrorBoundary>
  ));
}

// Preload function for critical components
export function preloadComponent(importFunc: () => Promise<any>) {
  const componentImport = importFunc();
  return componentImport;
}

// Intersection observer based lazy loading
export function withIntersectionLazyLoading<T extends object>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  options: IntersectionObserverInit = {}
) {
  return React.forwardRef<any, T>((props, ref) => {
    const [shouldLoad, setShouldLoad] = React.useState(false);
    const elementRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { rootMargin: '100px', ...options }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }, []);

    if (!shouldLoad) {
      return (
        <div ref={elementRef} className="min-h-[200px]">
          <LoadingSpinner />
        </div>
      );
    }

    const LazyComponent = React.lazy(importFunc);

    return (
      <LazyErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <LazyComponent {...props} ref={ref} />
        </Suspense>
      </LazyErrorBoundary>
    );
  });
}