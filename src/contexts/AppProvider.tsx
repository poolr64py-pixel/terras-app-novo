// src/contexts/AppProvider.tsx
import React, { ReactNode } from 'react';
import { PropertiesProvider } from './PropertiesContext';
import { LanguageProvider } from './LanguageContext';
import { HelmetProvider } from 'react-helmet-async';

const helmetContext = {};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <HelmetProvider context={helmetContext}>
      <LanguageProvider>
        <PropertiesProvider>
          {children}
        </PropertiesProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
};