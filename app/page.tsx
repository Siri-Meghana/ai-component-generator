'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setGeneratedCode('');
    setError('');
  
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate code');
      }
  
      const data = await response.json();
      setGeneratedCode(data.code);
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen p-8 relative overflow-hidden transition-colors duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-12 rounded-2xl p-8 shadow-lg border ${
              isDarkMode 
                ? 'bg-gray-800/95 border-gray-700' 
                : 'bg-white/95 border-white/50'
            }`}>
            {/* Dark Mode Toggle - Top Right */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                  isDarkMode
                    ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label="Toggle dark mode"
              >
                <span className="text-xl">{isDarkMode ? '☀️' : '🌙'}</span>
                <span className="text-sm">{isDarkMode ? 'Light' : 'Dark'}</span>
              </button>
            </div>

            <div className="inline-block mb-4">
              <span className="text-6xl">⚡</span>
            </div>
            <h1 className={`text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3`}>
              AI Component Generator
            </h1>
            <p className={`text-xl font-medium transition-colors ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Describe a component and get accessible React code instantly
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <span className={`px-3 py-1 rounded-full font-medium ${
                isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
              }`}>TypeScript</span>
              <span className={`px-3 py-1 rounded-full font-medium ${
                isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-700'
              }`}>Tailwind CSS</span>
              <span className={`px-3 py-1 rounded-full font-medium ${
                isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'
              }`}>Accessible</span>
            </div>
          </div>

          {/* Example Prompts Section */}
          <div className="mb-8">
          <h2 className={`text-lg font-semibold mb-4 text-center transition-colors ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
            ✨ Try these examples or describe your own component
          </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Example Card 1 - Button */}
              <button
                onClick={() => setPrompt("A primary action button with icon and loading state. Include hover effects and accessibility features.")}
                className="group bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-500 text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <span className="text-2xl group-hover:scale-110 transition-transform">🔘</span>
                  </div>
                  <h3 className="font-bold text-gray-800">Button</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Action button with states
                </p>
              </button>

              {/* Example Card 2 - Card */}
              <button
                onClick={() => setPrompt("A product card with image, title, description, price, and add to cart button. Make it responsive and accessible.")}
                className="group bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-purple-500 text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                    <span className="text-2xl group-hover:scale-110 transition-transform">🎴</span>
                  </div>
                  <h3 className="font-bold text-gray-800">Card</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Product or content card
                </p>
              </button>

              {/* Example Card 3 - Modal */}
              <button
                onClick={() => setPrompt("A modal dialog for user confirmation with overlay, close button, and action buttons. Include focus trapping and escape key support.")}
                className="group bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-green-500 text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
                    <span className="text-2xl group-hover:scale-110 transition-transform">💬</span>
                  </div>
                  <h3 className="font-bold text-gray-800">Modal</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Dialog with overlay
                </p>
              </button>

              {/* Example Card 4 - Form */}
              <button
                onClick={() => setPrompt("A contact form with name, email, message fields. Include validation, error states, and a submit button with loading state.")}
                className="group bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-orange-500 text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                    <span className="text-2xl group-hover:scale-110 transition-transform">📝</span>
                  </div>
                  <h3 className="font-bold text-gray-800">Form</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Input fields with validation
                </p>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Input Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Describe Your Component
                </label>
                <span className={`text-xs font-medium ${
                  prompt.length > 500 ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {prompt.length} / 500 characters
                </span>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                maxLength={500}
                className="w-full h-70 p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder:text-gray-600 placeholder:text-sm text-gray-600"
                placeholder="Example: A pricing card with three tiers - Basic, Pro, and Enterprise. Each tier should have a title, price, feature list, and a call-to-action button."
              />
              
              <button
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim()}
                className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex flex-col items-center justify-center gap-2">
                    <span className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      AI is generating your component...
                    </span>
                    <span className="text-sm opacity-80">This may take a few seconds</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-xl">✨</span>
                    Generate Component
                  </span>
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Generated Code
                </label>
                {generatedCode && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedCode);
                      setShowCopied(true);
                      setTimeout(() => setShowCopied(false), 2000);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-all hover:scale-105"
                  >
                    {showCopied ? '✅ Copied!' : '📋 Copy Code'}
                  </button>
                )}
              </div>
              {/* Error Message */}
              {error && (
                <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">⚠️</span>
                    <div>
                      <h3 className="text-red-800 font-semibold mb-1">Error</h3>
                      <p className="text-red-700 text-sm">{error}</p>
                      <p className="text-red-600 text-xs mt-2">
                        Try simplifying your prompt or check your internet connection.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {generatedCode ? (
              <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-700">
                <SyntaxHighlighter
                  language="typescript"
                  style={vscDarkPlus}
                  showLineNumbers={true}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    height: '100%',
                    background: '#1e1e1e',
                  }}
                  lineNumberStyle={{
                    minWidth: '3em',
                    paddingRight: '1em',
                    color: '#858585',
                    userSelect: 'none',
                  }}
                >
                  {generatedCode}
                </SyntaxHighlighter>
              </div>
              ) : (
                <div className="w-full h-96 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">💻</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      No code generated yet
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      Describe a component and click Generate<br />
                      to see your React code appear here
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                      <span>✅ TypeScript</span>
                      <span>•</span>
                      <span>✅ Accessible</span>
                      <span>•</span>
                      <span>✅ Responsive</span>
                    </div>
                  </div>
                </div>
              )}
                          
              {generatedCode && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    ✅ <strong>Accessibility features included:</strong> Semantic HTML, ARIA labels, keyboard navigation
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Toast Notification */}
          {showCopied && (
            <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-up z-50">
              <span className="text-xl">✅</span>
              <span className="font-medium">Code copied to clipboard!</span>
            </div>
          )}
          {/* Footer */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Built by {'{Siri Meghana}'} • Powered by OpenAI</p>
          </div>
        </div>
      </div> {/* Close the relative z-10 wrapper */}
    </div> 
  );
}

