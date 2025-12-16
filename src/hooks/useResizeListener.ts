"use client";
import { useState, useLayoutEffect } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface ResizeState {
  width: number;
  device: DeviceType;
}

const useResizeListener = (): ResizeState => {
  const [resizeState, setResizeState] = useState<ResizeState>({
    width: 0,
    device: 'desktop',
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let device: DeviceType = 'desktop';

      if (width <= 480) {
        device = 'mobile';
      } else if (width <= 1024) {
        device = 'tablet';
      }

      setResizeState({ width, device });
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return resizeState;
};

export default useResizeListener;
