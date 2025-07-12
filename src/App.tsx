import React, { useState } from 'react';
import { Shield, Users, AlertTriangle, TrendingUp, Network, Search, RefreshCw } from 'lucide-react';
import Dashboard from './components/Dashboard';
import UserAnalysis from './components/UserAnalysis';
import FraudRings from './components/FraudRings';
import TrustScoring from './components/TrustScoring';
import Navigation from './components/Navigation';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'analysis':
        return <UserAnalysis />;
      case 'rings':
        return <FraudRings />;
      case 'trust':
        return <TrustScoring />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Fraud Detection System</h1>
                <p className="text-sm text-gray-500">Graph-based ML Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                <span>Model Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;