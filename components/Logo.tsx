import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'hero';
  className?: string;
  animate?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '', animate = false }) => {
  const sizeClasses = {
    small: 'w-16 h-12',
    medium: 'w-40 h-28',
    large: 'w-56 h-40',
    hero: 'w-72 h-52 md:w-80 md:h-60'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <img 
        src="/logo.png" 
        alt="Santo Barbero Logo" 
        className={`w-full h-full object-contain drop-shadow-2xl ${animate ? 'animate-float' : ''}`}
      />
      
      {animate && (
        <style>{`
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px);
              filter: drop-shadow(0 25px 25px rgba(197, 164, 126, 0.3));
            }
            50% { 
              transform: translateY(-10px);
              filter: drop-shadow(0 35px 35px rgba(197, 164, 126, 0.5));
            }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      )}
    </div>
  );
};

export default Logo;
