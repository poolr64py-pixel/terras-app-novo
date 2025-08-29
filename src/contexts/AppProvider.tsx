// src/contexts/AppProvider.tsx
import React, { ReactNode } from 'react';
import { LanguageProvider } from './LanguageContext';
import { PropertiesProvider } from './PropertiesContext';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <PropertiesProvider>
        {children}
      </PropertiesProvider>
    </LanguageProvider>
  );
};