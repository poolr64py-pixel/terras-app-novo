import React, { useState, lazy, Suspense } from 'react';
import Spinner from './components/Spinner';
import MobileMenu from './components/MobileMenu';

// Lazy Components - ajustados para Vite
const LazyHomePage = lazy(() => import('./components/HomePage'));
const LazyImoveisPage = lazy(() => import('./components/ImoveisPage'));
const LazyServicosPage = lazy(() => import('./components/ServicosPage'));
const LazySobrePage = lazy(() => import('./components/SobrePage'));
const LazyContatoPage = lazy(() => import('./components/ContatoPage'));
const LazyBlogSystem = lazy(() => import('./blog/BlogSystem'));
const LazyCRMDashboard = lazy(() => import('./components/Dashboard/DashboardCRM'));

// HOC para Lazy Loading com fallback
const withLazyLoading = (Component) => (props) => (
  <Suspense fallback={<Spinner />}>
    <Component {...props} />
  </Suspense>
);

function App() {
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    priceRange: ""
  });
  const [showCRM, setShowCRM] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  
  const whatsappNumber = '+595994718400';
  
  const sendWhatsApp = (message) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Função que renderiza a página principal
  const renderPage = () => {
    switch (currentPage) {
      case 'imoveis': {
        const LazyImoveis = withLazyLoading(LazyImoveisPage);
        return <LazyImoveis onSendWhatsApp={sendWhatsApp} filters={filters} setFilters={setFilters} />;
      }
      case 'servicos': {
        const LazyServicos = withLazyLoading(LazyServicosPage);
        return <LazyServicos onSendWhatsApp={sendWhatsApp} />;
      }
      case 'sobre': {
        const LazySobre = withLazyLoading(LazySobrePage);
        return <LazySobre />;
      }
      case 'contato': {
        const LazyContato = withLazyLoading(LazyContatoPage);
        return <LazyContato onSendWhatsApp={sendWhatsApp} />;
      }
      case 'blog': {
        const LazyBlog = withLazyLoading(LazyBlogSystem);
        return <LazyBlog onSendWhatsApp={sendWhatsApp} />;
      }
      default: { // home
        const LazyHome = withLazyLoading(LazyHomePage);
        return <LazyHome onSendWhatsApp={sendWhatsApp} onNavigate={setCurrentPage} filters={filters} setFilters={setFilters} />;
      }
    }
  };

  // Lazy CRM
  const LazyCRM = withLazyLoading(LazyCRMDashboard);

  const navItems = [
    { key: 'home', label: 'Início' },
    { key: 'imoveis', label: 'Imóveis' },
    { key: 'servicos', label: 'Serviços' },
    { key: 'sobre', label: 'Sobre' },
    { key: 'contato', label: 'Contato' },
    { key: 'blog', label: 'Blog' }
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header do site: só aparece quando NÃO estiver no CRM */}
      {!showCRM && (
        <header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'rgba(102, 126, 234, 0.95)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 50px',
          color: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px', 
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onClick={() => setCurrentPage('home')}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span style={{ fontSize: '24px' }}>🏠</span>
            <div>
              <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>Imóveis Paraguay</h1>
              <p style={{ margin: 0, fontSize: '12px', opacity: '0.9' }}>Terras no Paraguay</p>
            </div>
          </div>

          {/* Mobile Menu - separado do logo */}
          <div style={{ display: 'block' }}>
            <MobileMenu 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage} 
              setShowCRM={setShowCRM} 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{ 
            display: 'flex', 
            gap: '25px', 
            alignItems: 'center' 
          }}>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setCurrentPage(item.key)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentPage === item.key ? '#fff' : 'rgba(255,255,255,0.8)',
                  cursor: 'pointer',
                  textDecoration: currentPage === item.key ? 'underline' : 'none',
                  fontSize: '16px',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  if (currentPage !== item.key) {
                    e.target.style.color = '#fff';
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (currentPage !== item.key) {
                    e.target.style.color = 'rgba(255,255,255,0.8)';
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setShowCRM(true)}
              style={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                border: 'none',
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              ⚙️ CRM Admin
            </button>
          </nav>
        </header>
      )}

      {/* Conteúdo */}
      <div style={{ paddingTop: showCRM ? '0' : '80px' }}>
        {showCRM ? (
          <LazyCRM onBack={() => setShowCRM(false)} />
        ) : (
          renderPage()
        )}
      </div>
    </div>
  );
}

export default App;