
import React from 'react';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold font-cinzel text-[#e0e0e0] tracking-wider">
        {title}
      </h2>
      <div className="mt-3 w-24 h-1 bg-[#c5a47e] mx-auto"></div>
    </div>
  );
};

export default SectionTitle;
