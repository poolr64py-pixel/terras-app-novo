// src/pages/AboutPage.tsx
import SEO from '../components/UI/SEO';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProperties } from '../contexts/PropertiesContext';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const { sendWhatsApp } = useProperties();

  return (
      <>
    <SEO 
      title={t('aboutUs')}
      description="15 anos de experiência no mercado imobiliário paraguaio, especialistas em investimentos em terras rurais"
      keywords="empresa imobiliária paraguay, experiência mercado paraguaio, investimento terras rurais"
    />
    <div style={{
      paddingTop: '100px',
      minHeight: '100vh',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '50px',
          color: '#1a202c'
        }}>{t('aboutUs')}</h1>
        
        <div style={{
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          padding: '50px 40px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '5rem',
            marginBottom: '30px'
          }}>🏢</div>
          
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '25px'
          }}>{t('companyName')}</h2>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#64748b',
            lineHeight: '1.8',
            marginBottom: '50px',
            maxWidth: '800px',
            margin: '0 auto 50px auto'
          }}>{t('aboutText')}</p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '50px'
          }}>
            <div style={{
              padding: '30px 20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '15px',
              color: 'white'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎯</div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '15px'
              }}>{t('mission')}</h3>
              <p style={{ lineHeight: '1.6', opacity: '0.9' }}>{t('missionText')}</p>
            </div>
            
            <div style={{
              padding: '30px 20px',
              background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
              borderRadius: '15px',
              color: 'white'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>👁️</div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '15px'
              }}>{t('vision')}</h3>
              <p style={{ lineHeight: '1.6', opacity: '0.9' }}>{t('visionText')}</p>
            </div>
            
            <div style={{
              padding: '30px 20px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '15px',
              color: 'white'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>⭐</div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '15px'
              }}>{t('values')}</h3>
              <p style={{ lineHeight: '1.6', opacity: '0.9' }}>{t('valuesText')}</p>
            </div>
          </div>

          <button
            onClick={() => sendWhatsApp(t('moreInfo'))}
            style={{
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              color: 'white',
              padding: '18px 40px',
              border: 'none',
              borderRadius: '30px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {t('getInTouch')}
          </button>
        </div>
      </div>
    </div>
   </>
  );
};

export default AboutPage;