// src/pages/PropertiesPage.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import { useProperties } from '../contexts/PropertiesContext';

const PropertiesPage: React.FC = () => {
  const { t } = useLanguage();
  const { filteredProperties, filters, setFilters, sendWhatsApp } = useProperties();

  return (
    <>
      <Helmet>
        <title>{t('ourProperties')} - {t('companyName')}</title>
        <meta name="description" content="Explore nossas propriedades disponíveis no Paraguay - fazendas, terrenos e chácaras para investimento" />
        <meta name="keywords" content="propriedades paraguay, fazendas venda paraguay, terrenos rurais paraguay" />
      </Helmet>
      
      <div style={{
        paddingTop: '100px',
        minHeight: '100vh',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '40px',
            color: '#1a202c'
          }}>
            {t('ourProperties')}
          </h1>
          
          {/* Filters Section */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            marginBottom: '40px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              <input
                type="text"
                placeholder={t('location')}
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                style={{
                  padding: '12px 15px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
              
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                style={{
                  padding: '12px 15px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: 'white'
                }}
              >
                <option value="">{t('allTypes')}</option>
                <option value="fazenda">{t('farm')}</option>
                <option value="terreno">{t('land')}</option>
                <option value="chacara">{t('ranch')}</option>
              </select>
              
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                style={{
                  padding: '12px 15px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: 'white'
                }}
              >
                <option value="">{t('allPrices')}</option>
                <option value="0-500000">{t('upTo500k')}</option>
                <option value="500000-1000000">{t('from500kTo1M')}</option>
                <option value="1000000-999999999">{t('above1M')}</option>
              </select>
              
              <button
                onClick={() => setFilters({location: '', type: '', priceRange: ''})}
                style={{
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '12px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {t('clearFilters')}
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '30px'
            }}>
              {filteredProperties.map((property) => (
                <div key={property.id} style={{
                  background: 'white',
                  borderRadius: '15px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  overflow: 'hidden'
                }}>
                  {/* Image Section */}
                  <div style={{
                    padding: '0',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {(() => {
                      // Verificação segura para imagens
                      if (!property.image) {
                        return <div style={{ fontSize: '4rem' }}>🏞️</div>;
                      }
                      
                      if (typeof property.image === 'string' && property.image.startsWith('data:image')) {
                        return (
                          <img 
                            src={property.image} 
                            alt={property.title || 'Imagem da propriedade'}
                            style={{
                              width: '100%',
                              height: '200px',
                              objectFit: 'cover'
                            }}
                          />
                        );
                      }
                      
                      // Fallback para emoji ou string
                      return <div style={{ fontSize: '4rem' }}>{String(property.image)}</div>;
                    })()}
                  </div>
                  
                  {/* Content Section */}
                  <div style={{ padding: '25px' }}>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      marginBottom: '15px',
                      color: '#1a202c'
                    }}>
                      {property.title || 'Propriedade sem título'}
                    </h3>
                    
                    <p style={{
                      color: '#64748b',
                      marginBottom: '20px',
                      lineHeight: '1.6'
                    }}>
                      {property.description || 'Sem descrição disponível'}
                    </p>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '15px',
                      marginBottom: '20px'
                    }}>
                      <div>
                        <strong>{t('location')}:</strong> {property.location || 'N/A'}
                      </div>
                      <div>
                        <strong>{t('area')}:</strong> {property.area || 'N/A'}
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '25px' }}>
                      <div style={{ marginBottom: '10px' }}>
                        <strong>{t('features')}:</strong>
                      </div>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}>
                        {property.features && property.features.length > 0 ? (
                          property.features.map((feature, idx) => (
                            <span key={idx} style={{
                              background: '#f1f5f9',
                              color: '#475569',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '0.85rem',
                              fontWeight: '500'
                            }}>
                              {feature}
                            </span>
                          ))
                        ) : (
                          <span style={{
                            color: '#94a3b8',
                            fontSize: '0.9rem',
                            fontStyle: 'italic'
                          }}>
                            Nenhuma característica listada
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Price and Action Button */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#667eea'
                      }}>
                        {property.price || 'Preço a consultar'}
                      </div>
                      
                      {/* Botão de Interesse - Apenas para clientes */}
                      <button
                        onClick={() => sendWhatsApp(`Tenho interesse em ${property.title || 'uma propriedade'}`)}
                        style={{
                          background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                          color: 'white',
                          padding: '12px 20px',
                          border: 'none',
                          borderRadius: '25px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        {t('interested')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              background: 'white',
              borderRadius: '15px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
              <p style={{
                fontSize: '1.2rem',
                color: '#64748b',
                marginBottom: '30px'
              }}>
                {t('noProperties')}
              </p>
              <button
                onClick={() => setFilters({location: '', type: '', priceRange: ''})}
                style={{
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '12px 25px',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {t('clearFilters')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertiesPage;