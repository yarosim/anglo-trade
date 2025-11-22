
import React, { useState } from 'react';
import { TechnicalIndicator } from '../types';
import { analyzeTechnicalContext } from '../services/geminiService';
import { generateMockTechnicalIndicator } from '../services/mockData';
import { LineChart, Activity, ArrowUp, ArrowDown, Minus, Sparkles, Loader2, Search, BarChart3, FileText } from 'lucide-react';

interface TechnicalAnalysisProps {
  indicators: TechnicalIndicator[];
}

export const TechnicalAnalysis: React.FC<TechnicalAnalysisProps> = ({ indicators: initialIndicators }) => {
  const [indicators, setIndicators] = useState<TechnicalIndicator[]>(initialIndicators);
  const [selectedTicker, setSelectedTicker] = useState<string>(initialIndicators[0]?.ticker || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const currentData = indicators.find(i => i.ticker === selectedTicker);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    const ticker = searchTerm.toUpperCase();
    const existing = indicators.find(i => i.ticker === ticker);
    
    if (existing) {
      setSelectedTicker(ticker);
    } else {
      // Generate dynamic data for new ticker so AI has context
      const newData = generateMockTechnicalIndicator(ticker);
      setIndicators(prev => [...prev, newData]);
      setSelectedTicker(ticker);
    }
    setSearchTerm('');
    setAnalysis(null);
  };

  const handleAnalyze = async () => {
    if (!currentData) return;
    setLoading(true);
    setAnalysis(null);
    const result = await analyzeTechnicalContext(currentData);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-xl border border-slate-800">
        <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <LineChart className="w-6 h-6 text-indigo-400" />
            Technical Strategist
            </h2>
            <p className="text-sm text-slate-400 mt-1">Select a stock to generate an AI-powered profitability report.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
           <form onSubmit={handleSearch} className="relative w-full sm:w-64">
             <input 
               type="text" 
               placeholder="Search Ticker (e.g. GME)..." 
               className="pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none w-full"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
             <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
           </form>
        </div>
      </div>

      {/* Quick Select Tickers */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {indicators.slice(-6).map(item => (
            <button
            key={item.ticker}
            onClick={() => {
                setSelectedTicker(item.ticker);
                setAnalysis(null);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-all border ${
                selectedTicker === item.ticker 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/20' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'
            }`}
            >
            {item.ticker}
            </button>
        ))}
      </div>

      {currentData ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Raw Data Cards */}
          <div className="space-y-4">
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BarChart3 className="w-24 h-24 text-white" />
               </div>
              <div className="text-slate-400 text-xs mb-1 uppercase font-bold tracking-wider">Market Price</div>
              <div className="text-4xl font-bold text-white mb-2">${currentData.price.toFixed(2)}</div>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${
                currentData.trend === 'uptrend' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 
                currentData.trend === 'downtrend' ? 'bg-red-950 text-red-400 border border-red-900' : 'bg-slate-800 text-slate-300'
              }`}>
                {currentData.trend === 'uptrend' && <ArrowUp className="w-3 h-3" />}
                {currentData.trend === 'downtrend' && <ArrowDown className="w-3 h-3" />}
                {currentData.trend === 'sideways' && <Minus className="w-3 h-3" />}
                <span className="uppercase">{currentData.trend}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">RSI (14)</div>
                <div className={`text-xl font-bold ${currentData.rsi_14 > 70 || currentData.rsi_14 < 30 ? 'text-orange-400' : 'text-white'}`}>
                    {currentData.rsi_14.toFixed(1)}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Momentum</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">ATR</div>
                <div className="text-xl font-bold text-white">{currentData.atr.toFixed(2)}</div>
                <div className="text-[10px] text-slate-500 mt-1">Volatility</div>
                </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-4">
                 <div className="text-slate-400 text-xs uppercase font-bold">Key Levels (EMAs)</div>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between items-center">
                   <span className="text-xs text-indigo-300 font-medium">9 EMA</span>
                   <span className="text-sm font-mono text-white">${currentData.ema_9.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-xs text-blue-300 font-medium">20 EMA</span>
                   <span className="text-sm font-mono text-white">${currentData.ema_20.toFixed(2)}</span>
                 </div>
                 <div className="w-full h-px bg-slate-800 my-2"></div>
                 <div className="flex justify-between items-center">
                   <span className="text-xs text-purple-300 font-medium">200 SMA</span>
                   <span className="text-sm font-mono text-white">${currentData.sma_200.toFixed(2)}</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Column: AI Analysis Panel */}
          <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 flex flex-col shadow-xl">
            <div className="p-6 border-b border-slate-800 bg-slate-950/30 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">AI Strategy Report</h3>
                        <p className="text-xs text-slate-500">Generative analysis based on live indicators</p>
                    </div>
                </div>
                {!loading && !analysis && (
                    <button 
                    onClick={handleAnalyze}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                    >
                    <Sparkles className="w-3 h-3" />
                    Generate Report
                    </button>
                )}
            </div>
            
            <div className="flex-1 p-6 min-h-[400px] relative">
              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-4 bg-slate-900/50 backdrop-blur-sm z-10">
                  <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
                  <div className="text-center">
                      <p className="text-sm font-medium text-white">Analyzing Market Structure...</p>
                      <p className="text-xs text-slate-500 mt-1">Calculating risk/reward probabilities</p>
                  </div>
                </div>
              ) : analysis ? (
                <div className="prose prose-invert prose-sm max-w-none">
                    <div className="whitespace-pre-wrap font-sans text-slate-300 leading-relaxed">
                        {analysis}
                    </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/50 p-8">
                  <FileText className="w-12 h-12 mb-4 opacity-20" />
                  <h4 className="text-slate-400 font-medium mb-1">No Report Generated</h4>
                  <p className="text-xs max-w-xs mx-auto">Click the generate button to get a deep-dive analysis on {currentData.ticker} including probability and stop-loss levels.</p>
                </div>
              )}
            </div>

            {analysis && (
                <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end">
                    <button 
                        onClick={handleAnalyze}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                        <Sparkles className="w-3 h-3" /> Regenerate Analysis
                    </button>
                </div>
            )}
          </div>
        </div>
      ) : (
         <div className="flex flex-col items-center justify-center h-96 text-slate-500 bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-800">
            <Search className="w-12 h-12 mb-4 opacity-20" />
            <p>Search for a ticker to begin analysis</p>
         </div>
      )}
    </div>
  );
};
