import React from 'react';
import { AlertTriangle, Users, TrendingUp, Shield, Activity, Network } from 'lucide-react';
import MetricCard from './MetricCard';
import FraudTrendChart from './FraudTrendChart';
import TrustDistributionChart from './TrustDistributionChart';

const Dashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Total Users Analyzed',
      value: '2,000',
      change: '+12%',
      trend: 'up' as const,
      icon: Users,
      color: 'primary' as const,
    },
    {
      title: 'Fraud Detection Rate',
      value: '9.8%',
      change: '-2.1%',
      trend: 'down' as const,
      icon: AlertTriangle,
      color: 'danger' as const,
    },
    {
      title: 'Model Accuracy',
      value: '94.2%',
      change: '+1.5%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'success' as const,
    },
    {
      title: 'Trust Score Avg',
      value: '0.73',
      change: '+0.05',
      trend: 'up' as const,
      icon: Shield,
      color: 'primary' as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Fraud Detection Trends</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <FraudTrendChart />
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Trust Score Distribution</h3>
            <Network className="w-5 h-5 text-gray-400" />
          </div>
          <TrustDistributionChart />
        </div>
      </div>

      {/* Model Performance Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-primary-600">0.8547</div>
            <div className="text-sm text-gray-600">F1 Score</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-success-600">0.9421</div>
            <div className="text-sm text-gray-600">ROC AUC</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-warning-600">0.67</div>
            <div className="text-sm text-gray-600">Optimal Threshold</div>
          </div>
        </div>
        <div className="mt-4 p-4 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary-700">
            <strong>Graph Embeddings:</strong> Node2Vec with 64 dimensions, capturing user-device-IP-address relationships.
            <strong className="ml-4">XGBoost:</strong> Optimized with early stopping and class balancing for fraud detection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;