import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

interface RiskDisclosureProps {
  onAccept: () => void;
}

export const RiskDisclosure: React.FC<RiskDisclosureProps> = ({ onAccept }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (bottom || e.currentTarget.scrollTop > 100) {
      setHasScrolled(true);
    }
  };

  const handleAccept = () => {
    localStorage.setItem('risk_accepted', 'true');
    onAccept();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl bg-slate-900 border-2 border-red-900/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-red-950/30 border-b border-red-900/30 flex items-center gap-4">
          <div className="p-3 bg-red-900/20 rounded-full border border-red-500/30">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Risk Disclosure & Liability Waiver</h2>
            <p className="text-red-300 text-sm">Please read carefully before proceeding.</p>
          </div>
        </div>

        {/* Content */}
        <div 
          className="flex-1 overflow-y-auto p-8 space-y-6 text-slate-300 text-sm leading-relaxed custom-scrollbar bg-slate-950"
          onScroll={handleScroll}
        >
          <div className="space-y-4">
            <p className="font-bold text-white text-base">
              IMPORTANT: TRADING INVOLVES SUBSTANTIAL RISK OF LOSS AND IS NOT SUITABLE FOR EVERY INVESTOR.
            </p>
            
            <h3 className="text-white font-bold mt-4">1. No Financial Advice</h3>
            <p>
              TradeFlow Pro ("the Application"), Yarosecurity, its developers, owners, and affiliates do not provide financial, investment, legal, or tax advice. All content, signals, AI analysis, and tools provided herein are for <strong className="text-white">informational and educational purposes only</strong>.
            </p>

            <h3 className="text-white font-bold mt-4">2. Limitation of Liability</h3>
            <p>
              By accessing this Application, you explicitly acknowledge and agree that <strong className="text-white">Yarosecurity and its affiliates shall not be held liable</strong> for any damages, losses, or costs resulting from your use of the Application. This includes, but is not limited to:
              <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
                <li>Direct or indirect trading losses.</li>
                <li>Errors in AI analysis or data feeds.</li>
                <li>Platform downtime or technical failures.</li>
                <li>Execution delays or broker connectivity issues.</li>
              </ul>
            </p>

            <h3 className="text-white font-bold mt-4">3. User Responsibility</h3>
            <p>
              You acknowledge that you are solely responsible for your own trading decisions. You agree to conduct your own due diligence and consult with a certified financial advisor before making any investment decisions. The "Auto-Trade" and "Risk Guardrails" features are tools to assist you, but they do not guarantee profit or prevention of loss.
            </p>
            
            <h3 className="text-white font-bold mt-4">4. Hypothetical Performance</h3>
            <p>
              Past performance is not indicative of future results. Any P/L forecasts or backtested results shown are hypothetical and do not represent actual trading.
            </p>
          </div>
          
          {!hasScrolled && (
            <div className="text-center text-xs text-slate-500 italic pt-4 animate-pulse">
              Scroll down to accept...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-900 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => {
            setHasScrolled(true);
            setAccepted(!accepted);
          }}>
            <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${accepted ? 'bg-emerald-600 border-emerald-600' : 'bg-slate-800 border-slate-600'}`}>
              {accepted && <CheckCircle2 className="w-4 h-4 text-white" />}
            </div>
            <span className={`text-sm ${accepted ? 'text-white' : 'text-slate-400'}`}>
              I have read, understood, and agree to the Risk Disclosure and Liability Waiver.
            </span>
          </div>

          <button
            disabled={!accepted}
            onClick={handleAccept}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
              accepted 
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {accepted ? 'Enter TradeFlow Pro' : <><Lock className="w-4 h-4" /> Accept & Continue</>}
          </button>
        </div>
      </div>
    </div>
  );
};