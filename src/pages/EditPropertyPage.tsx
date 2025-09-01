// src/pages/EditPropertyPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import { useProperties, Property } from '../contexts/PropertiesContext';
import ImageUploader from '../components/UI/ImageUploader';
import FeaturesInput from '../components/UI/FeaturesInput';

interface PropertyForm {
  title: string;
  type: 'fazenda' | 'terreno' | 'chacara';
  location: string;
  area: string;
  price: string;
  priceValue: number;
  description: string;
  features: string[];
  images: File[];
  imagesPreviews: string[];
}

const EditPropertyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { properties, updateProperty, removeProperty } = useProperties();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [propertyNotFound, setPropertyNotFound] = useState(false);

  const [formData, setFormData] = useState<PropertyForm>({
    title: '',
    type: 'fazenda',
    location: '',
    area: '',
    price: '',
    priceValue: 0,
    description: '',
    features: [],
    images: [],
    imagesPreviews: []
  });

  const [errors, setErrors] = useState<Partial<PropertyForm>>({});

  // Carregar dados da propriedade
  useEffect(() => {
    if (!id) {
      setPropertyNotFound(true);
      return;
    }

    const propertyId = parseInt(id);
    const property = properties.find(p => p.id === propertyId);

    if (!property) {
      setPropertyNotFound(true);
      return;
    }

    // Preencher formulário com dados existentes
    setFormData({
      title: property.title || '',
      type: property.type || 'fazenda',
      location: property.location || '',
      area: property.area || '',
      price: property.price || '',
      priceValue: property.priceValue || 0,
      description: property.description || '',
      features: property.features || [],
      images: [],
      imagesPreviews: property.image && typeof property.image === 'string' && property.image.startsWith('data:image') 
        ? [property.image] 
        : []
    });
  }, [id, properties]);

  const handleInputChange = (field: keyof PropertyForm, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-calculate priceValue when price changes
    if (field === 'price') {
      const numericPrice = parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.'));
      setFormData(prev => ({
        ...prev,
        priceValue: isNaN(numericPrice) ? 0 : numericPrice
      }));
    }

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleImagesChange = (files: File[]) => {
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handlePreviewsChange = (previews: string[]) => {
    setFormData(prev => ({
      ...prev,
      imagesPreviews: previews
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PropertyForm> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Localização é obrigatória';
    }

    if (!formData.area.trim()) {
      newErrors.area = 'Área é obrigatória';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Preço é obrigatório';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Descrição deve ter pelo menos 50 caracteres';
    }

    if (formData.features.length === 0) {
      newErrors.features = 'Adicione pelo menos uma característica';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstError = document.querySelector('[style*="border: 2px solid #ef4444"]') as HTMLElement;
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const propertyId = parseInt(id!);
      
      const updatedProperty: Property = {
        id: propertyId,
        title: formData.title,
        type: formData.type,
        location: formData.location,
        area: formData.area,
        price: formData.price,
        priceValue: formData.priceValue,
        description: formData.description,
        features: formData.features,
        image: formData.imagesPreviews[0] || '🏞️'
      };

      updateProperty(propertyId, updatedProperty);
      
      // Atualizar localStorage
      const existingProperties = JSON.parse(localStorage.getItem('customProperties') || '[]');
      const updatedProperties = existingProperties.map((prop: Property) => 
        prop.id === propertyId ? updatedProperty : prop
      );
      localStorage.setItem('customProperties', JSON.stringify(updatedProperties));

      setSubmitSuccess(true);

      setTimeout(() => {
        navigate('/properties');
      }, 2000);

    } catch (error) {
      console.error('Erro ao atualizar propriedade:', error);
      alert('Erro ao atualizar propriedade. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm(
      'Tem certeza que deseja excluir esta propriedade?\n\nEsta ação não pode ser desfeita.'
    );

    if (!confirmed) return;

    try {
      const propertyId = parseInt(id!);
      
      removeProperty(propertyId);
      
      // Remover do localStorage
      const existingProperties = JSON.parse(localStorage.getItem('customProperties') || '[]');
      const filteredProperties = existingProperties.filter((prop: Property) => prop.id !== propertyId);
      localStorage.setItem('customProperties', JSON.stringify(filteredProperties));

      alert('Propriedade excluída com sucesso!');
      navigate('/properties');
      
    } catch (error) {
      console.error('Erro ao excluir propriedade:', error);
      alert('Erro ao excluir propriedade. Tente novamente.');
    }
  };

  if (propertyNotFound) {
    return (
      <div style={{
        paddingTop: '100px',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '60px 40px',
          textAlign: 'center',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>❌</div>
          <h2 style={{ color: '#1a202c', marginBottom: '16px' }}>Propriedade Não Encontrada</h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            A propriedade que você está tentando editar não foi encontrada.
          </p>
          <button
            onClick={() => navigate('/properties')}
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Voltar para Propriedades
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Editar Propriedade - {formData.title || 'Carregando...'}</title>
        <meta name="description" content="Edite as informações da sua propriedade cadastrada no sistema." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        padding: '40px 20px',
        backgroundColor: '#f8fafc',
        minHeight: '100vh'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <header style={{ marginBottom: '40px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '20px' 
            }}>
              <button
                onClick={() => navigate('/properties')}
                style={{
                  background: 'transparent',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.color = '#667eea';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.color = '#374151';
                }}
              >
                <span style={{ fontSize: '16px' }}>←</span>
                Voltar
              </button>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ 
                fontSize: '32px', 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px'
              }}>
                Editar Propriedade
              </h1>
              <p style={{ color: '#64748b', fontSize: '16px' }}>
                Atualize as informações da sua propriedade
              </p>
            </div>
          </header>

          {submitSuccess && (
            <div style={{
              backgroundColor: '#dcfce7',
              border: '2px solid #16a34a',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>✅</div>
              <h3 style={{ color: '#15803d', fontWeight: '700', marginBottom: '8px', fontSize: '18px' }}>
                Propriedade Atualizada com Sucesso!
              </h3>
              <p style={{ color: '#15803d' }}>
                Redirecionando para a lista de propriedades...
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Título */}
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                Título da Propriedade *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ex: Fazenda para Soja - Alto Paraná"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: errors.title ? '2px solid #ef4444' : '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                onBlur={(e) => e.target.style.borderColor = errors.title ? '#ef4444' : '#e5e7eb'}
              />
              {errors.title && (
                <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                  {errors.title}
                </p>
              )}
            </div>

            {/* Tipo e Localização */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Tipo de Propriedade *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="fazenda">Fazenda</option>
                  <option value="terreno">Terreno</option>
                  <option value="chacara">Chácara</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Localização *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Ex: Alto Paraná"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: errors.location ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                {errors.location && (
                  <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                    {errors.location}
                  </p>
                )}
              </div>
            </div>

            {/* Área e Preço */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Área *
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  placeholder="Ex: 500 hectares"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: errors.area ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                {errors.area && (
                  <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                    {errors.area}
                  </p>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Preço *
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="Ex: USD 2.500.000"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: errors.price ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                {errors.price && (
                  <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                    {errors.price}
                  </p>
                )}
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                Descrição *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descreva detalhadamente a propriedade..."
                rows={5}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: errors.description ? '2px solid #ef4444' : '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                {errors.description && (
                  <p style={{ color: '#ef4444', fontSize: '14px' }}>
                    {errors.description}
                  </p>
                )}
                <p style={{ color: '#64748b', fontSize: '14px', marginLeft: 'auto' }}>
                  {formData.description.length}/500 caracteres
                </p>
              </div>
            </div>

            {/* Características */}
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                Características da Propriedade *
              </label>
              <FeaturesInput
                features={formData.features}
                onChange={(features) => handleInputChange('features', features)}
              />
              {errors.features && (
                <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                  {errors.features}
                </p>
              )}
            </div>

            {/* Upload de Imagens */}
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                Imagens da Propriedade
              </label>
              <ImageUploader
                images={formData.images}
                onChange={handleImagesChange}
                onPreview={handlePreviewsChange}
                maxImages={15}
              />
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>
                A primeira imagem será usada como foto principal. Máximo 15 imagens.
              </p>
            </div>

            {/* Botões de Ação */}
            <div style={{ 
              paddingTop: '20px', 
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  backgroundColor: isSubmitting ? '#9ca3af' : '#f59e0b',
                  color: 'white',
                  border: 'none',
                  padding: '16px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #ffffff',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Atualizando...
                  </>
                ) : (
                  'Atualizar Propriedade'
                )}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isSubmitting}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '16px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: isSubmitting ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#dc2626';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#ef4444';
                  }
                }}
              >
                Excluir
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default EditPropertyPage;