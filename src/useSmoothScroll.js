'use client';
import { useCallback } from 'react';

// Cubic Bezier function
function cubicBezier(t, p1, p2) {
  return 3 * p1 * Math.pow(1 - t, 2) * t + 3 * p2 * Math.pow(t, 2) * (1 - t) + Math.pow(t, 3);
}

// Custom Hook
export default function useSmoothScroll(){
  const smoothScrollTo = useCallback((targetPosition) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Duration in ms
    let startTime = null;

    // Bezier control points
    const p1 = 0.25; // Adjust these control points to change the easing effect
    const p2 = 0.5;  // Adjust these control points to change the easing effect

    function scroll(timestamp) {
      if (!startTime) startTime = timestamp;
      const timeElapsed = timestamp - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Apply the Bezier curve to calculate the current position
      const bezierY = cubicBezier(progress, p1, p2);
      const currentPosition = startPosition + distance * bezierY;

      window.scrollTo(0, currentPosition);

      if (timeElapsed < duration) {
        requestAnimationFrame(scroll);
      }
    }

    requestAnimationFrame(scroll);
  }, []);

  return smoothScrollTo;
};