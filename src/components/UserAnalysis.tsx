import React, { useState } from 'react';
import { Search, User, AlertTriangle, Shield, RefreshCw } from 'lucide-react';

const UserAnalysis: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const sampleUsers = [
    {
      id: '510',
      trustScore: 0.23,
      trustTier: 'High Risk',
      accountAge: 45,
      totalReturns: 8,
      avgReturnValue: 342.50,
      sharedDevices: 3,
      sharedIPs: 2,
      fraudProbability: 0.87,
      riskFactors: ['High return frequency', 'Multiple shared devices', 'Short account age']
    },
    {
      id: '321',
      trustScore: 0.78,
      trustTier: 'Trusted',
      accountAge: 456,
      totalReturns: 2,
      avgReturnValue: 89.99,
      sharedDevices: 1,
      sharedIPs: 1,
      fraudProbability: 0.12,
      riskFactors: []
    },
    {
      id: '789',
      trustScore: 0.45,
      trustTier: 'Watchlist',
      accountAge: 123,
      totalReturns: 5,
      avgReturnValue: 156.78,
      sharedDevices: 2,
      sharedIPs: 1,
      fraudProbability: 0.34,
      riskFactors: ['Moderate return frequency']
    }
  ];

  const getTrustBadgeClass = (tier: string) => {
    const baseClass = 'trust-badge ';
    switch (tier) {
      case 'Highly Trusted': return baseClass + 'trust-highly-trusted';
      case 'Trusted': return baseClass + 'trust-trusted';
      case 'Watchlist': return baseClass + 'trust-watchlist';
      case 'High Risk': return baseClass + 'trust-high-risk';
      case 'Banned': return baseClass + 'trust-banned';
      default: return baseClass + 'trust-watchlist';
    }
  };

  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
    setSearchQuery(user.id);
  };

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search user by ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="btn-primary">
            Analyze User
          </button>
        </div>

        {/* Quick User Selection */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 mr-2">Quick select:</span>
          {sampleUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
            >
              User {user.id}
            </button>
          ))}
        </div>
      </div>

      {/* User Details */}
      {selectedUser && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Profile */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <User className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">User {selectedUser.id}</h3>
                  <span className={getTrustBadgeClass(selectedUser.trustTier)}>
                    {selectedUser.trustTier}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{selectedUser.trustScore}</div>
                <div className="text-sm text-gray-500">Trust Score</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Account Age</div>
                  <div className="text-lg font-semibold">{selectedUser.accountAge} days</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Total Returns</div>
                  <div className="text-lg font-semibold">{selectedUser.totalReturns}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Avg Return Value</div>
                  <div className="text-lg font-semibold">${selectedUser.avgReturnValue}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Fraud Probability</div>
                  <div className="text-lg font-semibold text-danger-600">{(selectedUser.fraudProbability * 100).toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-warning-600" />
              <h3 className="text-lg font-semibold text-gray-900">Risk Analysis</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-warning-50 p-3 rounded-lg">
                  <div className="text-sm text-warning-700">Shared Devices</div>
                  <div className="text-lg font-semibold text-warning-800">{selectedUser.sharedDevices}</div>
                </div>
                <div className="bg-warning-50 p-3 rounded-lg">
                  <div className="text-sm text-warning-700">Shared IPs</div>
                  <div className="text-lg font-semibold text-warning-800">{selectedUser.sharedIPs}</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Risk Factors</h4>
                {selectedUser.riskFactors.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedUser.riskFactors.map((factor: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-danger-700">
                        <div className="w-2 h-2 bg-danger-500 rounded-full"></div>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-success-600">No significant risk factors detected</p>
                )}
              </div>

              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <h4 className="text-sm font-medium text-primary-700 mb-2">Graph Embedding Insights</h4>
                <p className="text-sm text-primary-600">
                  This user's behavioral pattern shows {selectedUser.fraudProbability > 0.5 ? 'strong' : 'weak'} similarity 
                  to known fraud cases based on device sharing, IP patterns, and return behavior.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!selectedUser && (
        <div className="card text-center py-12">
          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">User Analysis</h3>
          <p className="text-gray-600 mb-4">
            Search for a user ID or select from the quick options above to view detailed fraud analysis
          </p>
          <p className="text-sm text-gray-500">
            Analysis includes trust scoring, risk factors, and graph-based behavioral insights
          </p>
        </div>
      )}
    </div>
  );
};

export default UserAnalysis;