// src/components/UI/ImageUploader.tsx
import React, { useState, useRef } from 'react';

interface ImageUploaderProps {
  images: File[];
  onChange: (images: File[]) => void;
  maxImages?: number;
  onPreview: (previews: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onChange,
  maxImages = 10,
  onPreview
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Função para redimensionar e recortar imagem
  const processImage = (file: File, targetWidth: number = 800, targetHeight: number = 600): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.onload = () => {
        if (!ctx) {
          resolve(URL.createObjectURL(file));
          return;
        }

        // Calcular dimensões para recorte centralizado
        const sourceAspectRatio = img.width / img.height;
        const targetAspectRatio = targetWidth / targetHeight;

        let sourceX = 0, sourceY = 0, sourceWidth = img.width, sourceHeight = img.height;

        if (sourceAspectRatio > targetAspectRatio) {
          // Imagem mais larga - recortar dos lados
          sourceWidth = img.height * targetAspectRatio;
          sourceX = (img.width - sourceWidth) / 2;
        } else {
          // Imagem mais alta - recortar de cima/baixo
          sourceHeight = img.width / targetAspectRatio;
          sourceY = (img.height - sourceHeight) / 2;
        }

        // Configurar canvas
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // Configurações de qualidade
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Desenhar imagem recortada e redimensionada
        ctx.drawImage(
          img,
          sourceX, sourceY, sourceWidth, sourceHeight, // área de origem
          0, 0, targetWidth, targetHeight // destino no canvas
        );

        // Converter para base64 com qualidade otimizada
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(optimizedDataUrl);
      };

      img.onerror = () => {
        resolve(URL.createObjectURL(file));
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsProcessing(true);

    const newImages = [...images, ...files].slice(0, maxImages);
    onChange(newImages);

    // Processar todas as imagens (existentes + novas)
    const allProcessedPreviews: string[] = [];

    try {
      // Processar imagens existentes (se houver)
      for (let i = 0; i < Math.min(images.length, maxImages); i++) {
        if (previews[i]) {
          allProcessedPreviews.push(previews[i]);
        } else {
          const processed = await processImage(images[i]);
          allProcessedPreviews.push(processed);
        }
      }

      // Processar novas imagens
      for (let i = 0; i < files.length && allProcessedPreviews.length < maxImages; i++) {
        const processed = await processImage(files[i], 800, 600);
        allProcessedPreviews.push(processed);
      }

      setPreviews(allProcessedPreviews);
      onPreview(allProcessedPreviews);

    } catch (error) {
      console.error('Erro ao processar imagens:', error);
      
      // Fallback: usar imagens originais
      const fallbackPreviews: string[] = [];
      newImages.forEach(file => {
        fallbackPreviews.push(URL.createObjectURL(file));
      });
      
      setPreviews(fallbackPreviews);
      onPreview(fallbackPreviews);
    } finally {
      setIsProcessing(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    onChange(newImages);
    setPreviews(newPreviews);
    onPreview(newPreviews);
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        disabled={isProcessing}
      />
      
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isProcessing || images.length >= maxImages}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          borderRadius: '8px',
          cursor: isProcessing ? 'wait' : images.length >= maxImages ? 'not-allowed' : 'pointer',
          width: '100%',
          background: 'transparent',
          opacity: images.length >= maxImages ? 0.5 : 1,
          transition: 'all 0.3s ease'
        }}
      >
        {isProcessing ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid #667eea',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            Processando e otimizando imagens...
          </div>
        ) : images.length >= maxImages ? (
          `Limite máximo atingido (${maxImages} imagens)`
        ) : (
          `Clique para adicionar imagens (${images.length}/${maxImages})`
        )}
      </button>
      
      {previews.length > 0 && (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '20px',
            marginBottom: '15px'
          }}>
            <h4 style={{ margin: 0, color: '#374151' }}>
              Imagens Selecionadas ({previews.length})
            </h4>
            <div style={{
              fontSize: '12px',
              color: '#64748b',
              background: '#f1f5f9',
              padding: '4px 8px',
              borderRadius: '12px'
            }}>
              Otimizadas: 800x600px
            </div>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '15px'
          }}>
            {previews.map((preview, index) => (
              <div key={index} style={{ 
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover'
                  }}
                />
                
                {/* Indicador de imagem principal */}
                {index === 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'rgba(16, 185, 129, 0.9)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    PRINCIPAL
                  </div>
                )}
                
                {/* Botão remover */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(239, 68, 68, 0.9)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(220, 38, 38, 1)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.9)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  ×
                </button>

                {/* Informações da imagem */}
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  textAlign: 'center'
                }}>
                  Otimizada • 800x600
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ 
            marginTop: '15px',
            padding: '12px',
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#0369a1'
          }}>
            ℹ️ <strong>Otimização automática:</strong> Todas as imagens são redimensionadas para 800x600px e recortadas automaticamente para melhor visualização, mantendo a qualidade ideal para web.
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ImageUploader;