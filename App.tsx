
import React, { useState, useEffect, Component, ErrorInfo } from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Settings, 
  Bell, 
  TrendingUp,
  Sparkles,
  LogOut,
  LineChart,
  CheckCircle,
  XCircle,
  Menu,
  X,
  Zap,
  Lock,
  Radar,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { PLChart } from './components/PLChart';
import { SettingsForm } from './components/SettingsForm';
import { SignalAnalysisModal } from './components/SignalAnalysisModal';
import { LandingPage } from './components/LandingPage';
import { Forecasting } from './components/Forecasting';
import { Automation } from './components/Automation';
import { Billing } from './components/Billing';
import { Auth } from './components/Auth';
import { NewsFeed } from './components/NewsFeed';
import { TechnicalAnalysis } from './components/TechnicalAnalysis';
import { MarketScanner } from './components/MarketScanner';
import { RiskDisclosure } from './components/RiskDisclosure';
import { HelpSection } from './components/HelpSection';
import { 
  mockOrders, 
  mockPLData, 
  mockSettings, 
  mockSignals, 
  mockForecastData, 
  mockAutomationRules,
  mockUser,
  mockNews,
  mockTechnicalIndicators
} from './services/mockData';
import { TradeSignal, View, UserSettings, UserProfile, Toast } from './types';

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Basic Error Boundary for Production Readiness
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4 text-center">
          <div className="max-w-md">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Application Error</h1>
            <p className="text-slate-400 mb-6">We encountered an unexpected issue. Our team has been notified.</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors font-medium">
              Reload Dashboard
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

enum AppState {
  LANDING,
  AUTH,
  APP
}

// Role-Based Access Configuration
const PLAN_ACCESS: Record<string, View[]> = {
  'free': [View.DASHBOARD, View.SETTINGS, View.BILLING, View.HELP],
  'starter': [View.DASHBOARD, View.SIGNALS, View.ORDERS, View.SETTINGS, View.BILLING, View.HELP],
  'pro': [View.DASHBOARD, View.SIGNALS, View.SCANNER, View.ORDERS, View.FORECAST, View.ANALYSIS, View.SETTINGS, View.BILLING, View.HELP],
  'elite': [View.DASHBOARD, View.SIGNALS, View.SCANNER, View.ORDERS, View.FORECAST, View.ANALYSIS, View.AUTOMATION, View.SETTINGS, View.BILLING, View.HELP]
};

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);
  
  // Load settings from local storage or use mock
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('tf_settings');
    return saved ? JSON.parse(saved) : mockSettings;
  });
  
  const [signals, setSignals] = useState<TradeSignal[]>(() => {
    const saved = localStorage.getItem('tf_signals');
    return saved ? JSON.parse(saved) : mockSignals;
  });

  const [selectedSignal, setSelectedSignal] = useState<TradeSignal | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('tf_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('tf_signals', JSON.stringify(signals));
  }, [signals]);

  // Toast Timer
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handleSaveSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    showToast('Configuration saved successfully', 'success');
  };

  const handleLoginSuccess = () => {
    setCurrentUser(mockUser);
    setAppState(AppState.APP);
  };

  const handleLogout = () => {
    setAppState(AppState.LANDING);
    setCurrentUser(null);
    setCurrentView(View.DASHBOARD);
  };

  // Add a new signal periodically
  useEffect(() => {
    if (appState !== AppState.APP) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.85) { 
        const newSignal: TradeSignal = {
          id: `s-${Date.now()}`,
          user_id: settings.user_id,
          src: Math.random() > 0.5 ? 'scanner' : 'tradingview',
          ticker: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'COIN', 'NVDA'][Math.floor(Math.random() * 7)],
          side: Math.random() > 0.5 ? 'long' : 'short',
          entry: Math.floor(Math.random() * 200) + 100,
          stop: Math.floor(Math.random() * 200) + 90,
          reason: 'AI Pattern Recognition: Bull Flag',
          rvol: parseFloat((Math.random() * 5).toFixed(1)),
          received_at: new Date().toISOString(),
        };
        setSignals(prev => [newSignal, ...prev]);
        showToast(`New Opportunity: ${newSignal.ticker}`, 'success');
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [settings.user_id, appState]);

  // Helper to check access
  const hasAccess = (view: View) => {
    if (!currentUser) return false;
    const allowedViews = PLAN_ACCESS[currentUser.plan] || PLAN_ACCESS['free'];
    return allowedViews.includes(view);
  };

  // Routing Logic
  if (appState === AppState.LANDING) {
    return <LandingPage onLogin={() => setAppState(AppState.AUTH)} onDemo={handleLoginSuccess} />;
  }

  if (appState === AppState.AUTH) {
    return <Auth onLogin={handleLoginSuccess} onDemo={handleLoginSuccess} />;
  }

  const StatCard = ({ title, value, subtext, type = 'neutral' }: { title: string, value: string, subtext?: string, type?: 'success' | 'danger' | 'neutral' }) => (
    <div className="glass-panel p-6 rounded-xl border border-slate-800/50 hover:border-indigo-500/30 transition-all duration-300 group">
      <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2 group-hover:text-slate-300 transition-colors">{title}</h3>
      <div className="flex items-end justify-between">
        <span className={`text-3xl font-bold tracking-tight ${
          type === 'success' ? 'text-emerald-400' : 
          type === 'danger' ? 'text-red-400' : 'text-white'
        }`}>
          {value}
        </span>
        {subtext && <span className="text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded-md border border-slate-800">{subtext}</span>}
      </div>
    </div>
  );

  const NavItem = ({ view, icon: Icon, label }: { view: View, icon: React.ElementType, label: string }) => {
    const locked = !hasAccess(view);
    return (
      <button 
        onClick={() => {
          setCurrentView(view);
          setIsMobileMenuOpen(false);
        }}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
          currentView === view 
            ? 'bg-indigo-500/10 text-indigo-400 border-r-2 border-indigo-500' 
            : 'text-slate-400 hover:bg-slate-900 hover:text-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${currentView === view ? 'text-indigo-400' : 'text-slate-500 group-hover:text-white'}`} />
          <span className="font-medium">{label}</span>
        </div>
        {locked && <Lock className="w-3 h-3 text-slate-600" />}
      </button>
    );
  };

  const FeatureGate = ({ children }: { children?: React.ReactNode }) => {
    if (hasAccess(currentView)) return <>{children}</>;

    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-fade-in">
        <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-800">
          <Lock className="w-10 h-10 text-indigo-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Feature Locked</h2>
        <p className="text-slate-400 max-w-md mb-8">
          This advanced tool is available on higher tier plans. Upgrade your subscription to unlock full access.
        </p>
        <button 
          onClick={() => setCurrentView(View.BILLING)}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
        >
          Upgrade Plan
        </button>
      </div>
    );
  };

  return (
    <ErrorBoundary>
      {showRiskModal && <RiskDisclosure onAccept={() => setShowRiskModal(false)} />}
      
      <div className="flex min-h-screen bg-slate-950 font-sans text-slate-200 relative selection:bg-indigo-500/30">
        {/* Ambient Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/10 rounded-full blur-[120px]" />
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 glass-panel border-b border-slate-800 z-50 px-4 flex items-center justify-between">
           <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-white">AlgoTrade Pro</span>
           </div>
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-400 hover:text-white p-2">
             {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
           </button>
        </div>

        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-950/95 backdrop-blur-xl border-r border-slate-800/60 z-40 transform transition-transform duration-300 ease-in-out flex flex-col
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:top-0
        `}>
          <div className="h-20 flex items-center px-6 border-b border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-white">AlgoTrade</span>
                <span className="text-[10px] text-indigo-400 font-medium tracking-wider uppercase">Pro Terminal</span>
              </div>
            </div>
          </div>

          <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
            <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Analytics</div>
            <NavItem view={View.DASHBOARD} icon={LayoutDashboard} label="Overview" />
            <NavItem view={View.FORECAST} icon={Sparkles} label="Forecast AI" />
            <NavItem view={View.ANALYSIS} icon={LineChart} label="Technical Strategist" />
            
            <div className="px-4 mb-2 mt-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Execution</div>
            <NavItem view={View.SIGNALS} icon={Activity} label="Signals Feed" />
            <NavItem view={View.SCANNER} icon={Radar} label="Market Scanner" />
            <NavItem view={View.AUTOMATION} icon={Zap} label="Automation" />
            
            <div className="px-4 mb-2 mt-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">System</div>
            <NavItem view={View.SETTINGS} icon={Settings} label="Settings" />
            <NavItem view={View.BILLING} icon={CheckCircle} label="Billing" />
            <NavItem view={View.HELP} icon={HelpCircle} label="Help & Support" />
            
            <button 
              onClick={() => setShowRiskModal(true)}
              className="w-full flex items-center gap-3 px-4 py-3 mt-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
               <ShieldAlert className="w-5 h-5" />
               <span className="font-medium">Risk & Legal</span>
            </button>
          </nav>

          <div className="p-4 border-t border-slate-800/60 bg-slate-900/30">
             <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
               <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                 {currentUser?.name.charAt(0)}
               </div>
               <div className="flex-1 overflow-hidden">
                 <p className="text-sm font-medium text-white truncate">{currentUser?.name}</p>
                 <p className="text-xs text-slate-500 capitalize flex items-center gap-1">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                   {currentUser?.plan} Plan
                 </p>
               </div>
               <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 transition-colors p-1.5 hover:bg-slate-800 rounded">
                 <LogOut className="w-4 h-4" />
               </button>
             </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-950/50 relative pt-16 lg:pt-0">
          
          {/* Top Header */}
          <header className="h-20 border-b border-slate-800/60 glass-panel flex items-center justify-between px-6 sticky top-0 z-20 hidden lg:flex">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                {currentView === View.DASHBOARD ? 'Market Overview' : 
                 currentView === View.FORECAST ? 'Portfolio Forecasting' :
                 currentView === View.HELP ? 'Help Center' :
                 currentView.charAt(0).toUpperCase() + currentView.slice(1).toLowerCase().replace('_', ' ')}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
               <div className={`flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${settings.auto_trade_enabled ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
                  <div className={`w-2 h-2 rounded-full ${settings.auto_trade_enabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                  AUTO-TRADE: {settings.auto_trade_enabled ? 'ACTIVE' : 'PAUSED'}
               </div>
               <div className="h-8 w-px bg-slate-800 mx-2"></div>
               <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-950"></span>
               </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto">
              <FeatureGate>
                {currentView === View.DASHBOARD && (
                  <div className="space-y-8 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <StatCard title="Realized P/L (Day)" value="+$1,240.50" type="success" subtext="+2.4% Account" />
                      <StatCard title="Open Trades" value="2" subtext={`Max: ${settings.max_open_trades}`} />
                      <StatCard title="Daily Risk Used" value="$166.66" subtext={`Limit: $${settings.daily_max_loss}`} type="danger" />
                      <StatCard title="Win Rate" value="65%" subtext="Last 20 Trades" type="success" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-8">
                        <div className="glass-panel rounded-xl border border-slate-800 p-6 shadow-lg">
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h3 className="text-white font-bold">Performance Analytics</h3>
                              <p className="text-xs text-slate-400">7-Day P/L vs Targets</p>
                            </div>
                            <button 
                              onClick={() => setCurrentView(View.FORECAST)} 
                              className="text-xs flex items-center gap-1 bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-lg hover:bg-indigo-500/20 transition-colors font-medium border border-indigo-500/20"
                            >
                              View Forecast <Sparkles className="w-3 h-3" />
                            </button>
                          </div>
                          <PLChart data={mockPLData} />
                        </div>
                        
                        <div className="hidden lg:block h-80">
                          <NewsFeed news={mockNews} />
                        </div>
                      </div>

                      <div className="glass-panel rounded-xl border border-slate-800 p-0 flex flex-col h-[650px] shadow-lg overflow-hidden">
                        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                          <h3 className="text-white font-bold">Live Signals</h3>
                          <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div> LIVE</span>
                        </div>
                        <div className="flex-1 space-y-1 overflow-y-auto p-2 custom-scrollbar">
                            {signals.map(signal => (
                              <div 
                                key={signal.id} 
                                onClick={() => setSelectedSignal(signal)}
                                className="group p-4 rounded-xl border border-transparent hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all cursor-pointer relative overflow-hidden"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-white group-hover:bg-slate-700 transition-colors">
                                        {signal.ticker.slice(0,2)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                          <span className="font-bold text-white">{signal.ticker}</span>
                                          <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${signal.side === 'long' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{signal.side}</span>
                                        </div>
                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                          @ {new Date(signal.received_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                                        </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm font-mono text-white">${signal.entry}</div>
                                    <div className="text-[10px] text-slate-400">RVOL: {signal.rvol}</div>
                                  </div>
                                </div>
                                {signal.reason && (
                                  <p className="text-xs text-slate-400 bg-slate-950/50 p-2 rounded border border-slate-800/50 line-clamp-1">
                                    {signal.reason}
                                  </p>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentView === View.SIGNALS && (
                  <div className="animate-fade-in">
                    <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm text-slate-400">
                            <thead className="bg-slate-900/80 text-xs uppercase font-bold text-slate-500">
                              <tr>
                                <th className="px-6 py-4">Time</th>
                                <th className="px-6 py-4">Source</th>
                                <th className="px-6 py-4">Ticker</th>
                                <th className="px-6 py-4">Setup</th>
                                <th className="px-6 py-4">Entry</th>
                                <th className="px-6 py-4">Stop</th>
                                <th className="px-6 py-4">RVOL</th>
                                <th className="px-6 py-4 text-right">AI Check</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                              {signals.map((signal) => (
                                <tr key={signal.id} className="hover:bg-slate-800/30 transition-colors group">
                                  <td className="px-6 py-4 font-mono text-xs">
                                    {new Date(signal.received_at).toLocaleTimeString()}
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                                      <Activity className="w-3 h-3" />
                                      {signal.src}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 font-bold text-white">{signal.ticker}</td>
                                  <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide ${signal.side === 'long' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                      {signal.side}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-slate-200 font-mono">${signal.entry}</td>
                                  <td className="px-6 py-4 text-slate-400 font-mono">${signal.stop}</td>
                                  <td className="px-6 py-4">{signal.rvol || '-'}</td>
                                  <td className="px-6 py-4 text-right">
                                    <button 
                                      onClick={() => setSelectedSignal(signal)}
                                      className="text-indigo-400 hover:text-white font-medium text-xs border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 rounded-lg hover:bg-indigo-600 hover:border-indigo-600 transition-all flex items-center gap-1.5 ml-auto group-hover:shadow-lg group-hover:shadow-indigo-500/10"
                                    >
                                      <Sparkles className="w-3 h-3" />
                                      Validate
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                    </div>
                  </div>
                )}

                {/* Render other views */}
                {currentView === View.ORDERS && (
                  <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden animate-fade-in">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-400">
                          <thead className="bg-slate-900/80 text-xs uppercase font-bold text-slate-500">
                            <tr>
                              <th className="px-6 py-4">Order ID</th>
                              <th className="px-6 py-4">Broker</th>
                              <th className="px-6 py-4">Mode</th>
                              <th className="px-6 py-4">Qty</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4 text-right">Executed At</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/50">
                            {mockOrders.map((order) => (
                              <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs text-slate-500">{order.id.slice(0, 12)}...</td>
                                <td className="px-6 py-4 uppercase font-bold text-slate-300">{order.broker}</td>
                                <td className="px-6 py-4">
                                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${order.mode === 'live' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                                    {order.mode}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-white font-mono">{order.qty}</td>
                                <td className="px-6 py-4">
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold capitalize 
                                      ${order.status === 'filled' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                                        order.status === 'submitted' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                                        'bg-slate-800 text-slate-400'}`}>
                                      {order.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-xs">{new Date(order.created_at).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                  </div>
                )}

                {currentView === View.SCANNER && <MarketScanner />}
                {currentView === View.FORECAST && <Forecasting data={mockForecastData} />}
                {currentView === View.ANALYSIS && <TechnicalAnalysis indicators={mockTechnicalIndicators} />}
                {currentView === View.AUTOMATION && <Automation rules={mockAutomationRules} />}
                {currentView === View.BILLING && currentUser && <Billing user={currentUser} />}
                {currentView === View.SETTINGS && <SettingsForm settings={settings} onSave={handleSaveSettings} />}
                {currentView === View.HELP && <HelpSection />}
              </FeatureGate>
            </div>
          </div>
        </main>

        {/* Modals & Toasts */}
        <SignalAnalysisModal signal={selectedSignal} onClose={() => setSelectedSignal(null)} />
        
        {toast && (
          <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-2xl border flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5 duration-300 backdrop-blur-md ${
            toast.type === 'success' ? 'bg-emerald-900/80 border-emerald-500/50 text-emerald-50' : 'bg-red-900/80 border-red-500/50 text-red-50'
          }`}>
             {toast.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
             <p className="text-sm font-medium">{toast.message}</p>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
