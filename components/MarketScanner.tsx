
import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles, ArrowUpRight, ArrowDownRight, Activity, Loader2, BarChart2 } from 'lucide-react';
import { generateMarketScanResults } from '../services/mockData';
import { analyzeMarketScan } from '../services/geminiService';
import { MarketScanResult } from '../types';

export const MarketScanner: React.FC = () => {
  const [results, setResults] = useState<MarketScanResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  
  // Filters
  const [minPrice, setMinPrice] = useState(10);
  const [minVol, setMinVol] = useState(500000);
  const [sector, setSector] = useState('All');

  const runScan = () => {
    setLoading(true);
    // Simulate API latency
    setTimeout(() => {
      const data = generateMarketScanResults(15); // Generate 15 results
      setResults(data);
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    runScan();
  }, []);

  const handleAIAnalysis = async (index: number) => {
    const stock = results[index];
    setAnalyzingId(stock.ticker);
    
    const analysis = await analyzeMarketScan(stock);
    
    setResults(prev => prev.map((item, i) => 
      i === index ? { ...item, ai_rating: analysis.rating, ai_reason: analysis.reason } : item
    ));
    setAnalyzingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Scanner Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
           <div>
             <h2 className="text-xl font-bold text-white flex items-center gap-2">
               <Activity className="w-6 h-6 text-indigo-400" />
               Live Market Scanner
             </h2>
             <p className="text-slate-400 text-sm mt-1">Real-time opportunity detection with AI validation.</p>
           </div>
           <button 
             onClick={runScan}
             disabled={loading}
             className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
           >
             {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
             Run Scan
           </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-500 uppercase">Min Price ($)</label>
             <input 
               type="number" 
               value={minPrice} 
               onChange={(e) => setMinPrice(Number(e.target.value))}
               className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
             />
           </div>
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-500 uppercase">Min Volume</label>
             <input 
               type="number" 
               value={minVol} 
               onChange={(e) => setMinVol(Number(e.target.value))}
               className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
             />
           </div>
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-500 uppercase">Sector</label>
             <select 
               value={sector} 
               onChange={(e) => setSector(e.target.value)}
               className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
             >
               <option value="All">All Sectors</option>
               <option value="Tech">Technology</option>
               <option value="Finance">Finance</option>
               <option value="Energy">Energy</option>
             </select>
           </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-950 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Ticker</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">% Change</th>
                    <th className="px-6 py-4">Volume</th>
                    <th className="px-6 py-4">RVOL</th>
                    <th className="px-6 py-4">Pattern Setup</th>
                    <th className="px-6 py-4 text-right">AI Conviction</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-800/50">
                  {results.map((stock, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center font-bold text-white text-xs">
                            {stock.ticker.substring(0,1)}
                          </div>
                          <div>
                            <div className="font-bold text-white">{stock.ticker}</div>
                            <div className="text-[10px] text-slate-500">{stock.sector}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-200">${stock.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1 font-bold ${stock.change_percent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {stock.change_percent >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {stock.change_percent}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{(stock.volume / 1000000).toFixed(1)}M</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${stock.relative_volume > 2 ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400'}`}>
                           {stock.relative_volume}x
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300">
                          <BarChart2 className="w-3 h-3" />
                          {stock.setup}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {stock.ai_rating ? (
                           <div className="flex flex-col items-end">
                             <div className={`text-lg font-bold ${stock.ai_rating >= 7 ? 'text-emerald-400' : stock.ai_rating >= 4 ? 'text-yellow-400' : 'text-red-400'}`}>
                               {stock.ai_rating}/10
                             </div>
                             <div className="text-[10px] text-slate-500 max-w-[150px] truncate" title={stock.ai_reason}>
                               {stock.ai_reason}
                             </div>
                           </div>
                        ) : (
                           <button 
                             onClick={() => handleAIAnalysis(idx)}
                             disabled={analyzingId === stock.ticker}
                             className="ml-auto flex items-center gap-1.5 text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all"
                           >
                             {analyzingId === stock.ticker ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                             Analyze
                           </button>
                        )}
                      </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
