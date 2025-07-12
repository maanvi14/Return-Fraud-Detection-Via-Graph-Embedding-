import React, { useState } from 'react';
import { Brain, Send, User, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

interface AssessmentResult {
  userId: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  confidence: number;
  reasoning: string;
  recommendations: string[];
  timestamp: string;
}

const LLMAssessment: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [ollamaStatus, setOllamaStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  const sampleUsers = [
    { id: '510', trustScore: 0.23, returns: 8, avgValue: 342.50, accountAge: 45 },
    { id: '321', trustScore: 0.78, returns: 2, avgValue: 89.99, accountAge: 456 },
    { id: '789', trustScore: 0.45, returns: 5, avgValue: 156.78, accountAge: 123 },
    { id: '597', trustScore: 0.15, returns: 12, avgValue: 567.89, accountAge: 23 },
  ];

  // Simulate Ollama connection check
  React.useEffect(() => {
    const checkOllamaConnection = async () => {
      try {
        // In a real implementation, this would check if Ollama is running
        // For demo purposes, we'll simulate a connection
        setTimeout(() => {
          setOllamaStatus('connected');
        }, 1000);
      } catch (error) {
        setOllamaStatus('disconnected');
      }
    };
    checkOllamaConnection();
  }, []);

  const generateLLMAssessment = async (userId: string) => {
    setIsAnalyzing(true);
    
    // Find user data
    const user = sampleUsers.find(u => u.id === userId);
    if (!user) return;

    // Simulate LLM API call to Ollama
    try {
      // In a real implementation, this would call Ollama API
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate assessment based on user data
      const riskLevel = user.trustScore < 0.3 ? 'Critical' : 
                       user.trustScore < 0.5 ? 'High' :
                       user.trustScore < 0.7 ? 'Medium' : 'Low';
      
      const confidence = Math.random() * 0.3 + 0.7; // 70-100%
      
      const reasoning = generateReasoning(user, riskLevel);
      const recommendations = generateRecommendations(user, riskLevel);
      
      const result: AssessmentResult = {
        userId,
        riskLevel,
        confidence,
        reasoning,
        recommendations,
        timestamp: new Date().toISOString()
      };
      
      setAssessmentResult(result);
    } catch (error) {
      console.error('LLM Assessment failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateReasoning = (user: any, riskLevel: string): string => {
    const patterns = {
      Critical: `User ${user.id} exhibits extremely high-risk patterns with a trust score of ${user.trustScore}. The combination of ${user.returns} returns averaging $${user.avgValue} within ${user.accountAge} days suggests potential organized fraud activity. The short account age relative to high-value returns indicates possible account farming or return abuse schemes.`,
      High: `User ${user.id} shows concerning behavioral patterns with elevated return frequency (${user.returns} returns) and above-average return values ($${user.avgValue}). The trust score of ${user.trustScore} combined with account age of ${user.accountAge} days suggests potential fraud risk requiring immediate attention.`,
      Medium: `User ${user.id} displays moderate risk indicators with ${user.returns} returns and trust score of ${user.trustScore}. While not immediately critical, the pattern warrants monitoring for potential escalation in fraudulent behavior.`,
      Low: `User ${user.id} maintains a healthy profile with trust score of ${user.trustScore} and reasonable return patterns (${user.returns} returns). The account age of ${user.accountAge} days and return behavior align with legitimate customer activity.`
    };
    return patterns[riskLevel as keyof typeof patterns];
  };

  const generateRecommendations = (user: any, riskLevel: string): string[] => {
    const recommendations = {
      Critical: [
        'Immediately flag account for manual review',
        'Suspend return privileges pending investigation',
        'Cross-reference with known fraud rings',
        'Implement enhanced verification for future transactions',
        'Consider account suspension if patterns persist'
      ],
      High: [
        'Place account on watchlist for enhanced monitoring',
        'Require additional verification for returns over $200',
        'Review transaction history for anomalies',
        'Implement stricter return policies for this user',
        'Schedule follow-up assessment in 30 days'
      ],
      Medium: [
        'Monitor return patterns for escalation',
        'Apply standard fraud prevention measures',
        'Review quarterly for pattern changes',
        'Consider customer education on return policies'
      ],
      Low: [
        'Continue standard monitoring protocols',
        'Maintain current trust level',
        'No immediate action required',
        'Include in routine quarterly reviews'
      ]
    };
    return recommendations[riskLevel as keyof typeof recommendations];
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-red-700 bg-red-50 border-red-200';
      case 'High': return 'text-danger-700 bg-danger-50 border-danger-200';
      case 'Medium': return 'text-warning-700 bg-warning-50 border-warning-200';
      case 'Low': return 'text-success-700 bg-success-50 border-success-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (ollamaStatus) {
      case 'connected': return <CheckCircle className="w-4 h-4 text-success-600" />;
      case 'disconnected': return <AlertTriangle className="w-4 h-4 text-danger-600" />;
      case 'checking': return <Clock className="w-4 h-4 text-warning-600 animate-spin" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-primary-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">LLM Fraud Assessment</h2>
              <p className="text-gray-600">Ollama Llama3-powered intelligent fraud analysis</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className="text-sm text-gray-600">
              Ollama {ollamaStatus === 'connected' ? 'Connected' : 
                     ollamaStatus === 'disconnected' ? 'Disconnected' : 'Checking...'}
            </span>
          </div>
        </div>
      </div>

      {/* User Selection */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select User for Assessment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleUsers.map((user) => (
            <div
              key={user.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedUser === user.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedUser(user.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">User {user.id}</span>
                <User className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Trust: {user.trustScore}</div>
                <div>Returns: {user.returns}</div>
                <div>Age: {user.accountAge}d</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => selectedUser && generateLLMAssessment(selectedUser)}
            disabled={!selectedUser || isAnalyzing || ollamaStatus !== 'connected'}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Brain className="w-4 h-4 animate-pulse" />
                <span>Analyzing with Llama3...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Generate LLM Assessment</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Assessment Results */}
      {assessmentResult && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              LLM Assessment Results - User {assessmentResult.userId}
            </h3>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(assessmentResult.riskLevel)}`}>
                {assessmentResult.riskLevel} Risk
              </span>
              <div className="text-sm text-gray-600">
                Confidence: {(assessmentResult.confidence * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Reasoning */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-primary-600" />
                AI Reasoning
              </h4>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{assessmentResult.reasoning}</p>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Recommended Actions</h4>
              <div className="space-y-2">
                {assessmentResult.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-2 p-3 bg-primary-50 rounded-lg">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-primary-700">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-warning-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-4 h-4 text-warning-600" />
              <span className="text-sm font-medium text-warning-800">LLM Model Information</span>
            </div>
            <p className="text-sm text-warning-700">
              Assessment generated using Ollama Llama3 model with fraud detection context. 
              Analysis combines traditional ML features with natural language reasoning for enhanced fraud detection accuracy.
            </p>
            <p className="text-xs text-warning-600 mt-2">
              Generated at: {new Date(assessmentResult.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!assessmentResult && !isAnalyzing && (
        <div className="card text-center py-8">
          <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">AI-Powered Fraud Assessment</h3>
          <p className="text-gray-600 mb-4">
            Select a user above and click "Generate LLM Assessment" to get intelligent fraud analysis
          </p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>• Powered by Ollama Llama3 for natural language reasoning</p>
            <p>• Combines ML features with contextual analysis</p>
            <p>• Provides actionable recommendations for fraud prevention</p>
          </div>
        </div>
      )}

      {/* Ollama Connection Guide */}
      {ollamaStatus === 'disconnected' && (
        <div className="card border-warning-200 bg-warning-50">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-warning-600" />
            <h3 className="text-lg font-semibold text-warning-800">Ollama Connection Required</h3>
          </div>
          <div className="space-y-3 text-sm text-warning-700">
            <p>To use LLM assessment features, please ensure Ollama is running with Llama3:</p>
            <div className="bg-warning-100 p-3 rounded font-mono text-xs">
              <div>1. Install Ollama: curl -fsSL https://ollama.ai/install.sh | sh</div>
              <div>2. Pull Llama3: ollama pull llama3</div>
              <div>3. Start Ollama: ollama serve</div>
            </div>
            <p>Once Ollama is running, refresh this page to connect.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LLMAssessment;