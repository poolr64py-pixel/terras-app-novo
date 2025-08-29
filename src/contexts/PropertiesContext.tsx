// src/contexts/PropertiesContext.tsx
import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';

export interface Property {
  id: number;
  title: string;
  type: 'fazenda' | 'terreno' | 'chacara';
  location: string;
  area: string;
  price: string;
  priceValue: number;
  description: string;
  features: string[];
  image: string;
}

export interface Filters {
  location: string;
  type: string;
  priceRange: string;
}

interface PropertiesContextType {
  properties: Property[];
  filteredProperties: Property[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
  sendWhatsApp: (message: string) => void;
  whatsappNumber: string;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  return context;
};

interface PropertiesProviderProps {
  children: ReactNode;
}

export const PropertiesProvider: React.FC<PropertiesProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>({
    location: '',
    type: '',
    priceRange: ''
  });

  const whatsappNumber = '+595994718400';

  // Dados das propriedades
  const properties: Property[] = useMemo(() => [
    {
      id: 1,
      title: 'Fazenda Para Soja - Alto Paraná',
      type: 'fazenda',
      location: 'Alto Paraná',
      area: '500 hectares',
      price: 'USD 2.500.000',
      priceValue: 2500000,
      description: 'Fazenda produtiva com excelente infraestrutura para cultivo de soja',
      features: ['Solo fértil', 'Água abundante', 'Energia elétrica', 'Estrada pavimentada'],
      image: '🌾'
    },
    {
      id: 2,
      title: 'Terreno Rural - Canindeyú',
      type: 'terreno',
      location: 'Canindeyú',
      area: '100 hectares',
      price: 'USD 300.000',
      priceValue: 300000,
      description: 'Terreno plano com potencial para agricultura e pecuária',
      features: ['Topografia plana', 'Nascente de água', 'Documentação ok', 'Acesso fácil'],
      image: '🏞️'
    },
    {
      id: 3,
      title: 'Chácara de Lazer - San Pedro',
      type: 'chacara',
      location: 'San Pedro',
      area: '25 hectares',
      price: 'USD 125.000',
      priceValue: 125000,
      description: 'Chácara ideal para lazer e pequenos cultivos',
      features: ['Casa sede', 'Piscina natural', 'Frutas nativas', 'Próxima à cidade'],
      image: '🏡'
    },
    {
      id: 4,
      title: 'Fazenda Pecuária - Concepción',
      type: 'fazenda',
      location: 'Concepción',
      area: '800 hectares',
      price: 'USD 3.200.000',
      priceValue: 3200000,
      description: 'Fazenda com infraestrutura completa para gado',
      features: ['Pasto formado', 'Curral moderno', 'Poço artesiano', 'Casa do caseiro'],
      image: '🐄'
    },
    {
      id: 5,
      title: 'Terreno Agrícola - Itapúa',
      type: 'terreno',
      location: 'Itapúa',
      area: '200 hectares',
      price: 'USD 600.000',
      priceValue: 600000,
      description: 'Terreno ideal para plantio de milho e soja',
      features: ['Solo de primeira', 'Boa localização', 'Documentação limpa', 'Fácil acesso'],
      image: '🌽'
    },
    {
      id: 6,
      title: 'Chácara Residencial - Paraguarí',
      type: 'chacara',
      location: 'Paraguarí',
      area: '15 hectares',
      price: 'USD 85.000',
      priceValue: 85000,
      description: 'Chácara com casa e área de lazer completa',
      features: ['Casa 3 quartos', 'Área gourmet', 'Pomar', 'Poço próprio'],
      image: '🏘️'
    },
    {
      id: 7,
      title: 'Fazenda Mista - Caaguazú',
      type: 'fazenda',
      location: 'Caaguazú',
      area: '600 hectares',
      price: 'USD 2.800.000',
      priceValue: 2800000,
      description: 'Fazenda para agricultura e pecuária',
      features: ['Área plantada', 'Curral completo', 'Casa sede', 'Funcionários'],
      image: '🚜'
    },
    {
      id: 8,
      title: 'Terreno de Investimento - Amambay',
      type: 'terreno',
      location: 'Amambay',
      area: '75 hectares',
      price: 'USD 220.000',
      priceValue: 220000,
      description: 'Terreno com grande potencial de valorização',
      features: ['Próximo à cidade', 'Boa topografia', 'Água natural', 'Energia próxima'],
      image: '📈'
    }
  ], []);

  // Propriedades filtradas
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Filtro por localização
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Filtro por tipo
      if (filters.type && property.type !== filters.type) {
        return false;
      }

      // Filtro por faixa de preço
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (min && property.priceValue < min) return false;
        if (max && property.priceValue > max) return false;
      }

      return true;
    });
  }, [properties, filters]);

  // Função para enviar WhatsApp
  const sendWhatsApp = useCallback((message: string) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }, [whatsappNumber]);

  return (
    <PropertiesContext.Provider value={{
      properties,
      filteredProperties,
      filters,
      setFilters,
      sendWhatsApp,
      whatsappNumber
    }}>
      {children}
    </PropertiesContext.Provider>
  );
};