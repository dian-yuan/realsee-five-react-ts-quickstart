import { useCallback, useState, useEffect } from 'react';
import { FiveCanvas } from '@realsee/five/react';

/**
 * 获取当前窗口的尺寸
 */
function getWindowDimensions() {
  return { width: window.innerWidth, height: window.innerHeight };
}

/**
 * React Hook: 获取当前窗口的尺寸
 */
function useWindowDimensions() {
  const [size, setSize] = useState(getWindowDimensions);

  const listener = useCallback(() => {
    setSize(getWindowDimensions());
  }, [setSize, getWindowDimensions]);

  useEffect(() => {
    window.addEventListener('resize', listener, false);
    return () => window.removeEventListener('resize', listener, false);
  }, [listener]);

  return size;
}

export const ResponsiveFiveCanvas = () => {
  const size = useWindowDimensions();
  return <FiveCanvas {...size} />;
};
