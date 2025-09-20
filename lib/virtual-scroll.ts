'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

interface VirtualScrollOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  threshold?: number;
}

export function useVirtualScroll<T>(
  items: T[],
  options: VirtualScrollOptions
) {
  const {
    itemHeight,
    containerHeight,
    overscan = 5,
    threshold = 0.1,
  } = options;

  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    startIndex + visibleCount + overscan * 2
  );

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      item,
      index: startIndex + index,
      top: (startIndex + index) * itemHeight,
    }));
  }, [items, startIndex, endIndex, itemHeight]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setScrollTop(target.scrollTop);
  };

  // Throttled scroll handler untuk performa maksimal
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;
    const throttledScroll = (e: Event) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const target = e.target as HTMLDivElement;
          setScrollTop(target.scrollTop);
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('scroll', throttledScroll, { passive: true });
    return () => container.removeEventListener('scroll', throttledScroll);
  }, []);

  return {
    containerRef,
    visibleItems,
    totalHeight,
    handleScroll,
  };
}

// Hook untuk infinite scroll dengan performance tinggi
export function useInfiniteScroll<T>(
  items: T[],
  options: VirtualScrollOptions & {
    loadMore?: () => void;
    hasMore?: boolean;
  }
) {
  const virtualScroll = useVirtualScroll(items, options);
  const [isLoading, setIsLoading] = useState(false);

  const { containerRef, visibleItems, totalHeight, handleScroll } = virtualScroll;

  const handleScrollWithLoadMore = async (e: React.UIEvent<HTMLDivElement>) => {
    handleScroll(e);
    
    const target = e.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    
    // Load more when near bottom
    if (
      scrollHeight - scrollTop - clientHeight < 100 &&
      options.hasMore &&
      !isLoading &&
      options.loadMore
    ) {
      setIsLoading(true);
      await options.loadMore();
      setIsLoading(false);
    }
  };

  return {
    ...virtualScroll,
    handleScroll: handleScrollWithLoadMore,
    isLoading,
  };
}
