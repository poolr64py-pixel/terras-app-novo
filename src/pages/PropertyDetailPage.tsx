// src/pages/PropertyDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import { useProperties, Property } from '../contexts/PropertiesContext';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { properties, sendWhatsApp } = useProperties();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
console.log('ID da URL:', id);
console.log('Propriedades disponíveis:', properties);
console.log('Propriedade encontrada:', property);

  useEffect(() => {
    if (!id) {
      navigate('/properties');
      return;
    }

    const propertyId = parseInt(id);
    const foundProperty = properties.find(p => p.id === propertyId);

    if (!foundProperty) {
      navigate('/properties');
      return;
    }

    setProperty(foundProperty);
  }, [id, properties, navigate]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Olá! Tenho interesse na propriedade "${property?.title}".\n\n` +
                   `Nome: ${contactForm.name}\n` +
                   `Email: ${contactForm.email}\n` +
                   `Telefone: ${contactForm.phone}\n` +
                   `Mensagem: ${contactForm.message}`;

    sendWhatsApp(message);
    setContactForm({ name: '', email: '', phone: '', message: '' });
    setShowContact(false);
  };

  if (!property) {
    return (
      <div style={{
        paddingTop: '100px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏠</div>
          <h2>Carregando propriedade...</h2>
        </div>
      </div>
    );
  }

  // Preparar imagens - se houver múltiplas imagens, usar array, senão usar apenas a principal
  const images = property.image && typeof property.image === 'string' && property.image.startsWith('data:image') 
    ? [property.image] 
    : [];

  return (
    <>
      <Helmet>
        <title>{property.title} - {t('companyName')}</title>
        <meta name="description" content={`${property.description} Localizado em ${property.location}, área de ${property.area}. ${property.price}`} />
        <meta name="keywords" content={`${property.location}, ${property.type}, imóvel paraguay, ${property.features?.join(', ')}`} />
        <meta property="og:title" content={`${property.title} - ${t('companyName')}`} />
        <meta property="og:description" content={property.description} />
        <meta property="og:type" content="website" />
        {images.length > 0 && <meta property="og:image" content={images[0]} />}
      </Helmet>

      <div style={{
        paddingTop: '80px',
        minHeight: '100vh',
        backgroundColor: '#f8fafc'
      }}>
        {/* Breadcrumb */}
        <div style={{
          backgroundColor: 'white',
          padding: '15px 0',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#64748b' }}>
              <button
                onClick={() => navigate('/properties')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Propriedades
              </button>
              <span>{'>'}</span>
              <span>{property.location}</span>
              <span>{'>'}</span>
              <span style={{ color: '#374151', fontWeight: '500' }}>{property.title}</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
            
            {/* Coluna Principal */}
            <div>
              {/* Galeria de Imagens */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '30px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                {images.length > 0 ? (
                  <div>
                    <div style={{ height: '400px', position: 'relative' }}>
                      <img
                        src={images[currentImageIndex]}
                        alt={property.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={() => setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1)}
                            style={{
                              position: 'absolute',
                              left: '20px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'rgba(0,0,0,0.5)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '50%',
                              width: '50px',
                              height: '50px',
                              fontSize: '20px',
                              cursor: 'pointer'
                            }}
                          >
                            ‹
                          </button>
                          
                          <button
                            onClick={() => setCurrentImageIndex(currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0)}
                            style={{
                              position: 'absolute',
                              right: '20px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'rgba(0,0,0,0.5)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '50%',
                              width: '50px',
                              height: '50px',
                              fontSize: '20px',
                              cursor: 'pointer'
                            }}
                          >
                            ›
                          </button>
                          
                          <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            right: '20px',
                            background: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            padding: '8px 12px',
                            borderRadius: '20px',
                            fontSize: '14px'
                          }}>
                            {currentImageIndex + 1} / {images.length}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '6rem', marginBottom: '20px' }}>
                        {property.image || '🏞️'}
                      </div>
                      <p style={{ fontSize: '18px', opacity: 0.9 }}>Imagem da Propriedade</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Informações Detalhadas */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '30px',
                marginBottom: '30px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                <h1 style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#1a202c',
                  marginBottom: '20px',
                  lineHeight: '1.2'
                }}>
                  {property.title}
                </h1>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px',
                  marginBottom: '30px',
                  padding: '20px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📍</div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Localização</div>
                    <div style={{ fontWeight: '600', color: '#374151' }}>{property.location}</div>
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📏</div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Área</div>
                    <div style={{ fontWeight: '600', color: '#374151' }}>{property.area}</div>
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏷️</div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Tipo</div>
                    <div style={{ fontWeight: '600', color: '#374151' }}>
                      {property.type === 'fazenda' ? 'Fazenda' : 
                       property.type === 'terreno' ? 'Terreno' : 'Chácara'}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '600', 
                    marginBottom: '15px',
                    color: '#374151'
                  }}>
                    Descrição
                  </h3>
                  <p style={{ 
                    fontSize: '16px', 
                    lineHeight: '1.7', 
                    color: '#4b5563'
                  }}>
                    {property.description}
                  </p>
                </div>

                {property.features && property.features.length > 0 && (
                  <div>
                    <h3 style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: '600', 
                      marginBottom: '15px',
                      color: '#374151'
                    }}>
                      Características
                    </h3>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}>
                      {property.features.map((feature, idx) => (
                        <span key={idx} style={{
                          backgroundColor: '#e0f2fe',
                          color: '#0369a1',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '500',
                          border: '1px solid #bae6fd'
                        }}>
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Preço e Contato */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '30px',
                marginBottom: '30px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: '100px'
              }}>
                <div style={{
                  textAlign: 'center',
                  marginBottom: '25px'
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#667eea',
                    marginBottom: '10px'
                  }}>
                    {property.price}
                  </div>
                  <p style={{ color: '#64748b', fontSize: '14px' }}>
                    Preço da propriedade
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button
                    onClick={() => sendWhatsApp(`Tenho interesse na propriedade "${property.title}" localizada em ${property.location}.`)}
                    style={{
                      background: 'linear-gradient(45deg, #25D366, #128C7E)',
                      color: 'white',
                      border: 'none',
                      padding: '15px 20px',
                      borderRadius: '10px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    📱 Contato WhatsApp
                  </button>

                  <button
                    onClick={() => setShowContact(!showContact)}
                    style={{
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      padding: '15px 20px',
                      borderRadius: '10px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    ✉️ Formulário de Contato
                  </button>
                </div>

                {showContact && (
                  <form onSubmit={handleContactSubmit} style={{
                    marginTop: '20px',
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px'
                  }}>
                    <div style={{ marginBottom: '15px' }}>
                      <input
                        type="text"
                         name="name"
                        placeholder="Seu nome"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <input
                        type="email"
                         name="email"
                        placeholder="Seu email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
        <textarea
  name="message"
  placeholder="Mensagem adicional"/>
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <input
                        type="tel"
                         name="phone"
                        placeholder="Seu telefone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <textarea
                        placeholder="Mensagem adicional"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          resize: 'vertical',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Enviar Mensagem
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetailPage;