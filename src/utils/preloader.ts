// src/utils/preloader.ts

export const preloadCriticalResources = () => {
  // Preload de fonts críticas
  const fonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
  ];

  fonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font;
    link.as = 'style';
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  });

  // Preload de imagens críticas
  const criticalImages = [
    // Adicione aqui URLs de imagens importantes que devem carregar primeiro
  ];

  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

export const setupDNSPrefetch = () => {
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://wa.me'
  ];

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};