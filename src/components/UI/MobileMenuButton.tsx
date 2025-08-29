import React from 'react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center">
        <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
          isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
        }`} />
        <span className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`} />
        <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
          isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
        }`} />
      </div>
    </button>
  );
};

export default MobileMenuButton;