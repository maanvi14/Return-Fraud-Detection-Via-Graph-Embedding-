import React, { useState } from 'react';
import { Network, Users, AlertTriangle, Search, RefreshCw } from 'lucide-react';

const FraudRings: React.FC = () => {
  const [selectedRing, setSelectedRing] = useState<any>(null);

  const fraudRings = [
    {
      id: 'ring_001',
      centerUser: '510',
      members: [
        { id: '597', similarity: 0.5265, returns: 7, avgValue: 289.45 },
        { id: '438', similarity: 0.5197, returns: 6, avgValue: 345.67 },
        { id: '572', similarity: 0.5176, returns: 8, avgValue: 412.33 },
        { id: '975', similarity: 0.5060, returns: 5, avgValue: 198.90 },
        { id: '515', similarity: 0.4941, returns: 9, avgValue: 567.12 }
      ],
      riskLevel: 'High',
      totalValue: 1813.47,
      sharedDevices: 3,
      sharedIPs: 2
    },
    {
      id: 'ring_002',
      centerUser: '234',
      members: [
        { id: '445', similarity: 0.4823, returns: 4, avgValue: 156.78 },
        { id: '667', similarity: 0.4756, returns: 3, avgValue: 234.56 },
        { id: '889', similarity: 0.4689, returns: 5, avgValue: 189.34 }
      ],
      riskLevel: 'Medium',
      totalValue: 580.68,
      sharedDevices: 2,
      sharedIPs: 1
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-danger-600 bg-danger-50';
      case 'Medium': return 'text-warning-600 bg-warning-50';
      case 'Low': return 'text-success-600 bg-success-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Network className="w-6 h-6 text-primary-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Fraud Ring Detection</h2>
              <p className="text-gray-600">FAISS-powered cosine similarity analysis</p>
            </div>
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Analysis</span>
          </button>
        </div>
      </div>

      {/* Fraud Rings List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fraudRings.map((ring) => (
          <div 
            key={ring.id}
            className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={() => setSelectedRing(ring)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-danger-100 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-danger-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Ring {ring.id.split('_')[1]}</h3>
                  <p className="text-sm text-gray-600">Center: User {ring.centerUser}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(ring.riskLevel)}`}>
                {ring.riskLevel} Risk
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg font-bold text-gray-900">{ring.members.length + 1}</div>
                <div className="text-xs text-gray-600">Members</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg font-bold text-gray-900">${ring.totalValue.toFixed(0)}</div>
                <div className="text-xs text-gray-600">Total Value</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{ring.sharedDevices} shared devices</span>
              <span>{ring.sharedIPs} shared IPs</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Ring Analysis */}
      {selectedRing && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-danger-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Fraud Ring {selectedRing.id.split('_')[1]} - Detailed Analysis
              </h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(selectedRing.riskLevel)}`}>
              {selectedRing.riskLevel} Risk
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ring Members */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Ring Members</h4>
              <div className="space-y-3">
                {/* Center User */}
                <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-danger-600 rounded-full"></div>
                      <span className="font-medium text-danger-900">User {selectedRing.centerUser}</span>
                      <span className="text-xs bg-danger-200 text-danger-800 px-2 py-1 rounded">Center</span>
                    </div>
                  </div>
                </div>

                {/* Ring Members */}
                {selectedRing.members.map((member: any, index: number) => (
                  <div key={member.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <span className="font-medium text-gray-900">User {member.id}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {(member.similarity * 100).toFixed(1)}% similar
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <span>{member.returns} returns</span>
                      <span>${member.avgValue.toFixed(2)} avg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ring Statistics */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Ring Statistics</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-xl font-bold text-gray-900">{selectedRing.members.length + 1}</div>
                    <div className="text-sm text-gray-600">Total Members</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-xl font-bold text-gray-900">${selectedRing.totalValue.toFixed(0)}</div>
                    <div className="text-sm text-gray-600">Total Return Value</div>
                  </div>
                </div>

                <div className="p-4 bg-warning-50 rounded-lg">
                  <h5 className="font-medium text-warning-800 mb-2">Shared Resources</h5>
                  <div className="space-y-2 text-sm text-warning-700">
                    <div className="flex justify-between">
                      <span>Shared Devices:</span>
                      <span className="font-medium">{selectedRing.sharedDevices}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shared IP Addresses:</span>
                      <span className="font-medium">{selectedRing.sharedIPs}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary-50 rounded-lg">
                  <h5 className="font-medium text-primary-800 mb-2">Detection Method</h5>
                  <p className="text-sm text-primary-700">
                    Identified using Node2Vec graph embeddings and FAISS cosine similarity search. 
                    Members show similar behavioral patterns in device usage, IP addresses, and return patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!selectedRing && (
        <div className="card text-center py-8">
          <Network className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Fraud Ring Analysis</h3>
          <p className="text-gray-600">
            Click on a fraud ring above to view detailed member analysis and shared resource patterns
          </p>
        </div>
      )}
    </div>
  );
};

export default FraudRings;