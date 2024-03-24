"use client";
import React, { useState, useEffect } from "react";

// Utility function to determine icon size based on window width
function getIconSize(width) {
  if (width < 768) {
    console.log("24");
    return 24; // Tailwind's 'sm' breakpoint
  }
  if (width >= 768 && width < 1024) {
    return 50; // 'md' breakpoint
  }
  if (width >= 1024) {
    return 40; // 'lg' and up
  }
  return 24; // Default size
}

const ResponsiveIcon = ({ Icon }) => {
  //   const [iconSize, setIconSize] = useState(getIconSize(window.innerWidth));
  const [iconSize, setIconSize] = useState(48);

  //   useEffect(() => {
  //     function handleResize() {
  //       setIconSize(getIconSize(window.innerWidth));
  //     }

  //     window.addEventListener('resize', handleResize);
  //     return () => window.removeEventListener('resize', handleResize);
  //   }, []);

  return <Icon size={iconSize} color="#A48BFF" strokeWidth={1.5} />;
};

export default ResponsiveIcon;
