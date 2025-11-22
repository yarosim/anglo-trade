import React, { useState, useEffect } from 'react';
import { TradeSignal } from '../types';
import { analyzeSignal } from '../services/geminiService';
import { X, Bot, Loader2 } from 'lucide-react';

interface SignalAnalysisModalProps {
  signal: TradeSignal | null;
  onClose: () => void;
}

export const SignalAnalysisModal: React.FC<SignalAnalysisModalProps> = ({ signal, onClose }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (signal) {
      setLoading(true);
      setAnalysis(null);
      analyzeSignal(signal).then((result) => {
        setAnalysis(result);
        setLoading(false);
      });
    }
  }, [signal]);

  if (!signal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-semibold text-white">Gemini Signal Analysis</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${
              signal.side === 'long' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
            }`}>
              {signal.side.toUpperCase()}
            </span>
            <h4 className="text-2xl font-bold text-white">{signal.ticker}</h4>
            <p className="text-sm text-slate-400 mt-1">
              Entry: ${signal.entry} | Stop: ${signal.stop}
            </p>
          </div>

          <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 min-h-[100px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-24 text-slate-500 gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                <span className="text-sm">Analyzing market context...</span>
              </div>
            ) : (
              <p className="text-slate-300 leading-relaxed">
                {analysis}
              </p>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-850 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};