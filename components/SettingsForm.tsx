
import React, { useState } from 'react';
import { UserSettings, TradingBot } from '../types';
import { mockBots } from '../services/mockData';
import { CreateBotModal } from './CreateBotModal';
import { Save, AlertTriangle, Key, Bot, Shield, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';

interface SettingsFormProps {
  settings: UserSettings;
  onSave: (newSettings: UserSettings) => void;
}

const PROVIDERS = {
  brokers: [
    { id: 'alpaca', name: 'Alpaca', desc: 'Stocks & Crypto API', fields: ['apiKey', 'secretKey'] },
    { id: 'ibkr', name: 'Interactive Brokers', desc: 'Full market access', fields: ['apiKey', 'baseUrl'] },
    { id: 'binance', name: 'Binance', desc: 'Global crypto exchange', fields: ['apiKey', 'secretKey'] },
    { id: 'coinbase', name: 'Coinbase', desc: 'US Crypto Exchange', fields: ['apiKey', 'secretKey'] },
  ],
  marketData: [
    { id: 'polygon', name: 'Polygon.io', desc: 'Stocks, options, forex', fields: ['apiKey'] },
    { id: 'alpha_vantage', name: 'Alpha Vantage', desc: 'Market data API', fields: ['apiKey'] },
    { id: 'finnhub', name: 'Finnhub', desc: 'Real-time stock API', fields: ['apiKey'] },
  ],
  news: [
    { id: 'benzinga', name: 'Benzinga', desc: 'Financial news', fields: ['apiKey'] },
    { id: 'newsapi', name: 'NewsAPI.org', desc: 'Global headlines', fields: ['apiKey'] },
  ]
};

export const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSave }) => {
  const [formData, setFormData] = useState<UserSettings>(settings);
  const [isDirty, setIsDirty] = useState(false);
  const [activeTab, setActiveTab] = useState<'risk' | 'strategy' | 'api'>('strategy');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [bots, setBots] = useState<TradingBot[]>(mockBots);
  const [showCreateBotModal, setShowCreateBotModal] = useState(false);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  const validate = (data: UserSettings) => {
    const newErrors: Record<string, string> = {};
    if (data.daily_max_loss <= 0) newErrors.daily_max_loss = "Max loss must be positive";
    if (data.risk_per_trade <= 0) newErrors.risk_per_trade = "Risk per trade must be positive";
    if (data.max_open_trades <= 0 || !Number.isInteger(data.max_open_trades)) newErrors.max_open_trades = "Must be a positive integer";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simple validation for API keys
  const isValidKey = (providerId: string, key: string) => {
    if (!key) return true; // Empty is considered valid (not configured)
    if (key.length < 8) return false; // Too short
    if (providerId === 'alpaca' && !key.startsWith('PK') && !key.startsWith('AK')) return false;
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let newData = { ...formData };
    if (name.startsWith('api_config.')) {
      const key = name.split('.')[1];
      newData = {
        ...newData,
        api_config: {
          ...newData.api_config,
          [key]: value
        }
      };
    } else {
      newData = {
        ...newData,
        [name]: type === 'checkbox' ? checked : (type === 'number' ? (parseFloat(value) || 0) : value)
      };
    }
    
    setFormData(newData);
    setIsDirty(true);
    
    // Real-time validation for the field being changed
    if (type === 'number') {
       if (parseFloat(value) < 0) {
          setErrors(prev => ({ ...prev, [name]: 'Value cannot be negative' }));
       } else {
          setErrors(prev => {
            const newErrs = { ...prev };
            delete newErrs[name];
            return newErrs;
          });
       }
    }
  };

  const handleProviderChange = (providerId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      api_config: {
        ...prev.api_config,
        providers: {
          ...prev.api_config.providers,
          [providerId]: {
            ...prev.api_config.providers[providerId],
            [field]: value
          }
        }
      }
    }));
    setIsDirty(true);
  };

  const toggleBot = (botId: string) => {
    setBots(prev => prev.map(b => b.id === botId ? { ...b, active: !b.active } : b));
    setIsDirty(true);
  };

  const handleCreateBot = (newBot: TradingBot) => {
    setBots(prev => [newBot, ...prev]);
    setShowCreateBotModal(false);
    setIsDirty(true); // Mark as dirty so user saves the new bot list
  };

  const toggleSecretVisibility = (field: string) => {
    setShowSecrets(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(formData)) {
      onSave(formData);
      setIsDirty(false);
    }
  };

  const renderProviderCard = (provider: { id: string; name: string; desc: string; fields: string[] }) => {
    const config = formData.api_config.providers[provider.id] || {};
    const isConfigured = config.apiKey && config.apiKey.length > 5;

    return (
      <div key={provider.id} className="bg-slate-950 border border-slate-800 p-5 rounded-xl transition-all hover:border-slate-700">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h5 className="text-white font-bold text-sm flex items-center gap-2">
              {provider.name}
              {isConfigured && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
            </h5>
            <p className="text-xs text-slate-500 mt-0.5">{provider.desc}</p>
          </div>
          <div className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-500' : 'bg-slate-700'}`} />
        </div>

        <div className="space-y-3">
          {provider.fields.map(field => {
            const value = config[field as keyof typeof config] || '';
            const isValid = field === 'apiKey' ? isValidKey(provider.id, value) : true;
            
            return (
              <div key={field}>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-wider">
                  {field === 'baseUrl' ? 'Base URL' : field.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="relative">
                  <input 
                    type={field === 'secretKey' && !showSecrets[`${provider.id}_${field}`] ? "password" : "text"}
                    value={value}
                    onChange={(e) => handleProviderChange(provider.id, field, e.target.value)}
                    placeholder={field === 'baseUrl' ? 'https://api.example.com' : 'Enter key...'}
                    className={`w-full bg-slate-900 border rounded px-3 py-2 text-xs text-white focus:ring-1 outline-none transition-colors
                      ${!isValid && value.length > 0 ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:ring-indigo-500'}
                    `}
                  />
                  {field === 'secretKey' && (
                    <button 
                      type="button"
                      onClick={() => toggleSecretVisibility(`${provider.id}_${field}`)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 p-1"
                    >
                      {showSecrets[`${provider.id}_${field}`] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </button>
                  )}
                  {!isValid && value.length > 0 && field === 'apiKey' && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                       <XCircle className="w-4 h-4 text-red-500" />
                    </div>
                  )}
                </div>
                {!isValid && value.length > 0 && field === 'apiKey' && (
                  <p className="text-[10px] text-red-500 mt-1">Invalid key format for {provider.name}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">System Configuration</h2>
            <p className="text-slate-400 text-sm mt-1">Manage risk rules, execution strategy, and external APIs.</p>
          </div>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('risk')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'risk' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              <Shield className="w-4 h-4" />
              Risk
            </button>
            <button 
              onClick={() => setActiveTab('strategy')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'strategy' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              <Bot className="w-4 h-4" />
              Strategy Hub
            </button>
            <button 
              onClick={() => setActiveTab('api')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'api' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              <Key className="w-4 h-4" />
              API Keys
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 min-h-[500px]">
          
          {/* RISK TAB */}
          {activeTab === 'risk' && (
            <div className="space-y-8 animate-fade-in">
               <div className="flex items-center justify-between bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div>
                  <label className="block text-sm font-medium text-white">Auto-Trade Master Switch</label>
                  <p className="text-xs text-slate-500">Enable/Disable all automated order execution.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="auto_trade_enabled"
                    checked={formData.auto_trade_enabled}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Guardrails
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Daily Max Loss ($)</label>
                    <input
                      type="number"
                      name="daily_max_loss"
                      value={formData.daily_max_loss}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.daily_max_loss ? 'border-red-500' : 'border-slate-700'}`}
                    />
                    {errors.daily_max_loss && <p className="text-xs text-red-500 mt-1">{errors.daily_max_loss}</p>}
                    <p className="text-xs text-slate-600 mt-1">Trading stops if realized P/L hits this loss.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Max Open Trades</label>
                    <input
                      type="number"
                      name="max_open_trades"
                      value={formData.max_open_trades}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.max_open_trades ? 'border-red-500' : 'border-slate-700'}`}
                    />
                     {errors.max_open_trades && <p className="text-xs text-red-500 mt-1">{errors.max_open_trades}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Risk Per Trade ($)</label>
                    <input
                      type="number"
                      name="risk_per_trade"
                      value={formData.risk_per_trade}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.risk_per_trade ? 'border-red-500' : 'border-slate-700'}`}
                    />
                    {errors.risk_per_trade && <p className="text-xs text-red-500 mt-1">{errors.risk_per_trade}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STRATEGY HUB TAB */}
          {activeTab === 'strategy' && (
            <div className="space-y-8 animate-fade-in">
               <div className="space-y-3">
                <button 
                  type="button"
                  onClick={() => setShowCreateBotModal(true)}
                  className="w-full py-3 bg-indigo-600/20 border border-indigo-500/50 text-indigo-300 rounded-lg text-sm font-medium hover:bg-indigo-600/30 transition-colors flex items-center justify-center gap-2"
                >
                  Create New Bot
                </button>
                {bots.map(bot => (
                  <div key={bot.id} className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium">{bot.name}</h4>
                      <p className="text-slate-500 text-xs">{bot.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-bold ${bot.active ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {bot.active ? 'Active' : 'Inactive'}
                      </span>
                      <button 
                        type="button"
                        onClick={() => toggleBot(bot.id)}
                        className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${bot.active ? 'bg-slate-800 text-slate-300' : 'bg-indigo-600 text-white'}`}
                      >
                        Toggle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* API MANAGEMENT TAB */}
          {activeTab === 'api' && (
            <div className="space-y-8 animate-fade-in">
               <div className="bg-indigo-900/20 border border-indigo-500/20 p-4 rounded-xl mb-6 flex items-start gap-3">
                 <Shield className="w-5 h-5 text-indigo-400 mt-0.5" />
                 <div>
                   <h4 className="text-white font-medium text-sm">Secure Key Storage</h4>
                   <p className="text-slate-400 text-xs mt-1">
                     Your API keys are encrypted and stored locally. They are never transmitted to our servers.
                     We support all major brokers and data providers.
                   </p>
                 </div>
               </div>

               {/* Brokers Section */}
               <div className="space-y-4">
                 <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800 pb-2">Brokers & Exchanges</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {PROVIDERS.brokers.map(provider => renderProviderCard(provider))}
                 </div>
               </div>

               {/* Market Data Section */}
               <div className="space-y-4">
                 <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800 pb-2">Market Data</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {PROVIDERS.marketData.map(provider => renderProviderCard(provider))}
                 </div>
               </div>

               {/* News Section */}
               <div className="space-y-4">
                 <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800 pb-2">News & Sentiment</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {PROVIDERS.news.map(provider => renderProviderCard(provider))}
                 </div>
               </div>
            </div>
          )}

          <div className="pt-6 border-t border-slate-800 mt-8 flex justify-end sticky bottom-0 bg-slate-900 py-4">
             <button 
              type="submit"
              disabled={!isDirty || Object.keys(errors).length > 0}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                isDirty && Object.keys(errors).length === 0
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
             >
               <Save className="w-4 h-4" />
               Save Changes
             </button>
          </div>
        </form>
      </div>
      
      {showCreateBotModal && (
        <CreateBotModal onClose={() => setShowCreateBotModal(false)} onCreate={handleCreateBot} />
      )}
    </div>
  );
};
