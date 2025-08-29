import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useProperties } from '../../contexts/PropertiesContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { sendWhatsApp, whatsappNumber } = useProperties();

  const footerSections = {
    company: [
      { path: '/about', label: t('aboutUs') },
      { path: '/services', label: t('ourServices') },
      { path: '/properties', label: t('ourProperties') },
      { path: '/contact', label: t('getInTouch') }
    ],
    legal: [
      { path: '/privacy', label: 'Política de Privacidade' },
      { path: '/terms', label: 'Termos de Uso' },
      { path: '/cookies', label: 'Política de Cookies' }
    ]
  };

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
      color: 'white',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '60px 5% 40px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Company Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '32px' }}>🏠</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
                  {t('companyName')}
                </h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>
                  {t('subtitle')}
                </p>
              </div>
            </div>
            <p style={{
              lineHeight: '1.6',
              opacity: 0.9,
              marginBottom: '20px',
              fontSize: '16px'
            }}>
              {t('aboutText')}
            </p>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => sendWhatsApp(t('moreInfo'))}
                style={{
                  background: '#25D366',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                💬 WhatsApp
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#f7fafc'
            }}>Links Rápidos</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {footerSections.company.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    style={{
                      color: 'rgba(255,255,255,0.8)',
                      textDecoration: 'none',
                      fontSize: '16px'
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#f7fafc'
            }}>Contato</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>WhatsApp</p>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>{whatsappNumber}</p>
              </div>
              
              <div>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Email</p>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>contato@imoveisparaguay.com</p>
              </div>
              
              <div>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Localização</p>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>Asunción, Paraguay</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '20px 5%'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            fontSize: '14px',
            opacity: 0.7
          }}>
            © {new Date().getFullYear()} {t('companyName')}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;