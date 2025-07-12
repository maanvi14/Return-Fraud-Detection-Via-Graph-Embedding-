import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FraudTrendChart: React.FC = () => {
  const data = [
    { month: 'Jan', fraudRate: 8.2, detectionRate: 91.5 },
    { month: 'Feb', fraudRate: 9.1, detectionRate: 92.3 },
    { month: 'Mar', fraudRate: 10.5, detectionRate: 93.1 },
    { month: 'Apr', fraudRate: 9.8, detectionRate: 94.2 },
    { month: 'May', fraudRate: 8.9, detectionRate: 94.8 },
    { month: 'Jun', fraudRate: 9.3, detectionRate: 95.1 },
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="fraudRate" 
            stroke="#ef4444" 
            strokeWidth={3}
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            name="Fraud Rate (%)"
          />
          <Line 
            type="monotone" 
            dataKey="detectionRate" 
            stroke="#22c55e" 
            strokeWidth={3}
            dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
            name="Detection Rate (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FraudTrendChart;