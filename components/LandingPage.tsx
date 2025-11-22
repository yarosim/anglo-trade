
import React from 'react';
import { TrendingUp, ShieldCheck, Zap, LineChart, ArrowRight, CheckCircle2, Lock, Activity } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onDemo }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[#020617]/80 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">TradeFlow <span className="text-indigo-400">Pro</span></span>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={onLogin}
              className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={onDemo}
              className="px-5 py-2.5 bg-white text-slate-950 rounded-full text-sm font-bold hover:bg-slate-100 transition-all hover:shadow-lg hover:shadow-white/10"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-40 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wide mb-8 animate-fade-in backdrop-blur-md">
            <Zap className="w-3 h-3" />
            <span>v2.0 Now Live: AI Risk Management</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">Automate Your</span><br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Trading Discipline</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            The professional dashboard that acts as your institutional risk manager. 
            Connect your broker, set hard limits, and let AI validate your setups.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button 
              onClick={onDemo}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 group hover:-translate-y-0.5"
            >
              Launch Demo Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onLogin}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800 text-white rounded-xl font-bold text-lg transition-all backdrop-blur-sm"
            >
              Sign In
            </button>
          </div>

          {/* UI Preview Mockup */}
          <div className="relative max-w-5xl mx-auto rounded-xl bg-slate-900/50 border border-slate-800/60 p-2 shadow-2xl backdrop-blur-sm">
             <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
             <div className="rounded-lg overflow-hidden bg-[#0B0F1A] border border-slate-800">
                {/* Mock Header */}
                <div className="h-10 border-b border-slate-800 flex items-center px-4 gap-2">
                   <div className="flex gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                   </div>
                   <div className="ml-4 h-5 w-64 bg-slate-800/50 rounded-full"></div>
                </div>
                {/* Mock Body Content - Simplified */}
                <div className="p-6 grid grid-cols-3 gap-6 h-[400px]">
                   <div className="col-span-2 space-y-6">
                      <div className="h-64 bg-slate-800/20 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Activity className="w-16 h-16 text-indigo-500/20" />
                        </div>
                        {/* Fake Chart Lines */}
                        <svg className="w-full h-full text-indigo-500/50" viewBox="0 0 100 40" preserveAspectRatio="none">
                           <path d="M0 35 C 20 35, 30 10, 50 20 S 80 30, 100 5" fill="none" stroke="currentColor" strokeWidth="0.5" />
                           <path d="M0 35 C 20 35, 30 10, 50 20 S 80 30, 100 5 V 40 H 0 Z" fill="url(#gradient)" fillOpacity="0.1" />
                           <defs>
                              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="0%" stopColor="currentColor" />
                                 <stop offset="100%" stopColor="transparent" />
                              </linearGradient>
                           </defs>
                        </svg>
                      </div>
                      <div className="flex gap-4">
                         <div className="h-24 flex-1 bg-slate-800/20 rounded-lg border border-slate-800 p-4">
                            <div className="w-8 h-8 bg-emerald-500/20 rounded-full mb-2"></div>
                            <div className="h-4 w-16 bg-slate-700/50 rounded mb-1"></div>
                            <div className="h-6 w-24 bg-slate-700/50 rounded"></div>
                         </div>
                         <div className="h-24 flex-1 bg-slate-800/20 rounded-lg border border-slate-800 p-4">
                            <div className="w-8 h-8 bg-red-500/20 rounded-full mb-2"></div>
                            <div className="h-4 w-16 bg-slate-700/50 rounded mb-1"></div>
                            <div className="h-6 w-24 bg-slate-700/50 rounded"></div>
                         </div>
                      </div>
                   </div>
                   <div className="bg-slate-800/20 rounded-lg border border-slate-800 p-4 space-y-4">
                      <div className="flex justify-between items-center">
                         <div className="h-4 w-20 bg-slate-700/50 rounded"></div>
                         <div className="h-4 w-4 bg-slate-700/50 rounded"></div>
                      </div>
                      {[1,2,3,4].map(i => (
                         <div key={i} className="h-16 bg-slate-900/50 rounded border border-slate-800/50"></div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
          
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Institutional-Grade<br />Risk Guardrails</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Stop blowing up accounts. TradeFlow acts as your external risk manager. 
                Set your daily max loss and risk-per-trade limits. If you tilt, we lock you out.
              </p>
              <ul className="space-y-5">
                {[
                  'Hard stops on daily drawdown (e.g., Max loss $500)', 
                  'Position sizing calculator based on portfolio %', 
                  'AI-verified entry criteria before execution'
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-200">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                       <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-600/20 blur-[80px] rounded-full"></div>
              <div className="relative bg-[#0B0F1A] border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800 rounded-lg">
                       <Lock className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                       <div className="text-sm font-bold text-white">Risk Monitor</div>
                       <div className="text-xs text-slate-500">Real-time Enforcement</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">ACTIVE</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-red-400" />
                      <div>
                         <span className="block text-red-200 font-bold text-sm">Trade Blocked</span>
                         <span className="text-xs text-red-400/80">Risk Limit Exceeded</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono bg-red-500/20 text-red-300 px-2 py-1 rounded">STOP</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-500 uppercase font-bold">Daily P/L</span>
                        <div className="text-xl font-mono text-red-400 mt-1">-$255.00</div>
                     </div>
                     <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-20"><Lock className="w-8 h-8" /></div>
                        <span className="text-xs text-slate-500 uppercase font-bold">Risk Limit</span>
                        <div className="text-xl font-mono text-slate-200 mt-1">$250.00</div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 mb-16 max-w-2xl mx-auto text-lg">
            Start small with paper trading, scale up when you're consistent.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Starter', price: '$29', desc: 'For disciplined beginners', features: ['Manual Trading', 'Basic Risk Rules', 'Paper Trading'] },
              { name: 'Pro', price: '$79', desc: 'For automated execution', features: ['Auto-Trade Enabled', 'AI Signal Analysis', 'Forecasting Module', 'Priority Support'], popular: true },
              { name: 'Elite', price: '$149', desc: 'For institutional power', features: ['Multi-Broker Support', 'API Access', 'Custom Algos', '1-on-1 Strategy Call'] },
            ].map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-3xl border flex flex-col transition-all duration-300 ${plan.popular ? 'bg-slate-900 border-indigo-500 shadow-2xl shadow-indigo-500/10 scale-105 z-10' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wide rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl font-bold text-white tracking-tight">{plan.price}</span>
                  <span className="text-slate-500 font-medium">/mo</span>
                </div>
                <p className="text-slate-400 text-sm mb-8 pb-8 border-b border-slate-800">{plan.desc}</p>
                <ul className="space-y-4 mb-8 flex-1 text-left">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center">
                         <CheckCircle2 className="w-3 h-3 text-indigo-500" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={onDemo} className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
                  Start 7-Day Trial
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-200">TradeFlow Pro</span>
          </div>
          <div className="text-slate-500 text-sm">
            &copy; 2024 TradeFlow Pro. All rights reserved.
          </div>
          <div className="flex gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
