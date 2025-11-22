import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AutomationRule } from '../types';
import { Zap, Plus, Bell, ShieldAlert, TrendingUp, Mail, Sparkles, Loader2, Check } from 'lucide-react';

interface AutomationProps {
  rules: AutomationRule[];
}

export const Automation: React.FC<AutomationProps> = ({ rules: initialRules }) => {
  const [rules, setRules] = useState(initialRules);
  const [isCreating, setIsCreating] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [newRule, setNewRule] = useState<Partial<AutomationRule>>({
    trigger: 'trade_closed',
    action: 'email_alert',
    name: 'New Campaign',
    active: true
  });
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const generateEmailContent = async () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return;

    setGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Write a professional email template for a trader. 
      Context: ${newRule.trigger === 'pl_threshold' ? 'Daily Max Loss Hit' : 'Trade Closed Successfully'}. 
      Audience: Myself (The Trader). 
      Goal: Encourage discipline and review.
      Return JSON format: { "subject": "...", "body": "..." }`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      
      const result = JSON.parse(response.text || '{}');
      setEmailSubject(result.subject || "Trading Alert");
      setEmailBody(result.body || "Please review your recent activity.");
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Smart Automations & Campaigns</h2>
          <p className="text-sm text-slate-400">Configure email sequences and automated risk actions.</p>
        </div>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Workflow
        </button>
      </div>

      {isCreating && (
        <div className="bg-slate-900 border border-indigo-500/50 rounded-xl p-6 animate-fade-in">
          <h3 className="font-semibold text-white mb-4">Configure Automated Campaign</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Trigger Event</label>
              <select 
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                value={newRule.trigger}
                onChange={(e) => setNewRule({...newRule, trigger: e.target.value as any})}
              >
                <option value="trade_closed">Trade Closed</option>
                <option value="pl_threshold">P/L Threshold Hit</option>
                <option value="news_event">High Impact News</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Action</label>
              <select 
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                value={newRule.action}
                onChange={(e) => setNewRule({...newRule, action: e.target.value as any})}
              >
                <option value="email_alert">Send Email Campaign</option>
                <option value="close_position">Emergency Close</option>
                <option value="log_journal">Log to Journal</option>
              </select>
            </div>
          </div>

          {newRule.action === 'email_alert' && (
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 mb-6">
              <div className="flex justify-between items-center mb-2">
                 <label className="text-sm font-medium text-indigo-400 flex items-center gap-2">
                   <Mail className="w-4 h-4" /> Email Template
                 </label>
                 <button 
                   onClick={generateEmailContent}
                   disabled={generating}
                   className="text-xs flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
                 >
                   {generating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                   Generate with AI
                 </button>
              </div>
              <input 
                type="text" 
                placeholder="Subject Line..." 
                className="w-full bg-slate-900 border border-slate-700 rounded mb-2 p-2 text-sm text-white"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
              <textarea 
                rows={3} 
                placeholder="Email body content..." 
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
              />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button onClick={() => setIsCreating(false)} className="px-4 py-2 text-slate-400 hover:text-white text-sm">Cancel</button>
            <button 
              onClick={() => {
                setRules([...rules, { ...newRule, id: `r-${Date.now()}`, condition: 'User Configured', active: true } as AutomationRule]);
                setIsCreating(false);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm"
            >
              Save Workflow
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {rules.map((rule) => (
          <div key={rule.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-between group hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${
                rule.trigger === 'pl_threshold' ? 'bg-red-900/20 text-red-400' : 
                rule.trigger === 'news_event' ? 'bg-blue-900/20 text-blue-400' : 
                'bg-emerald-900/20 text-emerald-400'
              }`}>
                {rule.trigger === 'pl_threshold' && <ShieldAlert className="w-5 h-5" />}
                {rule.trigger === 'news_event' && <Bell className="w-5 h-5" />}
                {rule.trigger === 'price_level' && <TrendingUp className="w-5 h-5" />}
                {rule.trigger === 'trade_closed' && <Check className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-white">{rule.name}</h3>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${rule.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                    {rule.active ? 'Active' : 'Paused'}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                  <span className="font-mono bg-slate-950 px-1.5 rounded border border-slate-800">IF {rule.trigger}</span>
                  <span className="text-slate-600">THEN</span>
                  <span className="font-mono bg-slate-950 px-1.5 rounded border border-slate-800 text-indigo-300">{rule.action.replace('_', ' ').toUpperCase()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={rule.active} className="sr-only peer" readOnly />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};