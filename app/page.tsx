'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setGeneratedCode('');
  
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate code');
      }
  
      const data = await response.json();
      setGeneratedCode(data.code);
    } catch (error) {
      console.error('Error:', error);
      setGeneratedCode('// Error generating code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            AI Component Generator
          </h1>
          <p className="text-xl text-gray-600">
            Describe a component and get accessible React code instantly
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Describe Your Component
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Example: A pricing card with three tiers - Basic, Pro, and Enterprise. Each tier should have a title, price, feature list, and a call-to-action button."
            />
            
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="mt-4 w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating...
                </span>
              ) : (
                '✨ Generate Component'
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-gray-700">
                Generated Code
              </label>
              {generatedCode && (
                <button
                  onClick={() => navigator.clipboard.writeText(generatedCode)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  📋 Copy Code
                </button>
              )}
            </div>
            <pre className="w-full h-48 p-4 bg-gray-900 text-green-400 rounded-lg overflow-auto text-sm font-mono">
              {generatedCode || '// Your generated component code will appear here...\n// Try describing a component and clicking Generate!'}
            </pre>
            
            {generatedCode && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  ✅ <strong>Accessibility features included:</strong> Semantic HTML, ARIA labels, keyboard navigation
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Built by {'{your name}'} • Powered by Claude AI</p>
        </div>
      </div>
    </div>
  );
}