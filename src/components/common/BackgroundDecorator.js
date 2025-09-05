import React from 'react';
import IndonesianCloudPattern from './IndonesianCloudPattern';

const BackgroundDecorator = ({ 
  theme = 'warm',
  density = 'medium',
  animated = true,
  className = ''
}) => {
  // Theme configurations
  const themes = {
    warm: {
      primary: 'red',
      secondary: 'gold',
      accent: 'amber'
    },
    golden: {
      primary: 'gold',
      secondary: 'amber',
      accent: 'red'
    },
    traditional: {
      primary: 'red',
      secondary: 'red',
      accent: 'gold'
    }
  };

  // Density configurations (number of decorative elements)
  const densityConfig = {
    light: 3,
    medium: 6,
    dense: 9
  };

  const currentTheme = themes[theme];
  const elementCount = densityConfig[density];

  // Predefined positions for better layout
  const positions = [
    'top-left', 'top-right', 'bottom-left', 'bottom-right',
    'top-center', 'bottom-center'
  ];

  const sizes = ['small', 'medium', 'large'];
  const animations = animated ? ['float', 'rotate', 'pulse', 'drift'] : ['pulse'];

  // Generate decorative elements
  const generateElements = () => {
    const elements = [];
    
    for (let i = 0; i < elementCount; i++) {
      const position = positions[i % positions.length];
      const size = sizes[i % sizes.length];
      const animation = animations[i % animations.length];
      const variant = i % 2 === 0 ? currentTheme.primary : currentTheme.secondary;
      const opacity = 0.05 + (i % 3) * 0.02; // Varying opacity: 0.05, 0.07, 0.09

      elements.push(
        <IndonesianCloudPattern
          key={`cloud-${i}`}
          variant={variant}
          size={size}
          position={position}
          animation={animation}
          opacity={opacity}
          className={`delay-${i * 1000}`}
        />
      );
    }

    return elements;
  };

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {/* Main decorative elements */}
      {generateElements()}
      
      {/* Additional floating geometric shapes */}
      <div className="absolute top-1/4 left-1/6 w-4 h-4 md:w-8 md:h-8 bg-gradient-to-br from-amber-400/10 to-red-500/10 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-6 h-6 md:w-12 md:h-12 bg-gradient-to-br from-red-400/8 to-amber-500/8 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
      <div className="absolute top-1/2 right-1/6 w-3 h-3 md:w-6 md:h-6 bg-gradient-to-br from-amber-500/12 to-red-400/12 rotate-45 animate-pulse" style={{ animationDuration: '2s' }}></div>
      
      {/* Subtle gradient overlays */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-amber-100/10 to-transparent rounded-bl-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-gradient-to-tr from-red-100/8 to-transparent rounded-tr-[80px]"></div>
    </div>
  );
};

export default BackgroundDecorator;
