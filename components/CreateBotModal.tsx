
import React, { useState } from 'react';
import { X, Bot, Layers, Zap } from 'lucide-react';
import { TradingBot } from '../types';

interface CreateBotModalProps {
  onClose: () => void;
  onCreate: (bot: TradingBot) => void;
}

export const CreateBotModal: React.FC<CreateBotModalProps> = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    strategy: 'Trend Following',
    riskCap: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBot: TradingBot = {
      id: `bot-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      active: false, // Default to inactive
      details: {
        strategies: [formData.strategy],
        frequency: 'Custom',
        instruments: ['Custom List']
      },
      risk: formData.riskCap ? {
          daily_loss_cap: parseFloat(formData.riskCap),
          description: `Custom risk cap of $${formData.riskCap}`
      } : undefined
    };
    onCreate(newBot);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-400" />
            Create Custom Strategy
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Bot Name</label>
            <input 
              required
              type="text" 
              placeholder="e.g., Alpha Scalper V1"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Core Logic</label>
            <div className="grid grid-cols-2 gap-3">
              {['Trend Following', 'Mean Reversion', 'Breakout', 'Arbitrage'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({...formData, strategy: type})}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all text-left flex items-center gap-2 ${
                    formData.strategy === type 
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Description & Rules</label>
            <textarea 
              required
              rows={3}
              placeholder="Describe entry/exit conditions..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-300 mb-1">Daily Risk Cap ($)</label>
             <input 
               type="number" 
               placeholder="Optional override (e.g. 500)"
               className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
               value={formData.riskCap}
               onChange={e => setFormData({...formData, riskCap: e.target.value})}
             />
          </div>

          <div className="pt-2 flex gap-3">
             <button 
               type="button" 
               onClick={onClose}
               className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-colors"
             >
               Cancel
             </button>
             <button 
               type="submit" 
               className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
             >
               <Zap className="w-4 h-4" />
               Deploy Bot
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};
