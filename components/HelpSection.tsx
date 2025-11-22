
import React, { useState } from 'react';
import { HelpCircle, Book, MessageSquare, ExternalLink, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { HelpChatbot } from './HelpChatbot';

export const HelpSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'chat'>('faq');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqs = [
    {
      id: '1',
      q: 'How do I connect my broker?',
      a: 'Go to Settings > API Keys. Select your broker (e.g., Alpaca) and enter your API Key and Secret. For live trading, ensure you use your Live credentials.'
    },
    {
      id: '2',
      q: 'What is the "AI Deal Score"?',
      a: 'The AI Deal Score (1-10) represents the confidence level of our Gemini AI model in a specific trade setup, based on technical indicators and market context.'
    },
    {
      id: '3',
      q: 'How does the Daily Loss Cap work?',
      a: 'If your realized losses for the day exceed your set limit (default $250), the system will block any new order entries until the next trading session to prevent emotional trading.'
    },
    {
      id: '4',
      q: 'Can I use this for crypto?',
      a: 'Yes! We support crypto via Alpaca Crypto, Binance, and Coinbase. Use the Market Scanner to find crypto opportunities.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Help & Support</h2>
          <p className="text-slate-400 text-sm">Get answers, tutorials, and expert assistance.</p>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'faq' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <Book className="w-4 h-4" />
            Knowledge Base
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'chat' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <MessageSquare className="w-4 h-4" />
            Live Assistant
          </button>
        </div>
      </div>

      {activeTab === 'faq' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
               {faqs.map((faq) => (
                 <div key={faq.id} className="border-b border-slate-800 last:border-0">
                   <button 
                     onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                     className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/50 transition-colors"
                   >
                     <span className="font-medium text-slate-200">{faq.q}</span>
                     {openFaq === faq.id ? <ChevronUp className="w-4 h-4 text-indigo-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                   </button>
                   {openFaq === faq.id && (
                     <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed animate-fade-in">
                       {faq.a}
                     </div>
                   )}
                 </div>
               ))}
            </div>
            
            <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-xl p-6 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white mb-1">Need Human Support?</h4>
                <p className="text-xs text-slate-400">Our team is available Mon-Fri, 9am-6pm EST.</p>
              </div>
              <a href="mailto:support@govelites.com" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Us
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
               <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                 <ExternalLink className="w-4 h-4 text-indigo-400" />
                 Quick Links
               </h4>
               <ul className="space-y-3">
                 <li><a href="#" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Getting Started Guide</a></li>
                 <li><a href="#" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">API Documentation</a></li>
                 <li><a href="#" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Risk Management 101</a></li>
                 <li><a href="#" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Video Tutorials</a></li>
               </ul>
            </div>
          </div>
        </div>
      ) : (
        <HelpChatbot />
      )}
    </div>
  );
};
