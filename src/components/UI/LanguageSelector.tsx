import React from 'react';
import { useLanguage, Language } from '../../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      style={{
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '4px',
        color: 'white',
        padding: '5px 10px',
        fontSize: '14px'
      }}
    >
      <option value="pt" style={{ color: 'black' }}>🇧🇷 PT</option>
      <option value="en" style={{ color: 'black' }}>🇺🇸 EN</option>
      <option value="es" style={{ color: 'black' }}>🇪🇸 ES</option>
      <option value="de" style={{ color: 'black' }}>🇩🇪 DE</option>
    </select>
  );
};

export default LanguageSelector;