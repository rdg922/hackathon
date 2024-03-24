'use client'
import React, { useState, useEffect } from 'react';

// Utility function to determine icon size based on window width
function getIconSize(width) {
  if (width < 768) return 24; // Tailwind's 'sm' breakpoint
  if (width >= 768 && width < 1024) return 64; // 'md' breakpoint
  if (width >= 1024) return 96; // 'lg' and up
  return 24; // Default size
}

const ResponsiveIcon = ({Icon}) => {
  const [iconSize, setIconSize] = useState(getIconSize(window.innerWidth));

  useEffect(() => {
    function handleResize() {
      setIconSize(getIconSize(window.innerWidth));
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <Icon size={iconSize}  color="#A48BFF" strokeWidth={1.5} />;
};



export default ResponsiveIcon;
