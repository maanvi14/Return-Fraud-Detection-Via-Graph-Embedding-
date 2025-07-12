import React, { useState } from 'react';
import { Shield, Users, TrendingUp, RefreshCw, Download } from 'lucide-react';

const TrustScoring: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const trustTiers = [
    {
      name: 'Highly Trusted',
      count: 342,
      percentage: 17.1,
      color: 'success',
      description: 'Users with excellent track record and low risk indicators',
      scoreRange: '0.85 - 1.00'
    },
    {
      name: 'Trusted',
      count: 678,
      percentage: 33.9,
      color: 'primary',
      description: 'Reliable users with good behavioral patterns',
      scoreRange: '0.65 - 0.84'
    },
    {
      name: 'Watchlist',
      count: 589,
      percentage: 29.5,
      color: 'warning',
      description: 'Users requiring monitoring due to moderate risk factors',
      scoreRange: '0.45 - 0.64'
    },
    {
      name: 'High Risk',
      count: 287,
      percentage: 14.4,
      color: 'danger',
      description: 'Users with significant fraud indicators',
      scoreRange: '0.25 - 0.44'
    },
    {
      name: 'Banned',
      count: 104,
      percentage: 5.2,
      color: 'gray',
      description: 'Users with confirmed fraudulent behavior',
      scoreRange: '0.00 - 0.24'
    }
  ];

  const sampleUsers = {
    'Highly Trusted': [
      { id: '1001', score: 0.92, accountAge: 890, returns: 1, avgValue: 45.99 },
      { id: '1002', score: 0.89, accountAge: 654, returns: 0, avgValue: 0 },
      { id: '1003', score: 0.87, accountAge: 432, returns: 2, avgValue: 67.50 }
    ],
    'Trusted': [
      { id: '2001', score: 0.78, accountAge: 456, returns: 2, avgValue: 89.99 },
      { id: '2002', score: 0.72, accountAge: 234, returns: 3, avgValue: 123.45 },
      { id: '2003', score: 0.69, accountAge: 567, returns: 1, avgValue: 156.78 }
    ],
    'Watchlist': [
      { id: '3001', score: 0.55, accountAge: 123, returns: 4, avgValue: 234.56 },
      { id: '3002', score: 0.51, accountAge: 89, returns: 5, avgValue: 189.34 },
      { id: '3003', score: 0.48, accountAge: 156, returns: 6, avgValue: 298.77 }
    ],
    'High Risk': [
      { id: '4001', score: 0.34, accountAge: 67, returns: 7, avgValue: 345.67 },
      { id: '4002', score: 0.29, accountAge: 45, returns: 8, avgValue: 412.33 },
      { id: '4003', score: 0.26, accountAge: 34, returns: 9, avgValue: 567.12 }
    ],
    'Banned': [
      { id: '5001', score: 0.15, accountAge: 23, returns: 12, avgValue: 678.90 },
      { id: '5002', score: 0.12, accountAge: 18, returns: 15, avgValue: 789.45 },
      { id: '5003', score: 0.08, accountAge: 12, returns: 18, avgValue: 890.12 }
    ]
  };

  const getColorClasses = (color: string) => {
    const classes = {
      success: 'bg-success-50 text-success-700 border-success-200',
      primary: 'bg-primary-50 text-primary-700 border-primary-200',
      warning: 'bg-warning-50 text-warning-700 border-warning-200',
      danger: 'bg-danger-50 text-danger-700 border-danger-200',
      gray: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return classes[color as keyof typeof classes] || classes.gray;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-primary-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Trust Scoring System</h2>
              <p className="text-gray-600">Hybrid model combining fraud detection and graph similarity</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="btn-primary flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Scores</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trust Tier Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {trustTiers.map((tier) => (
          <div
            key={tier.name}
            className={`card cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
              selectedTier === tier.name ? getColorClasses(tier.color) : 'border-transparent'
            }`}
            onClick={() => setSelectedTier(selectedTier === tier.name ? null : tier.name)}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{tier.count}</div>
              <div className="text-sm text-gray-600 mb-2">{tier.percentage}%</div>
              <div className="text-sm font-medium text-gray-900">{tier.name}</div>
              <div className="text-xs text-gray-500 mt-1">{tier.scoreRange}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Scoring Methodology */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Scoring Methodology</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-primary-50 rounded-lg">
              <h4 className="font-medium text-primary-800 mb-2">Fraud Model Score (60% weight)</h4>
              <p className="text-sm text-primary-700">
                XGBoost classifier trained on user behavior, return patterns, and account characteristics.
                Outputs probability of fraudulent activity.
              </p>
            </div>
            <div className="p-4 bg-success-50 rounded-lg">
              <h4 className="font-medium text-success-800 mb-2">Graph Similarity Score (40% weight)</h4>
              <p className="text-sm text-success-700">
                Node2Vec embeddings capturing user relationships through shared devices, IPs, and addresses.
                Measures behavioral similarity to known patterns.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Final Trust Score Formula</h4>
              <code className="text-sm text-gray-700 block bg-white p-2 rounded border">
                trust_score = 0.6 × fraud_model + 0.4 × graph_similarity
              </code>
            </div>
            <div className="p-4 bg-warning-50 rounded-lg">
              <h4 className="font-medium text-warning-800 mb-2">Real-time Updates</h4>
              <p className="text-sm text-warning-700">
                Scores are recalculated daily based on new transaction data and behavioral patterns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Tier Details */}
      {selectedTier && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedTier} Users - Sample Data
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(
              trustTiers.find(t => t.name === selectedTier)?.color || 'gray'
            )}`}>
              {trustTiers.find(t => t.name === selectedTier)?.count} users
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">User ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Trust Score</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Account Age</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Returns</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Avg Return Value</th>
                </tr>
              </thead>
              <tbody>
                {sampleUsers[selectedTier as keyof typeof sampleUsers]?.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{user.id}</td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{user.score.toFixed(2)}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{user.accountAge} days</td>
                    <td className="py-3 px-4 text-gray-600">{user.returns}</td>
                    <td className="py-3 px-4 text-gray-600">${user.avgValue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Description:</strong> {trustTiers.find(t => t.name === selectedTier)?.description}
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!selectedTier && (
        <div className="card text-center py-8">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Trust Tier Analysis</h3>
          <p className="text-gray-600">
            Click on any trust tier above to view sample users and detailed scoring information
          </p>
        </div>
      )}
    </div>
  );
};

export default TrustScoring;