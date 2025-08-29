// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useProperties } from '../contexts/PropertiesContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { sendWhatsApp } = useProperties();

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      margin: 0,
      padding: 0
    }}>
      {/* Hero Section */}
      <div style={{
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        padding: '20px',
        minHeight: '100vh'
      }}>
        <div style={{
          maxWidth: '1000px',
          width: '100%'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            margin: '0 0 2rem 0',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            {t('heroTitle')}
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            margin: '0 0 3rem 0',
            opacity: '0.95',
            lineHeight: '1.6',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {t('heroSubtitle')}
          </p>
          
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => sendWhatsApp(t('generalInterest'))}
              style={{
                padding: '15px 40px',
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: 'bold',
                minWidth: '200px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.backgroundColor = '#45a049';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#4CAF50';
              }}
            >
              {t('whatsappButton')}
            </button>
            
            <Link
              to="/properties"
              style={{
                padding: '15px 30px',
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: 'bold',
                minWidth: '180px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {t('viewProperties')}
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        padding: '80px 20px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            marginBottom: '60px',
            fontWeight: 'bold'
          }}>
            {t('whyInvest')}
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px'
          }}>
            {[
              { icon: '💰', title: t('affordablePrices'), desc: t('affordableDesc') },
              { icon: '🌾', title: t('fertileSoil'), desc: t('fertileSoilDesc') },
              { icon: '📋', title: t('legalDoc'), desc: t('legalDocDesc') }
            ].map((item, index) => (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '40px 30px',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{item.icon}</div>
                <h3 style={{
                  fontSize: '1.5rem',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>{item.title}</h3>
                <p style={{
                  fontSize: '1.1rem',
                  opacity: '0.9',
                  lineHeight: '1.6'
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        padding: '80px 20px',
        background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            textAlign: 'center'
          }}>
            {[
              { number: '500+', label: t('propertiesSold'), icon: '🏘️' },
              { number: '1000+', label: t('clientsSatisfied'), icon: '😊' },
              { number: '15+', label: t('yearsExperience'), icon: '⭐' }
            ].map((stat, index) => (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '40px 30px',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{stat.icon}</div>
                <div style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 'bold',
                  marginBottom: '10px'
                }}>{stat.number}</div>
                <div style={{
                  fontSize: '1.2rem',
                  opacity: '0.9'
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;