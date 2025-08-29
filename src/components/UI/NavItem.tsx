import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  isActive, 
  children, 
  onClick, 
  className = '' 
}) => {
  const baseClasses = "transition-all duration-200 hover:text-white hover:bg-white/10 rounded-md px-3 py-2";
  const activeClasses = isActive ? "text-white font-semibold" : "text-white/80";
  
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${baseClasses} ${activeClasses} ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavItem;