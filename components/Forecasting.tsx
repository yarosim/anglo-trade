import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ForecastData } from '../types';
import { Sparkles, Calendar, TrendingUp } from 'lucide-react';

interface ForecastingProps {
  data: ForecastData[];
}

export const Forecasting: React.FC<ForecastingProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              AI Portfolio Projection
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Forecast includes seasonality adjustments and recent deal scores.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div> Aggressive
            </span>
            <span className="flex items-center gap-1 text-indigo-400">
              <div className="w-2 h-2 rounded-full bg-indigo-400"></div> Expected
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <div className="w-2 h-2 rounded-full bg-slate-400"></div> Conservative
            </span>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAggressive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Area type="monotone" dataKey="aggressive" stroke="#34d399" strokeWidth={2} fillOpacity={1} fill="url(#colorAggressive)" name="Aggressive Case" />
              <Area type="monotone" dataKey="expected" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorExpected)" name="Expected Growth" />
              <Area type="monotone" dataKey="conservative" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" name="Conservative Case" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Projected EOY Balance
          </h3>
          <p className="text-2xl font-bold text-white">$26,000.00</p>
          <p className="text-xs text-emerald-400 mt-1">+520% from current</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
           <h3 className="text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Seasonality Impact
          </h3>
          <p className="text-2xl font-bold text-white">High (Q4)</p>
          <p className="text-xs text-slate-500 mt-1">Historical volatility +15%</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-sm font-medium text-slate-400 mb-2">AI Deal Score</h3>
          <p className="text-2xl font-bold text-white">8.5/10</p>
          <p className="text-xs text-emerald-400 mt-1">Based on recent setup quality</p>
        </div>
      </div>
    </div>
  );
};