// src/pages/AdminPropertiesPage.tsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import { useProperties } from '../contexts/PropertiesContext';

const AdminPropertiesPage: React.FC = () => {
  const { t } = useLanguage();
  const { properties, removeProperty } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'custom' | 'default'>('all');

  // Verificação de segurança para propriedades
  const safeProperties = Array.isArray(properties) ? properties : [];
  
  // Separar propriedades padrão das cadastradas com verificação de segurança
  const defaultProperties = safeProperties.filter(p => p && typeof p.id === 'number' && p.id <= 1000000000);
  const customProperties = safeProperties.filter(p => p && typeof p.id === 'number' && p.id > 1000000000);

  // Filtrar propriedades com verificações de segurança
  const filteredProperties = safeProperties.filter(property => {
    if (!property || !property.title || !property.location) return false;
    
    const matchesSearch = String(property.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         String(property.location).toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (statusFilter === 'custom') return property.id > 1000000000;
    if (statusFilter === 'default') return property.id <= 1000000000;
    return true;
  });

  const handleDelete = async (propertyId: number) => {
    // Só permitir exclusão de propriedades cadastradas
    if (propertyId <= 1000000000) {
      alert('Não é possível excluir propriedades padrão do sistema.');
      return;
    }

    const confirmed = confirm('Tem certeza que deseja excluir esta propriedade?');
    if (!confirmed) return;

    try {
      removeProperty(propertyId);
      
      // Remover do localStorage
      const existingProperties = JSON.parse(localStorage.getItem('customProperties') || '[]');
      const filteredProps = existingProperties.filter((prop: any) => prop.id !== propertyId);
      localStorage.setItem('customProperties', JSON.stringify(filteredProps));

      alert('Propriedade excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir propriedade:', error);
      alert('Erro ao excluir propriedade. Tente novamente.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Administração de Propriedades - {t('companyName')}</title>
        <meta name="description" content="Painel administrativo para gerenciar propriedades cadastradas" />
        <meta name="robots" content="noindex, nofollow" />
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
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#1a202c',
                marginBottom: '8px'
              }}>
                Administração de Propriedades
              </h1>
              <p style={{ color: '#64748b' }}>
                Gerencie todas as propriedades cadastradas no sistema
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.location.href = '/properties'}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  padding: '12px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Ver Site Público
              </button>
              <button
                onClick={() => window.location.href = '/admin/register-property'}
                style={{
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '12px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                + Cadastrar Nova Propriedade
              </button>
            </div>
          </div>

          {/* Estatísticas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
                {safeProperties.length}
              </div>
              <div style={{ color: '#64748b', fontSize: '14px' }}>Total de Propriedades</div>
            </div>

            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>
                {customProperties.length}
              </div>
              <div style={{ color: '#64748b', fontSize: '14px' }}>Propriedades Cadastradas</div>
            </div>

            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
                {defaultProperties.length}
              </div>
              <div style={{ color: '#64748b', fontSize: '14px' }}>Propriedades Padrão</div>
            </div>
          </div>

          {/* Filtros */}
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Buscar Propriedades
                </label>
                <input
                  type="text"
                  placeholder="Busque por título ou localização..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Filtrar por Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    outline: 'none'
                  }}
                >
                  <option value="all">Todas as Propriedades</option>
                  <option value="custom">Apenas Cadastradas</option>
                  <option value="default">Apenas Padrão</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lista de Propriedades */}
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #e5e7eb',
              fontWeight: '600',
              color: '#374151'
            }}>
              {filteredProperties.length} propriedades encontradas
            </div>

            {filteredProperties.length > 0 ? (
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {filteredProperties.map((property) => {
                  if (!property) return null;
                  
                  return (
                    <div key={property.id} style={{
                      padding: '20px',
                      borderBottom: '1px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px'
                    }}>
                      {/* Imagem */}
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        flexShrink: 0,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        {(() => {
                          if (!property.image) {
                            return <div style={{ fontSize: '2rem' }}>🏞️</div>;
                          }
                          
                          if (typeof property.image === 'string' && property.image.startsWith('data:image')) {
                            return (
                              <img 
                                src={property.image} 
                                alt={String(property.title || 'Propriedade')}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            );
                          }
                          
                          return (
                            <div style={{ fontSize: '2rem' }}>
                              {String(property.image)}
                            </div>
                          );
                        })()}
                      </div>

                      {/* Informações */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <h3 style={{ 
                            fontSize: '18px', 
                            fontWeight: '600', 
                            color: '#1a202c',
                            margin: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {String(property.title || 'Sem título')}
                          </h3>
                          
                          {property.id > 1000000000 ? (
                            <span style={{
                              background: '#dcfce7',
                              color: '#15803d',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}>
                              Cadastrada
                            </span>
                          ) : (
                            <span style={{
                              background: '#fef3cd',
                              color: '#92400e',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}>
                              Padrão
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'flex', gap: '20px', marginBottom: '8px', fontSize: '14px', color: '#64748b' }}>
                          <span><strong>Local:</strong> {String(property.location || 'N/A')}</span>
                          <span><strong>Área:</strong> {String(property.area || 'N/A')}</span>
                          <span><strong>Preço:</strong> {String(property.price || 'A consultar')}</span>
                        </div>

                        <p style={{
                          fontSize: '14px',
                          color: '#64748b',
                          margin: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {String(property.description || 'Sem descrição')}
                        </p>
                      </div>

                      {/* Ações */}
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        {property.id > 1000000000 && (
                          <>
                            <button
                              onClick={() => window.location.href = `/admin/edit-property/${property.id}`}
                              style={{
                                background: '#f59e0b',
                                color: 'white',
                                padding: '8px 12px',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              Editar
                            </button>

                            <button
                              onClick={() => handleDelete(property.id)}
                              style={{
                                background: '#ef4444',
                                color: 'white',
                                padding: '8px 12px',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              Excluir
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => window.open(`/property/${property.id}`, '_blank')}
                          style={{
                            background: '#6b7280',
                            color: 'white',
                            padding: '8px 12px',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Visualizar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{
                padding: '60px 20px',
                textAlign: 'center',
                color: '#64748b'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
                <p>Nenhuma propriedade encontrada com os filtros selecionados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPropertiesPage;