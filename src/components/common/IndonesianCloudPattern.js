import React from 'react';
import { motion } from 'framer-motion';

const IndonesianCloudPattern = ({ 
  variant = 'red', 
  size = 'medium', 
  position = 'top-left',
  animation = 'float',
  opacity = 0.1,
  className = ''
}) => {
  // Size configurations
  const sizes = {
    small: 'w-16 h-16 md:w-20 md:h-20',
    medium: 'w-20 h-20 md:w-32 md:h-32',
    large: 'w-32 h-32 md:w-48 md:h-48'
  };

  // Position configurations
  const positions = {
    'top-left': 'top-4 left-4 md:top-10 md:left-10',
    'top-right': 'top-4 right-4 md:top-10 md:right-10',
    'bottom-left': 'bottom-4 left-4 md:bottom-10 md:left-10',
    'bottom-right': 'bottom-4 right-4 md:bottom-10 md:right-10',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2 md:top-10',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2 md:bottom-10'
  };

  // Color configurations
  const colors = {
    red: '#a92e23',
    gold: '#f3d099',
    amber: '#d97706'
  };

  // Animation configurations
  const animations = {
    float: {
      animate: {
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 5, 0]
      },
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    rotate: {
      animate: {
        rotate: [0, 360],
        scale: [1, 1.1, 1]
      },
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    },
    pulse: {
      animate: {
        scale: [1, 1.2, 1],
        opacity: [opacity, opacity * 1.5, opacity]
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    drift: {
      animate: {
        x: [0, 30, 0],
        y: [0, -15, 0]
      },
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Indonesian Cloud SVG Patterns
  const CloudPattern1 = () => (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <g fill="none" stroke={colors[variant]} strokeWidth="3" strokeLinecap="round">
        {/* Main cloud body */}
        <path d="M20,40 Q30,20 50,30 Q70,15 90,25 Q110,10 130,20 Q150,15 170,25 Q180,35 175,45 Q165,55 150,50 Q130,60 110,55 Q90,65 70,60 Q50,65 30,55 Q15,50 20,40 Z" />
        
        {/* Decorative swirls */}
        <path d="M45,35 Q50,25 55,35 Q60,45 55,35" />
        <path d="M85,30 Q90,20 95,30 Q100,40 95,30" />
        <path d="M125,25 Q130,15 135,25 Q140,35 135,25" />
        
        {/* Inner decorative elements */}
        <circle cx="60" cy="40" r="3" fill={colors[variant]} opacity="0.6" />
        <circle cx="100" cy="35" r="2" fill={colors[variant]} opacity="0.4" />
        <circle cx="140" cy="30" r="2.5" fill={colors[variant]} opacity="0.5" />
      </g>
    </svg>
  );

  const CloudPattern2 = () => (
    <svg viewBox="0 0 180 90" className="w-full h-full">
      <g fill="none" stroke={colors[variant]} strokeWidth="2.5" strokeLinecap="round">
        {/* Layered cloud formation */}
        <path d="M15,45 Q25,25 45,35 Q65,20 85,30 Q105,15 125,25 Q145,20 165,35 Q170,45 160,55 Q140,65 120,60 Q100,70 80,65 Q60,70 40,60 Q20,65 15,45 Z" />
        
        {/* Upper layer */}
        <path d="M30,35 Q40,20 55,25 Q70,15 85,20 Q100,10 115,15 Q130,10 145,20 Q155,30 150,40" />
        
        {/* Spiral decorations */}
        <path d="M50,40 Q52,35 54,40 Q56,45 54,40 Q52,35 50,40" />
        <path d="M90,35 Q92,30 94,35 Q96,40 94,35 Q92,30 90,35" />
        <path d="M130,30 Q132,25 134,30 Q136,35 134,30 Q132,25 130,30" />
        
        {/* Dots pattern */}
        <circle cx="40" cy="45" r="1.5" fill={colors[variant]} opacity="0.7" />
        <circle cx="75" cy="50" r="2" fill={colors[variant]} opacity="0.5" />
        <circle cx="110" cy="40" r="1.8" fill={colors[variant]} opacity="0.6" />
        <circle cx="145" cy="35" r="1.2" fill={colors[variant]} opacity="0.8" />
      </g>
    </svg>
  );

  const CloudPattern3 = () => (
    <svg viewBox="0 0 160 70" className="w-full h-full">
      <g fill="none" stroke={colors[variant]} strokeWidth="2" strokeLinecap="round">
        {/* Flowing cloud design */}
        <path d="M10,35 Q20,15 40,25 Q60,10 80,20 Q100,5 120,15 Q140,10 155,25 Q160,35 150,45 Q130,55 110,50 Q90,60 70,55 Q50,60 30,50 Q10,55 10,35 Z" />
        
        {/* Internal flow lines */}
        <path d="M25,30 Q35,25 45,30 Q55,35 65,30 Q75,25 85,30" />
        <path d="M30,40 Q40,35 50,40 Q60,45 70,40 Q80,35 90,40" />
        
        {/* Decorative spirals */}
        <g fill={colors[variant]} opacity="0.6">
          <path d="M40,32 Q42,28 44,32 Q46,36 44,32 Q42,28 40,32" />
          <path d="M75,27 Q77,23 79,27 Q81,31 79,27 Q77,23 75,27" />
          <path d="M110,22 Q112,18 114,22 Q116,26 114,22 Q112,18 110,22" />
        </g>
        
        {/* Accent dots */}
        <circle cx="55" cy="35" r="1" fill={colors[variant]} opacity="0.8" />
        <circle cx="95" cy="32" r="1.5" fill={colors[variant]} opacity="0.6" />
        <circle cx="125" cy="28" r="1.2" fill={colors[variant]} opacity="0.7" />
      </g>
    </svg>
  );

  // Select pattern based on variant
  const patterns = {
    1: CloudPattern1,
    2: CloudPattern2,
    3: CloudPattern3
  };

  const PatternComponent = patterns[Math.floor(Math.random() * 3) + 1] || CloudPattern1;

  return (
    <motion.div
      className={`absolute ${positions[position]} ${sizes[size]} pointer-events-none ${className}`}
      style={{ opacity }}
      {...animations[animation]}
    >
      <PatternComponent />
    </motion.div>
  );
};

export default IndonesianCloudPattern;
