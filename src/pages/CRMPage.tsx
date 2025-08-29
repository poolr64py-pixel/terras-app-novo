// src/pages/CRMPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const CRMPage: React.FC = () => {
  const { t } = useLanguage();

  const mockData = {
    leadsToday: 12,
    openProposals: 8,
    monthlySales: 3,
    revenue: 'USD 1.200.000',
    recentLeads: [
      { id: 1, name: 'João Silva', property: 'Fazenda Alto Paraná', status: 'Novo', time: '10:30' },
      { id: 2, name: 'Maria Santos', property: 'Terreno Canindeyú', status: 'Interessado', time: '09:15' },
      { id: 3, name: 'Carlos Lima', property: 'Chácara San Pedro', status: 'Proposta', time: '08:45' },
      { id: 4, name: 'Ana Costa', property: 'Fazenda Concepción', status: 'Novo', time: '07:20' }
    ]
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            margin: 0
          }}>{t('crmTitle')}</h1>
          <Link
            to="/"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            {t('backToSite')}
          </Link>
        </div>
      </header>

      {/* Dashboard */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '30px 20px'
      }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '25px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <p style={{
                  color: '#64748b',
                  fontSize: '0.9rem',
                  margin: '0 0 8px 0',
                  fontWeight: '500'
                }}>{t('leadsToday')}</p>
                <p style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#667eea',
                  margin: 0
                }}>{mockData.leadsToday}</p>
              </div>
              <div style={{ fontSize: '3rem', opacity: '0.7' }}>📈</div>
            </div>
          </div>
          
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <p style={{
                  color: '#64748b',
                  fontSize: '0.9rem',
                  margin: '0 0 8px 0',
                  fontWeight: '500'
                }}>{t('openProposals')}</p>
                <p style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#f59e0b',
                  margin: 0
                }}>{mockData.openProposals}</p>
              </div>
              <div style={{ fontSize: '3rem', opacity: '0.7' }}>📋</div>
            </div>
          </div>
          
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <p style={{
                  color: '#64748b',
                  fontSize: '0.9rem',
                  margin: '0 0 8px 0',
                  fontWeight: '500'
                }}>{t('monthlySales')}</p>
                <p style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#10b981',
                  margin: 0
                }}>{mockData.monthlySales}</p>
              </div>
              <div style={{ fontSize: '3rem', opacity: '0.7' }}>🎯</div>
            </div>
          </div>
          
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <p style={{
                  color: '#64748b',
                  fontSize: '0.9rem',
                  margin: '0 0 8px 0',
                  fontWeight: '500'
                }}>{t('revenue')}</p>
                <p style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#8b5cf6',
                  margin: 0
                }}>{mockData.revenue}</p>
              </div>
              <div style={{ fontSize: '3rem', opacity: '0.7' }}>💰</div>
            </div>
          </div>
        </div>

        {/* Charts and Tables */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '30px'
        }}>
          {/* Recent Leads */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#1a202c'
            }}>
              <span>👥</span> {t('recentLeads')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {mockData.recentLeads.map((lead) => (
                <div key={lead.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px',
                  background: '#f8fafc',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontWeight: 'bold',
                      margin: '0 0 5px 0',
                      color: '#1a202c'
                    }}>{lead.name}</p>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#64748b',
                      margin: 0
                    }}>{lead.property}</p>
                  </div>
                  <div style={{
                    textAlign: 'right',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '5px'
                  }}>
                    <span style={{
                      padding: '4px 12px',
                      fontSize: '0.8rem',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      ...(lead.status === 'Novo' ? {
                        background: '#dbeafe',
                        color: '#1d4ed8'
                      } : lead.status === 'Interessado' ? {
                        background: '#fef3c7',
                        color: '#d97706'
                      } : {
                        background: '#d1fae5',
                        color: '#059669'
                      })
                    }}>
                      {lead.status}
                    </span>
                    <p style={{
                      fontSize: '0.8rem',
                      color: '#94a3b8',
                      margin: 0
                    }}>{lead.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Property Performance */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#1a202c'
            }}>
              <span>🏘️</span> {t('propertyPerformance')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { name: 'Fazenda Alto Paraná', views: 45, leads: 8 },
                { name: 'Terreno Canindeyú', views: 32, leads: 5 },
                { name: 'Chácara San Pedro', views: 28, leads: 4 },
                { name: 'Fazenda Concepción', views: 38, leads: 6 }
              ].map((property, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 0',
                  borderBottom: index < 3 ? '1px solid #e2e8f0' : 'none'
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontWeight: 'bold',
                      margin: '0 0 8px 0',
                      color: '#1a202c'
                    }}>{property.name}</p>
                    <div style={{
                      display: 'flex',
                      gap: '20px',
                      fontSize: '0.9rem',
                      color: '#64748b'
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>👁️</span> {property.views} visualizações
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>📞</span> {property.leads} leads
                      </span>
                    </div>
                  </div>
                  <div style={{
                    width: '80px',
                    height: '8px',
                    background: '#e2e8f0',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div 
                      style={{
                        width: `${(property.leads / 10) * 100}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #667eea, #764ba2)',
                        borderRadius: '4px',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMPage;