// src/pages/PropertyRegistrationPage.tsx
import React, { useState, useEffect } from 'react';
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
  coordinates?: {
    lat: number;
    lng: number;
  };
}

const PropertyRegistrationPage: React.FC = () => {
  const { t } = useLanguage();
  const { addProperty } = useProperties();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  // SEO dinâmico
  useEffect(() => {
    const title = formData.title 
      ? `Cadastro: ${formData.title} - ${t('companyName')}`
      : `Cadastrar Novo Imóvel - ${t('companyName')}`;
    
    const description = formData.description 
      ? `${formData.description.substring(0, 150)}...`
      : `Cadastre seu imóvel no ${t('companyName')} e alcance milhares de investidores interessados em terras no Paraguay.`;

    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }, [formData.title, formData.description, t]);

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

    if (formData.images.length === 0) {
      newErrors.images = 'Adicione pelo menos uma imagem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('[style*="border: 2px solid #ef4444"]') as HTMLElement;
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular processamento de API
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newProperty: Property = {
        id: Date.now(),
        title: formData.title,
        type: formData.type,
        location: formData.location,
        area: formData.area,
        price: formData.price,
        priceValue: formData.priceValue,
        description: formData.description,
        features: formData.features,
        image: formData.imagesPreviews[0] || '🏞️' // Primeira imagem preview ou emoji padrão
      };

      // Salvar na propriedade
      addProperty(newProperty);
      
      // Salvar no localStorage para persistência
      const existingProperties = JSON.parse(localStorage.getItem('customProperties') || '[]');
      existingProperties.push(newProperty);
      localStorage.setItem('customProperties', JSON.stringify(existingProperties));

      console.log('Propriedade cadastrada:', newProperty);
      console.log('LocalStorage:', localStorage.getItem('customProperties'));

      setSubmitSuccess(true);

      // Feedback de sucesso com opções
      setTimeout(() => {
        const continueRegistering = confirm(
          'Propriedade cadastrada com sucesso!\n\n' +
          'Clique OK para cadastrar outro imóvel ou Cancelar para ir para a página de propriedades.'
        );

        if (continueRegistering) {
          // Reset form para novo cadastro
          setFormData({
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
          setSubmitSuccess(false);
          setErrors({});
          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // Navegar para página de propriedades
          window.location.href = '/properties';
        }
      }, 2000);

    } catch (error) {
      console.error('Erro ao cadastrar propriedade:', error);
      alert('Erro ao cadastrar propriedade. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Cadastrar Novo Imóvel - {t('companyName')}</title>
        <meta name="description" content="Cadastre seu imóvel e alcance milhares de investidores interessados em terras no Paraguay. Processo rápido e seguro." />
        <meta name="keywords" content="cadastrar imóvel paraguay, vender terra paraguay, anunciar propriedade" />
        <meta property="og:title" content="Cadastrar Imóvel - Imóveis Paraguay" />
        <meta property="og:description" content="Cadastre seu imóvel e alcance milhares de investidores" />
        <meta property="og:type" content="website" />
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
          {/* Header with back button */}
          <header style={{ marginBottom: '40px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '20px' 
            }}>
              <button
                onClick={() => window.history.back()}
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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px'
              }}>
                Cadastrar Novo Imóvel
              </h1>
              <p style={{ color: '#64748b', fontSize: '16px' }}>
                Preencha as informações para listar sua propriedade
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
                Propriedade Cadastrada com Sucesso!
              </h3>
              <p style={{ color: '#15803d', marginBottom: '16px' }}>
                Seu imóvel foi adicionado ao sistema e já está disponível para visualização.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => window.location.href = '/properties'}
                  style={{
                    backgroundColor: '#16a34a',
                    color: 'white',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Ver Propriedades
                </button>
                <button
                  onClick={() => {
                    setFormData({
                      title: '', type: 'fazenda', location: '', area: '',
                      price: '', priceValue: 0, description: '', features: [], images: [], imagesPreviews: []
                    });
                    setSubmitSuccess(false);
                    setErrors({});
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#16a34a',
                    border: '2px solid #16a34a',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cadastrar Outro
                </button>
              </div>
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
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
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
                placeholder="Descreva detalhadamente a propriedade, suas características, localização, infraestrutura..."
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
                Imagens da Propriedade *
              </label>
              <ImageUploader
                images={formData.images}
                onChange={handleImagesChange}
                onPreview={handlePreviewsChange}
                maxImages={15}
              />
              {errors.images && (
                <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px' }}>
                  {errors.images}
                </p>
              )}
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>
                A primeira imagem será usada como foto principal. Máximo 15 imagens.
              </p>
            </div>

            {/* Botão Submit */}
            <div style={{ paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  backgroundColor: isSubmitting ? '#9ca3af' : '#667eea',
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
                    Cadastrando...
                  </>
                ) : (
                  'Cadastrar Propriedade'
                )}
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

export default PropertyRegistrationPage;