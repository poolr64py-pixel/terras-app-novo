import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useProperties } from '../../contexts/PropertiesContext';
import ImageUploader from '../../components/UI/ImageUploader';
import SEO from '../../components/UI/SEO';

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
  coordinates?: { lat: number; lng: number };
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

const AddPropertyPage: React.FC = () => {
  const { t } = useLanguage();
  const { addProperty } = useProperties();
  const navigate = useNavigate();
  
  const [form, setForm] = useState<PropertyForm>({
    title: '',
    type: 'terreno',
    location: '',
    area: '',
    price: '',
    priceValue: 0,
    description: '',
    features: [],
    images: [],
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string[]>([]);

  // Auto-generate SEO based on form data
  const generateSEO = () => {
    const seoTitle = form.seoTitle || `${form.title} - ${form.location} | ${t('companyName')}`;
    const seoDescription = form.seoDescription || 
      `${form.title} em ${form.location}, ${form.area}. ${form.description.substring(0, 120)}...`;
    const seoKeywords = form.seoKeywords || 
      `${form.type} ${form.location}, ${form.title}, propriedade ${form.location}, investimento paraguay`;
    
    setForm(prev => ({
      ...prev,
      seoTitle,
      seoDescription,
      seoKeywords
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Process and optimize images
      const optimizedImages = await Promise.all(
        form.images.map(img => optimizeImage(img))
      );

      const newProperty = {
        ...form,
        id: Date.now(),
        images: optimizedImages,
        slug: generateSlug(form.title),
        createdAt: new Date().toISOString(),
        seo: {
          title: form.seoTitle,
          description: form.seoDescription,
          keywords: form.seoKeywords
        }
      };

      await addProperty(newProperty);
      navigate('/properties');
    } catch (error) {
      console.error('Error adding property:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Cadastrar Imóvel"
        description="Painel administrativo para cadastro de novas propriedades no sistema"
        robots="noindex, nofollow"
      />
      
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-8">Cadastrar Nova Propriedade</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-lg">
            
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título da Propriedade *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Propriedade *
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="fazenda">Fazenda</option>
                  <option value="terreno">Terreno</option>
                  <option value="chacara">Chácara</option>
                </select>
              </div>
            </div>

            {/* Location and Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização *
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Ex: Alto Paraná"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área *
                </label>
                <input
                  type="text"
                  value={form.area}
                  onChange={(e) => setForm(prev => ({ ...prev, area: e.target.value }))}
                  placeholder="Ex: 500 hectares"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço (formato exibição) *
                </label>
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="Ex: USD 2.500.000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor numérico (para filtros) *
                </label>
                <input
                  type="number"
                  value={form.priceValue}
                  onChange={(e) => setForm(prev => ({ ...prev, priceValue: Number(e.target.value) }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição *
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Descreva as principais características da propriedade..."
                required
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Características
              </label>
              <FeaturesInput 
                features={form.features}
                onChange={(features) => setForm(prev => ({ ...prev, features }))}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagens da Propriedade
              </label>
              <ImageUploader
                images={form.images}
                onChange={(images) => setForm(prev => ({ ...prev, images }))}
                maxImages={10}
                onPreview={setPreview}
              />
            </div>

            {/* SEO Section */}
            <div className="border-t pt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">SEO Settings</h3>
                <button
                  type="button"
                  onClick={generateSEO}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Auto-gerar SEO
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título SEO
                  </label>
                  <input
                    type="text"
                    value={form.seoTitle}
                    onChange={(e) => setForm(prev => ({ ...prev, seoTitle: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500 mt-1">{form.seoTitle?.length || 0}/60 caracteres</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição SEO
                  </label>
                  <textarea
                    value={form.seoDescription}
                    onChange={(e) => setForm(prev => ({ ...prev, seoDescription: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">{form.seoDescription?.length || 0}/160 caracteres</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Palavras-chave SEO
                  </label>
                  <input
                    type="text"
                    value={form.seoKeywords}
                    onChange={(e) => setForm(prev => ({ ...prev, seoKeywords: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="palavra1, palavra2, palavra3"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar Propriedade'}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/properties')}
                className="bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

// Utility functions
const optimizeImage = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      // Calculate optimal dimensions
      const maxWidth = 1200;
      const maxHeight = 800;
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      resolve(dataUrl);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export default AddPropertyPage;