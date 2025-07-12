import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrustDistributionChart: React.FC = () => {
  const data = [
    { tier: 'Highly Trusted', count: 342, percentage: 17.1 },
    { tier: 'Trusted', count: 678, percentage: 33.9 },
    { tier: 'Watchlist', count: 589, percentage: 29.5 },
    { tier: 'High Risk', count: 287, percentage: 14.4 },
    { tier: 'Banned', count: 104, percentage: 5.2 },
  ];

  const getBarColor = (tier: string) => {
    switch (tier) {
      case 'Highly Trusted': return '#22c55e';
      case 'Trusted': return '#3b82f6';
      case 'Watchlist': return '#f59e0b';
      case 'High Risk': return '#ef4444';
      case 'Banned': return '#374151';
      default: return '#6b7280';
    }
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="tier" 
            stroke="#6b7280"
            fontSize={10}
            angle={-45}
            textAnchor="end"
            height={80}
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
            formatter={(value, name) => [
              name === 'count' ? `${value} users` : `${value}%`,
              name === 'count' ? 'Count' : 'Percentage'
            ]}
          />
          <Bar 
            dataKey="count" 
            fill={(entry) => getBarColor(entry.tier)}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrustDistributionChart;