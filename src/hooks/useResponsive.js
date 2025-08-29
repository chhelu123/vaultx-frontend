import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize.width <= 768;
  const isTablet = screenSize.width > 768 && screenSize.width <= 1024;
  const isDesktop = screenSize.width > 1024;

  // Dynamic responsive values
  const responsive = {
    // Padding
    pagePadding: isMobile ? '16px 12px' : isTablet ? '24px 20px' : '32px 24px',
    cardPadding: isMobile ? '16px' : isTablet ? '24px' : '32px',
    modalPadding: isMobile ? '20px' : '32px',
    
    // Typography
    h1Size: isMobile ? '24px' : isTablet ? '28px' : '32px',
    h2Size: isMobile ? '18px' : isTablet ? '20px' : '24px',
    h3Size: isMobile ? '16px' : isTablet ? '18px' : '20px',
    bodySize: isMobile ? '14px' : '16px',
    smallSize: isMobile ? '12px' : '14px',
    
    // Spacing
    gap: isMobile ? '12px' : isTablet ? '16px' : '24px',
    marginBottom: isMobile ? '20px' : isTablet ? '24px' : '32px',
    
    // Layout
    gridCols: isMobile ? '1fr' : '1fr 1fr',
    maxWidth: isMobile ? '100%' : isTablet ? '95%' : '1200px',
    modalWidth: isMobile ? '95%' : isTablet ? '80%' : '450px',
    
    // Button sizes
    buttonPadding: isMobile ? '10px 16px' : '12px 20px',
    buttonFont: isMobile ? '14px' : '15px',
    
    // Wallet balance
    balanceSize: isMobile ? '20px' : isTablet ? '24px' : '28px',
    
    // Screen info
    isMobile,
    isTablet,
    isDesktop,
    width: screenSize.width,
    height: screenSize.height
  };

  return responsive;
};

export default useResponsive;