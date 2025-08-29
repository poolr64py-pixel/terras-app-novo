import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useProperties } from '../../contexts/PropertiesContext';

const WhatsAppButton: React.FC = () => {
  const { t } = useLanguage();
  const { sendWhatsApp } = useProperties();

  return (
    <button
      onClick={() => sendWhatsApp(t('moreInfo'))}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        border: 'none',
        cursor: 'pointer',
        fontSize: '24px',
        color: 'white',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      💬
    </button>
  );
};

export default WhatsAppButton;