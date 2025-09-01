// src/pages/ServicesPage.tsx
import SEO from '../components/UI/SEO';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProperties } from '../contexts/PropertiesContext';

const ServicesPage: React.FC = () => {
  const { t } = useLanguage();
  const { sendWhatsApp } = useProperties();

  const services = [
    {
      icon: '🔍',
      title: t('propertySearch'),
      description: t('propertySearchDesc')
    },
    {
      icon: '📋',
      title: t('legalDocumentation'),
      description: t('legalDocumentationDesc')
    },
    {
      icon: '🏗️',
      title: t('technicalAdvice'),
      description: t('technicalAdviceDesc')
    }
  ];

  return (
    <>
    <SEO 
      title={t('ourServices')}
      description="Serviços especializados em investimentos imobiliários no Paraguay - consultoria, documentação legal e assessoria técnica"
      keywords="serviços imobiliários paraguay, consultoria investimento paraguay, documentação legal propriedades"
    />
    <div style={{
      paddingTop: '100px',
      minHeight: '100vh',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '60px',
          color: '#1a202c'
        }}>{t('ourServices')}</h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px'
        }}>
          {services.map((service, index) => (
            <div key={index} style={{
              background: 'white',
              padding: '40px 30px',
              borderRadius: '15px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            }}
            >
              <div style={{
                fontSize: '4rem',
                marginBottom: '25px'
              }}>{service.icon}</div>
              
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#1a202c'
              }}>{service.title}</h3>
              
              <p style={{
                color: '#64748b',
                lineHeight: '1.6',
                marginBottom: '30px',
                fontSize: '1.1rem'
              }}>{service.description}</p>
              
              <button
                onClick={() => sendWhatsApp(t('servicesInfo'))}
                style={{
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {t('requestQuote')}
              </button>
            </div>
          ))}
        </div>
     </div>
    </div>
</>
  );
};

export default ServicesPage;