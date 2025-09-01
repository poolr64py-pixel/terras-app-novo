// src/utils/imageOptimizer.ts

interface ImageOptions {
  width: number;
  height: number;
  quality: number;
  format?: 'webp' | 'jpeg' | 'png';
}

interface ImageVariants {
  thumbnail: string;
  medium: string;
  large: string;
  hero: string;
}

/**
 * Redimensiona e otimiza uma imagem
 */
export const optimizeImage = (
  imageDataUrl: string,
  options: ImageOptions
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Não foi possível criar contexto do canvas'));
        return;
      }

      // Calcular dimensões mantendo proporção
      const { width: targetWidth, height: targetHeight } = calculateAspectRatio(
        img.width,
        img.height,
        options.width,
        options.height
      );

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Configurar qualidade do canvas
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Desenhar imagem redimensionada
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Converter para base64 com qualidade especificada
      const format = options.format || 'jpeg';
      const mimeType = `image/${format}`;
      
      try {
        const optimizedDataUrl = canvas.toDataURL(mimeType, options.quality);
        resolve(optimizedDataUrl);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Erro ao carregar imagem'));
    };

    img.src = imageDataUrl;
  });
};

/**
 * Calcula dimensões mantendo aspect ratio
 */
const calculateAspectRatio = (
  originalWidth: number,
  originalHeight: number,
  targetWidth: number,
  targetHeight: number
): { width: number; height: number } => {
  const aspectRatio = originalWidth / originalHeight;
  const targetAspectRatio = targetWidth / targetHeight;

  let width, height;

  if (aspectRatio > targetAspectRatio) {
    // Imagem mais larga
    width = targetWidth;
    height = targetWidth / aspectRatio;
  } else {
    // Imagem mais alta
    height = targetHeight;
    width = targetHeight * aspectRatio;
  }

  return { width: Math.round(width), height: Math.round(height) };
};

/**
 * Gera múltiplas variantes de uma imagem
 */
export const generateImageVariants = async (
  originalImage: string,
  variants: Record<string, ImageOptions>
): Promise<Record<string, string>> => {
  const results: Record<string, string> = {};
  
  for (const [key, options] of Object.entries(variants)) {
    try {
      results[key] = await optimizeImage(originalImage, options);
    } catch (error) {
      console.error(`Erro ao gerar variante ${key}:`, error);
      // Fallback para imagem original em caso de erro
      results[key] = originalImage;
    }
  }
  
  return results;
};

/**
 * Comprime uma imagem automaticamente baseada no tamanho
 */
export const autoOptimizeImage = async (imageDataUrl: string): Promise<string> => {
  const img = new Image();
  
  return new Promise((resolve) => {
    img.onload = async () => {
      const originalSize = imageDataUrl.length;
      let quality = 0.9;
      let targetWidth = img.width;
      let targetHeight = img.height;

      // Redimensionar se muito grande
      if (img.width > 1920 || img.height > 1080) {
        const scale = Math.min(1920 / img.width, 1080 / img.height);
        targetWidth = Math.round(img.width * scale);
        targetHeight = Math.round(img.height * scale);
      }

      // Ajustar qualidade baseada no tamanho do arquivo
      if (originalSize > 2000000) { // > 2MB
        quality = 0.7;
      } else if (originalSize > 1000000) { // > 1MB
        quality = 0.8;
      }

      try {
        const optimized = await optimizeImage(imageDataUrl, {
          width: targetWidth,
          height: targetHeight,
          quality,
          format: 'jpeg'
        });
        
        resolve(optimized);
      } catch (error) {
        console.error('Erro na otimização automática:', error);
        resolve(imageDataUrl); // Fallback para original
      }
    };

    img.onerror = () => resolve(imageDataUrl);
    img.src = imageDataUrl;
  });
};

/**
 * Recorta uma imagem para um aspect ratio específico
 */
export const cropToAspectRatio = (
  imageDataUrl: string,
  aspectRatio: number, // ex: 16/9 para widescreen
  quality: number = 0.9
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Contexto do canvas não disponível'));
        return;
      }

      const imgAspectRatio = img.width / img.height;
      
      let sourceWidth, sourceHeight, sourceX, sourceY;
      
      if (imgAspectRatio > aspectRatio) {
        // Imagem mais larga - cortar dos lados
        sourceHeight = img.height;
        sourceWidth = img.height * aspectRatio;
        sourceX = (img.width - sourceWidth) / 2;
        sourceY = 0;
      } else {
        // Imagem mais alta - cortar de cima/baixo
        sourceWidth = img.width;
        sourceHeight = img.width / aspectRatio;
        sourceX = 0;
        sourceY = (img.height - sourceHeight) / 2;
      }

      // Configurar canvas com as dimensões finais
      canvas.width = 800; // largura fixa para consistência
      canvas.height = canvas.width / aspectRatio;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Desenhar área recortada
      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, canvas.width, canvas.height
      );

      try {
        const croppedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(croppedDataUrl);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Erro ao carregar imagem'));
    img.src = imageDataUrl;
  });
};

/**
 * Converte imagem para WebP se suportado pelo navegador
 */
export const convertToWebPIfSupported = async (
  imageDataUrl: string,
  quality: number = 0.8
): Promise<string> => {
  // Verificar suporte ao WebP
  const supportsWebP = await checkWebPSupport();
  
  if (!supportsWebP) {
    return imageDataUrl;
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve(imageDataUrl); // Fallback
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);

      try {
        const webpDataUrl = canvas.toDataURL('image/webp', quality);
        resolve(webpDataUrl);
      } catch (error) {
        resolve(imageDataUrl); // Fallback se WebP falhar
      }
    };

    img.onerror = () => resolve(imageDataUrl);
    img.src = imageDataUrl;
  });
};

/**
 * Verifica suporte do navegador ao WebP
 */
const checkWebPSupport = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    try {
      const dataURL = canvas.toDataURL('image/webp');
      resolve(dataURL.indexOf('data:image/webp') === 0);
    } catch {
      resolve(false);
    }
  });
};

/**
 * Calcula o tamanho da imagem em bytes
 */
export const getImageSize = (dataUrl: string): number => {
  // Remove o prefixo data:image/...;base64,
  const base64 = dataUrl.split(',')[1];
  if (!base64) return 0;
  
  // Cada caractere base64 representa 6 bits, então 4 chars = 3 bytes
  const bytes = (base64.length * 3) / 4;
  
  // Ajustar para padding
  const padding = (base64.match(/=/g) || []).length;
  return bytes - padding;
};

/**
 * Formata tamanho de arquivo para exibição
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};