import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import LanguageSelector from '../UI/LanguageSelector';

const Header: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1023px)');

 const navItems = [
  { path: '/', key: 'home', label: t('home') },
  { path: '/properties', key: 'properties', label: t('properties') },
  { path: '/services', key: 'services', label: t('services') },
  { path: '/about', key: 'about', label: t('about') },
  { path: '/contact', key: 'contact', label: t('contact') }
];

  const isActive = (path: string) => location.pathname === path;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobile) closeMenu();
  }, [isMobile]);

  const headerStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    padding: '16px 5%',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center' as const,
    textDecoration: 'none',
    color: 'white',
    transition: 'transform 0.2s ease'
  };

  return (
    <>
      <header style={headerStyle}>
        <div style={containerStyle}>
          <Link to="/" style={logoStyle}>
            <span style={{ fontSize: '24px', marginRight: '12px' }}>🏠</span>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: isMobile ? '18px' : '20px', 
                fontWeight: 'bold' 
              }}>
                {t('companyName')}
              </h1>
              <p style={{ 
                margin: 0, 
                fontSize: isMobile ? '11px' : '12px', 
                opacity: 0.9 
              }}>
                {t('subtitle')}
              </p>
            </div>
          </Link>

          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <LanguageSelector />
              
              <nav style={{ display: 'flex', alignItems: 'center' }}>
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.path}
                    style={{
                      color: isActive(item.path) ? '#fff' : 'rgba(255,255,255,0.8)',
                      textDecoration: 'none',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '16px',
                      fontWeight: isActive(item.path) ? '600' : '400',
                      marginRight: '8px'
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <Link
                  to="/crm"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    marginLeft: '8px'
                  }}
                >
                  {t('crm')}
                </Link>
              </nav>
            </div>
          )}

          {isMobile && (
            <button
              onClick={toggleMenu}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: 'white',
                fontSize: '24px'
              }}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          )}
        </div>
      </header>

      {isMobile && isMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999
          }}
          onClick={closeMenu}
        />
      )}

      {isMobile && (
        <nav style={{
          position: 'fixed',
          top: '80px',
          right: isMenuOpen ? '0' : '-320px',
          width: '300px',
          maxWidth: '90vw',
          height: 'calc(100vh - 80px)',
          background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
          zIndex: 1001,
          transition: 'right 0.3s ease',
          boxShadow: '-5px 0 20px rgba(0,0,0,0.3)'
        }}>
          <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
            <LanguageSelector />
          </div>

          <div>
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                onClick={closeMenu}
                style={{
                  display: 'block',
                  color: isActive(item.path) ? '#fff' : 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  padding: '16px 24px',
                  fontSize: '18px',
                  fontWeight: isActive(item.path) ? '600' : '400',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: isActive(item.path) ? 'rgba(255,255,255,0.1)' : 'transparent'
                }}
              >
                {item.label}
              </Link>
            ))}
            
            <Link
              to="/crm"
              onClick={closeMenu}
              style={{
                display: 'block',
                color: 'white',
                textDecoration: 'none',
                padding: '16px 24px',
                fontSize: '18px',
                fontWeight: '600',
                background: 'rgba(255,255,255,0.2)',
                margin: '16px 20px',
                borderRadius: '12px',
                textAlign: 'center'
              }}
            >
              {t('crm')}
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;