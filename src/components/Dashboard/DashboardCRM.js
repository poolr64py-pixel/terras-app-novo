import React, { useState, useEffect } from 'react';

// Skeleton simples para loading
const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-200 rounded h-16 mb-4"></div>
);

const DashboardCRM = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('propriedades');
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalProperties: 0,
    totalViews: 0,
    monthlyLeads: 0,
    activeListings: 0
  });

  const [properties, setProperties] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setStats({
        totalProperties: 15,
        totalViews: 1250,
        monthlyLeads: 23,
        activeListings: 12
      });

      setProperties([
        { id: 1, title: 'Casa Moderna Centro', price: 'USD 350.000', status: 'Ativo', views: 45 },
        { id: 2, title: 'Apartamento Vista Mar', price: 'USD 250.000', status: 'Ativo', views: 32 },
        { id: 3, title: 'Sítio Rural Premium', price: 'USD 180.000', status: 'Vendido', views: 28 }
      ]);

      setLeads([
        { id: 1, name: 'João Silva', contact: '+595 999 123 456', interestedIn: 'Apartamento Vista Mar' },
        { id: 2, name: 'Maria Costa', contact: '+595 999 987 654', interestedIn: 'Casa Moderna Centro' }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const renderSection = () => {
    if (loading) {
      return (
        <div>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      );
    }

    if (activeSection === 'propriedades') {
      return properties.map(property => (
        <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg mb-3 hover:bg-gray-50">
          <div>
            <h4 className="font-medium">{property.title}</h4>
            <p className="text-sm text-gray-600">{property.price}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{property.views} visualizações</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              property.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {property.status}
            </span>
          </div>
        </div>
      ));
    }

    if (activeSection === 'leads') {
      return leads.map(lead => (
        <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg mb-3 hover:bg-gray-50">
          <div>
            <h4 className="font-medium">{lead.name}</h4>
            <p className="text-sm text-gray-600">{lead.contact}</p>
          </div>
          <div className="text-sm text-gray-500">{lead.interestedIn}</div>
        </div>
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Top Bar: Header + Voltar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🏠 Dashboard CRM</h1>
            <p className="text-gray-600">Visão geral das propriedades e performance</p>
          </div>
          <button
            onClick={onBack}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            ← Voltar ao Site
          </button>
        </div>

        {/* Menu Interno */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-3 py-1 rounded ${activeSection === 'propriedades' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveSection('propriedades')}
          >
            Propriedades
          </button>
          <button
            className={`px-3 py-1 rounded ${activeSection === 'leads' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveSection('leads')}
          >
            Leads
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Propriedades</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
              </div>
              <div className="text-4xl">🏠</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Visualizações</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
              </div>
              <div className="text-4xl">👁️</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Leads do Mês</p>
                <p className="text-2xl font-bold text-gray-900">{stats.monthlyLeads}</p>
              </div>
              <div className="text-4xl">📞</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
        </div>

        {/* Conteúdo da Seção Ativa */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          {renderSection()}
        </div>

      </div>
    </div>
  );
};

export default DashboardCRM;
