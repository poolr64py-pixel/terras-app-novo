// src/pages/PropertiesPage.tsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProperties } from '../contexts/PropertiesContext';

const PropertiesPage: React.FC = () => {
  const { t } = useLanguage();
  const { filteredProperties, filters, setFilters, sendWhatsApp } = useProperties();

  return (
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
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '40px',
          color: '#1a202c'
        }}>{t('ourProperties')}</h1>
        
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
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#667eea'}
              onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = '#e2e8f0'}
            />
            
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              style={{
                padding: '12px 15px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: 'white',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => (e.target as HTMLSelectElement).style.borderColor = '#667eea'}
              onBlur={(e) => (e.target as HTMLSelectElement).style.borderColor = '#e2e8f0'}
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
                backgroundColor: 'white',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => (e.target as HTMLSelectElement).style.borderColor = '#667eea'}
              onBlur={(e) => (e.target as HTMLSelectElement).style.borderColor = '#e2e8f0'}
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
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{
                  fontSize: '4rem',
                  padding: '40px',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                }}>
                  {property.image}
                </div>
                
                <div style={{ padding: '25px' }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    marginBottom: '15px',
                    color: '#1a202c'
                  }}>{property.title}</h3>
                  
                  <p style={{
                    color: '#64748b',
                    marginBottom: '20px',
                    lineHeight: '1.6'
                  }}>{property.description}</p>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '15px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ fontSize: '1rem' }}>📍</span>
                      <span style={{ fontWeight: '600', color: '#4a5568' }}>{t('location')}:</span>
                      <span style={{ color: '#64748b' }}>{property.location}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ fontSize: '1rem' }}>📏</span>
                      <span style={{ fontWeight: '600', color: '#4a5568' }}>{t('area')}:</span>
                      <span style={{ color: '#64748b' }}>{property.area}</span>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '25px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '10px'
                    }}>
                      <span style={{ fontSize: '1rem' }}>⭐</span>
                      <span style={{ fontWeight: '600', color: '#4a5568' }}>{t('features')}:</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {property.features.map((feature, idx) => (
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
                      ))}
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#667eea'
                    }}>{property.price}</div>
                    <button
                      onClick={() => sendWhatsApp(`${t('propertyInterest')} ${property.title}`)}
                      style={{
                        background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                        color: 'white',
                        padding: '12px 20px',
                        border: 'none',
                        borderRadius: '25px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
            }}>{t('noProperties')}</p>
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
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {t('clearFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;