// src/pages/ContactPage.tsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProperties } from '../contexts/PropertiesContext';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const { sendWhatsApp, whatsappNumber } = useProperties();

  return (
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
        }}>{t('getInTouch')}</h1>
        
        <div style={{
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          padding: '50px 40px'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '50px'
          }}>
            <div style={{ fontSize: '5rem', marginBottom: '25px' }}>📞</div>
            <p style={{
              fontSize: '1.2rem',
              color: '#64748b',
              lineHeight: '1.8',
              maxWidth: '600px',
              margin: '0 auto'
            }}>{t('contactText')}</p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '20px',
                background: '#f8fafc',
                borderRadius: '10px'
              }}>
                <div style={{ fontSize: '2rem' }}>📱</div>
                <div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '5px', color: '#1a202c' }}>WhatsApp</h3>
                  <p style={{ color: '#64748b', fontSize: '1.1rem' }}>{whatsappNumber}</p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '20px',
                background: '#f8fafc',
                borderRadius: '10px'
              }}>
                <div style={{ fontSize: '2rem' }}>📧</div>
                <div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '5px', color: '#1a202c' }}>Email</h3>
                  <p style={{ color: '#64748b', fontSize: '1.1rem' }}>contato@imoveisparaguay.com</p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '20px',
                background: '#f8fafc',
                borderRadius: '10px'
              }}>
                <div style={{ fontSize: '2rem' }}>📍</div>
                <div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '5px', color: '#1a202c' }}>Localização</h3>
                  <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Asunción, Paraguay</p>
                </div>
              </div>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '40px 30px',
              borderRadius: '15px',
              color: 'white'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '25px',
                textAlign: 'center'
              }}>Entre em contato agora!</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <button
                  onClick={() => sendWhatsApp(t('generalInterest'))}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    padding: '15px 20px',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                  <span>💬</span> Interesse Geral
                </button>
                
                <button
                  onClick={() => sendWhatsApp(t('servicesInfo'))}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    padding: '15px 20px',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                  <span>🛠️</span> Informações sobre Serviços
                </button>
                
                <button
                  onClick={() => sendWhatsApp("Gostaria de agendar uma visita às propriedades.")}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    padding: '15px 20px',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                  <span>🗓️</span> {t('scheduleVisit')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;