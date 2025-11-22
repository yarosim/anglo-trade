import React, { useState } from 'react';
import { TrendingUp, Mail, Lock, Github, User, ArrowRight } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
  onDemo: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onDemo }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>
      
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="p-8">
          <div className="flex items-center gap-2 justify-center mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-white tracking-tight">TradeFlow</span>
          </div>

          <h2 className="text-xl font-bold text-white text-center mb-2">
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-slate-400 text-center text-sm mb-8">
            {isLogin ? 'Enter your credentials to access the dashboard.' : 'Start your 7-day free trial today.'}
          </p>

          {/* Social Auth */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button className="flex items-center justify-center py-2.5 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors group">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </button>
            <button className="flex items-center justify-center py-2.5 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors text-white">
              <Github className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center py-2.5 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors text-blue-400">
              <Mail className="w-5 h-5" />
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input 
                  type="email" 
                  className="block w-full pl-10 bg-slate-950 border border-slate-800 rounded-lg py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm" 
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input 
                  type="password" 
                  className="block w-full pl-10 bg-slate-950 border border-slate-800 rounded-lg py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
             <button 
              onClick={onDemo}
              className="text-sm text-slate-500 hover:text-white underline transition-colors flex items-center justify-center gap-1 mx-auto"
             >
               Try Demo Mode <ArrowRight className="w-3 h-3" />
             </button>
          </div>
        </div>
        <div className="bg-slate-950 px-8 py-4 border-t border-slate-800 flex justify-center">
          <p className="text-xs text-slate-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-indigo-400 hover:text-indigo-300 font-medium ml-1"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};