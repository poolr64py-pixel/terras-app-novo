// src/pages/HomePage.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('companyName')} - {t('heroTitle')}</title>
        <meta name="description" content={t('heroSubtitle')} />
      </Helmet>
      
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* resto do conteúdo igual ao anterior */}
      </div>
    </>
  );
};

export default HomePage;