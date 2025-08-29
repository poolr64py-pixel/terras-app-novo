// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'pt' | 'en' | 'es' | 'de';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations: Translations = {
  pt: {
    // Navegação
    companyName: 'Imóveis Paraguay',
    subtitle: 'Terras no Paraguay',
    home: 'Início',
    properties: 'Imóveis',
    services: 'Serviços',
    about: 'Sobre',
    contact: 'Contato',
    crm: 'CRM',
    
    // Hero Section
    heroTitle: 'Terras no Paraguay',
    heroSubtitle: 'Invista no seu futuro com as melhores oportunidades em terras paraguaias. Preços acessíveis, alta rentabilidade e localização estratégica.',
    whatsappButton: 'Falar no WhatsApp',
    viewProperties: 'Ver Imóveis',
    
    // Benefícios
    whyInvest: 'Por que investir no Paraguay?',
    affordablePrices: 'Preços Acessíveis',
    affordableDesc: 'Até 70% mais barato que o Brasil',
    fertileSoil: 'Solo Fértil',
    fertileSoilDesc: 'Perfeito para agricultura e pecuária',
    legalDoc: '100% Legal',
    legalDocDesc: 'Documentação completa e transparente',
    
    // Estatísticas
    propertiesSold: 'Propriedades Vendidas',
    clientsSatisfied: 'Clientes Satisfeitos',
    yearsExperience: 'Anos de Experiência',
    
    // Propriedades
    ourProperties: 'Nossos Imóveis',
    allRegions: 'Todas as Regiões',
    allTypes: 'Todos os Tipos',
    allPrices: 'Todas as Faixas',
    farm: 'Fazenda',
    land: 'Terreno',
    ranch: 'Chácara',
    upTo500k: 'Até USD 500.000',
    from500kTo1M: 'USD 500.000 - 1.000.000',
    above1M: 'Acima de USD 1.000.000',
    location: 'Localização',
    area: 'Área',
    features: 'Características',
    interested: 'Tenho Interesse',
    noProperties: 'Nenhum imóvel encontrado com os filtros selecionados.',
    clearFilters: 'Limpar Filtros',
    
    // Serviços
    ourServices: 'Nossos Serviços',
    propertySearch: 'Busca de Propriedades',
    propertySearchDesc: 'Encontramos a propriedade ideal conforme seu perfil e orçamento',
    legalDocumentation: 'Documentação Legal',
    legalDocumentationDesc: 'Cuidamos de toda a parte legal e burocrática da compra',
    technicalAdvice: 'Assessoria Técnica',
    technicalAdviceDesc: 'Orientação completa sobre desenvolvimento da propriedade',
    requestQuote: 'Solicitar Orçamento',
    
    // Sobre
    aboutUs: 'Sobre Nós',
    aboutText: 'Com mais de 15 anos de experiência no mercado imobiliário paraguaio, somos referência em investimentos em terras rurais.',
    mission: 'Missão',
    vision: 'Visão',
    values: 'Valores',
    missionText: 'Conectar investidores às melhores oportunidades em terras paraguaias com total transparência e segurança.',
    visionText: 'Ser a principal referência em investimentos imobiliários rurais no Paraguay.',
    valuesText: 'Transparência, confiabilidade, excelência no atendimento e compromisso com o sucesso do cliente.',
    
    // Contato
    getInTouch: 'Entre em Contato',
    contactText: 'Entre em contato conosco para mais informações sobre investimentos em terras paraguaias.',
    scheduleVisit: 'Agendar Visita',
    
    // WhatsApp Messages
    generalInterest: 'Olá! Tenho interesse em conhecer mais sobre as terras disponíveis no Paraguay.',
    moreInfo: 'Olá! Gostaria de mais informações sobre as terras no Paraguay.',
    propertyInterest: 'Tenho interesse em',
    servicesInfo: 'Gostaria de saber mais sobre os serviços oferecidos.',
    
    // CRM
    backToSite: 'Voltar ao Site',
    crmTitle: 'CRM - Painel Administrativo',
    leadsToday: 'Leads Hoje',
    openProposals: 'Propostas Abertas',
    monthlySales: 'Vendas Mês',
    revenue: 'Faturamento',
    recentLeads: 'Leads Recentes',
    propertyPerformance: 'Performance das Propriedades'
  },
  
  en: {
    // Navigation
    companyName: 'Real Estate Paraguay',
    subtitle: 'Land in Paraguay',
    home: 'Home',
    properties: 'Properties',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    crm: 'CRM',
    
    // Hero Section
    heroTitle: 'Land in Paraguay',
    heroSubtitle: 'Invest in your future with the best opportunities in Paraguayan land. Affordable prices, high profitability and strategic location.',
    whatsappButton: 'Talk on WhatsApp',
    viewProperties: 'View Properties',
    
    // Benefits
    whyInvest: 'Why invest in Paraguay?',
    affordablePrices: 'Affordable Prices',
    affordableDesc: 'Up to 70% cheaper than Brazil',
    fertileSoil: 'Fertile Soil',
    fertileSoilDesc: 'Perfect for agriculture and livestock',
    legalDoc: '100% Legal',
    legalDocDesc: 'Complete and transparent documentation',
    
    // Statistics
    propertiesSold: 'Properties Sold',
    clientsSatisfied: 'Satisfied Clients',
    yearsExperience: 'Years of Experience',
    
    // Properties
    ourProperties: 'Our Properties',
    allRegions: 'All Regions',
    allTypes: 'All Types',
    allPrices: 'All Price Ranges',
    farm: 'Farm',
    land: 'Land',
    ranch: 'Ranch',
    upTo500k: 'Up to USD 500,000',
    from500kTo1M: 'USD 500,000 - 1,000,000',
    above1M: 'Above USD 1,000,000',
    location: 'Location',
    area: 'Area',
    features: 'Features',
    interested: 'I\'m Interested',
    noProperties: 'No properties found with selected filters.',
    clearFilters: 'Clear Filters',
    
    // Services
    ourServices: 'Our Services',
    propertySearch: 'Property Search',
    propertySearchDesc: 'We find the ideal property according to your profile and budget',
    legalDocumentation: 'Legal Documentation',
    legalDocumentationDesc: 'We take care of all legal and bureaucratic aspects of the purchase',
    technicalAdvice: 'Technical Advisory',
    technicalAdviceDesc: 'Complete guidance on property development',
    requestQuote: 'Request Quote',
    
    // About
    aboutUs: 'About Us',
    aboutText: 'With over 15 years of experience in the Paraguayan real estate market, we are a reference in rural land investments.',
    mission: 'Mission',
    vision: 'Vision',
    values: 'Values',
    missionText: 'Connect investors to the best opportunities in Paraguayan land with complete transparency and security.',
    visionText: 'To be the main reference in rural real estate investments in Paraguay.',
    valuesText: 'Transparency, reliability, excellence in service and commitment to customer success.',
    
    // Contact
    getInTouch: 'Get in Touch',
    contactText: 'Contact us for more information about investments in Paraguayan land.',
    scheduleVisit: 'Schedule Visit',
    
    // WhatsApp Messages
    generalInterest: 'Hello! I\'m interested in learning more about the available land in Paraguay.',
    moreInfo: 'Hello! I would like more information about land in Paraguay.',
    propertyInterest: 'I\'m interested in',
    servicesInfo: 'I would like to know more about the services offered.',
    
    // CRM
    backToSite: 'Back to Site',
    crmTitle: 'CRM - Administrative Panel',
    leadsToday: 'Leads Today',
    openProposals: 'Open Proposals',
    monthlySales: 'Monthly Sales',
    revenue: 'Revenue',
    recentLeads: 'Recent Leads',
    propertyPerformance: 'Property Performance'
  },
  
  es: {
    // Navegación
    companyName: 'Inmobiliaria Paraguay',
    subtitle: 'Tierras en Paraguay',
    home: 'Inicio',
    properties: 'Propiedades',
    services: 'Servicios',
    about: 'Acerca de',
    contact: 'Contacto',
    crm: 'CRM',
    
    // Hero Section
    heroTitle: 'Tierras en Paraguay',
    heroSubtitle: 'Invierte en tu futuro con las mejores oportunidades en tierras paraguayas. Precios accesibles, alta rentabilidad y ubicación estratégica.',
    whatsappButton: 'Hablar por WhatsApp',
    viewProperties: 'Ver Propiedades',
    
    // Beneficios
    whyInvest: '¿Por qué invertir en Paraguay?',
    affordablePrices: 'Precios Accesibles',
    affordableDesc: 'Hasta 70% más barato que Brasil',
    fertileSoil: 'Suelo Fértil',
    fertileSoilDesc: 'Perfecto para agricultura y ganadería',
    legalDoc: '100% Legal',
    legalDocDesc: 'Documentación completa y transparente',
    
    // Estadísticas
    propertiesSold: 'Propiedades Vendidas',
    clientsSatisfied: 'Clientes Satisfechos',
    yearsExperience: 'Años de Experiencia',
    
    // Propiedades
    ourProperties: 'Nuestras Propiedades',
    allRegions: 'Todas las Regiones',
    allTypes: 'Todos los Tipos',
    allPrices: 'Todos los Rangos',
    farm: 'Granja',
    land: 'Terreno',
    ranch: 'Estancia',
    upTo500k: 'Hasta USD 500.000',
    from500kTo1M: 'USD 500.000 - 1.000.000',
    above1M: 'Arriba de USD 1.000.000',
    location: 'Ubicación',
    area: 'Área',
    features: 'Características',
    interested: 'Me Interesa',
    noProperties: 'No se encontraron propiedades con los filtros seleccionados.',
    clearFilters: 'Limpiar Filtros',
    
    // Servicios
    ourServices: 'Nuestros Servicios',
    propertySearch: 'Búsqueda de Propiedades',
    propertySearchDesc: 'Encontramos la propiedad ideal según tu perfil y presupuesto',
    legalDocumentation: 'Documentación Legal',
    legalDocumentationDesc: 'Nos encargamos de toda la parte legal y burocrática de la compra',
    technicalAdvice: 'Asesoría Técnica',
    technicalAdviceDesc: 'Orientación completa sobre el desarrollo de la propiedad',
    requestQuote: 'Solicitar Cotización',
    
    // Acerca de
    aboutUs: 'Acerca de Nosotros',
    aboutText: 'Con más de 15 años de experiencia en el mercado inmobiliario paraguayo, somos referencia en inversiones en tierras rurales.',
    mission: 'Misión',
    vision: 'Visión',
    values: 'Valores',
    missionText: 'Conectar inversores con las mejores oportunidades en tierras paraguayas con total transparencia y seguridad.',
    visionText: 'Ser la principal referencia en inversiones inmobiliarias rurales en Paraguay.',
    valuesText: 'Transparencia, confiabilidad, excelencia en atención y compromiso con el éxito del cliente.',
    
    // Contacto
    getInTouch: 'Contáctanos',
    contactText: 'Contáctanos para más información sobre inversiones en tierras paraguayas.',
    scheduleVisit: 'Programar Visita',
    
    // Mensajes WhatsApp
    generalInterest: '¡Hola! Tengo interés en conocer más sobre las tierras disponibles en Paraguay.',
    moreInfo: '¡Hola! Me gustaría más información sobre las tierras en Paraguay.',
    propertyInterest: 'Tengo interés en',
    servicesInfo: 'Me gustaría saber más sobre los servicios ofrecidos.',
    
    // CRM
    backToSite: 'Volver al Sitio',
    crmTitle: 'CRM - Panel Administrativo',
    leadsToday: 'Leads Hoy',
    openProposals: 'Propuestas Abiertas',
    monthlySales: 'Ventas del Mes',
    revenue: 'Facturación',
    recentLeads: 'Leads Recientes',
    propertyPerformance: 'Performance de Propiedades'
  },
  
  de: {
    // Navigation
    companyName: 'Immobilien Paraguay',
    subtitle: 'Land in Paraguay',
    home: 'Startseite',
    properties: 'Immobilien',
    services: 'Dienstleistungen',
    about: 'Über uns',
    contact: 'Kontakt',
    crm: 'CRM',
    
    // Hero Section
    heroTitle: 'Land in Paraguay',
    heroSubtitle: 'Investieren Sie in Ihre Zukunft mit den besten Möglichkeiten in paraguayischem Land. Erschwingliche Preise, hohe Rentabilität und strategische Lage.',
    whatsappButton: 'Per WhatsApp sprechen',
    viewProperties: 'Immobilien ansehen',
    
    // Benefits
    whyInvest: 'Warum in Paraguay investieren?',
    affordablePrices: 'Erschwingliche Preise',
    affordableDesc: 'Bis zu 70% günstiger als Brasilien',
    fertileSoil: 'Fruchtbarer Boden',
    fertileSoilDesc: 'Perfekt für Landwirtschaft und Viehzucht',
    legalDoc: '100% Legal',
    legalDocDesc: 'Vollständige und transparente Dokumentation',
    
    // Statistics
    propertiesSold: 'Verkaufte Immobilien',
    clientsSatisfied: 'Zufriedene Kunden',
    yearsExperience: 'Jahre Erfahrung',
    
    // Properties
    ourProperties: 'Unsere Immobilien',
    allRegions: 'Alle Regionen',
    allTypes: 'Alle Typen',
    allPrices: 'Alle Preisklassen',
    farm: 'Bauernhof',
    land: 'Land',
    ranch: 'Ranch',
    upTo500k: 'Bis USD 500.000',
    from500kTo1M: 'USD 500.000 - 1.000.000',
    above1M: 'Über USD 1.000.000',
    location: 'Lage',
    area: 'Fläche',
    features: 'Eigenschaften',
    interested: 'Ich bin interessiert',
    noProperties: 'Keine Immobilien mit den ausgewählten Filtern gefunden.',
    clearFilters: 'Filter löschen',
    
    // Services
    ourServices: 'Unsere Dienstleistungen',
    propertySearch: 'Immobiliensuche',
    propertySearchDesc: 'Wir finden die ideale Immobilie nach Ihrem Profil und Budget',
    legalDocumentation: 'Rechtliche Dokumentation',
    legalDocumentationDesc: 'Wir kümmern uns um alle rechtlichen und bürokratischen Aspekte des Kaufs',
    technicalAdvice: 'Technische Beratung',
    technicalAdviceDesc: 'Vollständige Beratung zur Immobilienentwicklung',
    requestQuote: 'Angebot anfordern',
    
    // About
    aboutUs: 'Über Uns',
    aboutText: 'Mit über 15 Jahren Erfahrung im paraguayischen Immobilienmarkt sind wir eine Referenz für Investitionen in ländliche Grundstücke.',
    mission: 'Mission',
    vision: 'Vision',
    values: 'Werte',
    missionText: 'Investoren mit den besten Möglichkeiten in paraguayischem Land mit vollständiger Transparenz und Sicherheit verbinden.',
    visionText: 'Die Hauptreferenz für ländliche Immobilieninvestitionen in Paraguay zu sein.',
    valuesText: 'Transparenz, Zuverlässigkeit, Exzellenz im Service und Engagement für den Kundenerfolg.',
    
    // Contact
    getInTouch: 'Kontakt aufnehmen',
    contactText: 'Kontaktieren Sie uns für weitere Informationen über Investitionen in paraguayisches Land.',
    scheduleVisit: 'Besichtigung vereinbaren',
    
    // WhatsApp Messages
    generalInterest: 'Hallo! Ich interessiere mich dafür, mehr über die verfügbaren Grundstücke in Paraguay zu erfahren.',
    moreInfo: 'Hallo! Ich hätte gerne weitere Informationen über Land in Paraguay.',
    propertyInterest: 'Ich interessiere mich für',
    servicesInfo: 'Ich würde gerne mehr über die angebotenen Dienstleistungen erfahren.',
    
    // CRM
    backToSite: 'Zurück zur Website',
    crmTitle: 'CRM - Verwaltungspanel',
    leadsToday: 'Leads Heute',
    openProposals: 'Offene Angebote',
    monthlySales: 'Monatliche Verkäufe',
    revenue: 'Umsatz',
    recentLeads: 'Neueste Leads',
    propertyPerformance: 'Immobilien Performance'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};