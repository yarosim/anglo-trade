import React from 'react';
import { CreditCard, Check, Clock, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface BillingProps {
  user: UserProfile;
}

export const Billing: React.FC<BillingProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Subscription Management</h2>
          <p className="text-slate-400 text-sm mt-1">Manage your billing details and plan tier.</p>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-lg mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                {user.plan.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-medium capitalize">{user.plan} Plan</p>
                <p className="text-sm text-slate-400">Renews on Nov 12, 2024</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">
              Active
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white mb-4">Available Plans</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {['Starter', 'Pro', 'Elite'].map((plan) => (
              <div key={plan} className={`relative p-4 rounded-lg border ${user.plan === plan.toLowerCase() ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500' : 'bg-slate-950 border-slate-800 opacity-60'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-white">{plan}</span>
                  {user.plan === plan.toLowerCase() && <Check className="w-4 h-4 text-indigo-400" />}
                </div>
                <div className="text-sm text-slate-400 mb-4">
                  {plan === 'Starter' ? '$29/mo' : plan === 'Pro' ? '$79/mo' : '$149/mo'}
                </div>
                <button 
                  disabled={user.plan === plan.toLowerCase()}
                  className={`w-full py-2 text-xs font-medium rounded ${user.plan === plan.toLowerCase() ? 'bg-indigo-600 text-white cursor-default' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  {user.plan === plan.toLowerCase() ? 'Current Plan' : 'Upgrade'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Payment Methods</h2>
          <button className="text-sm text-indigo-400 hover:text-indigo-300">+ Add Method</button>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-white font-medium">Visa ending in 4242</p>
                <p className="text-xs text-slate-500">Expires 12/25</p>
              </div>
            </div>
            <span className="text-xs text-slate-500 border border-slate-700 px-2 py-0.5 rounded">Default</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">Billing History</h2>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-950 text-xs uppercase font-medium text-slate-500">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="px-6 py-4">Oct 12, 2024</td>
                <td className="px-6 py-4">$79.00</td>
                <td className="px-6 py-4"><span className="flex items-center gap-1 text-emerald-400"><Check className="w-3 h-3" /> Paid</span></td>
                <td className="px-6 py-4 text-right"><button className="text-indigo-400 hover:underline">Download</button></td>
              </tr>
              <tr>
                <td className="px-6 py-4">Sep 12, 2024</td>
                <td className="px-6 py-4">$79.00</td>
                <td className="px-6 py-4"><span className="flex items-center gap-1 text-emerald-400"><Check className="w-3 h-3" /> Paid</span></td>
                <td className="px-6 py-4 text-right"><button className="text-indigo-400 hover:underline">Download</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};