import React from 'react';
import { TrendingDown, Store, Home, AlertCircle } from 'lucide-react';
import { CostData } from '../types';

export default function CostAnalysis({ data }: { data: CostData }) {
  // Simple check for savings
  const restaurant = parseFloat(data.restaurantPrice.replace(/[^0-9.]/g, '')) || 0;
  const homemade = parseFloat(data.homemadePrice.replace(/[^0-9.]/g, '')) || 0;
  const savings = restaurant - homemade;
  const savingsPercent = restaurant > 0 ? Math.round((savings / restaurant) * 100) : 0;

  return (
    <div className="space-y-6">
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Cost Card */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-8 -mt-8"></div>
          
          <h3 className="font-serif font-bold text-xl text-stone-800 mb-6 flex items-center gap-2">
            <Home className="text-primary" /> Homemade
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm text-stone-500">Estimated Cost per Serving</div>
              <div className="text-4xl font-bold text-stone-900">{data.perServing}</div>
            </div>
            
            <div className="pt-4 border-t border-stone-100">
               <div className="flex justify-between text-sm">
                 <span className="text-stone-600">Total Batch Cost</span>
                 <span className="font-medium">{data.total}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Restaurant Comparison */}
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 shadow-sm">
          <h3 className="font-serif font-bold text-xl text-stone-800 mb-6 flex items-center gap-2">
            <Store className="text-stone-400" /> Restaurant
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm text-stone-500">Average Menu Price</div>
              <div className="text-4xl font-bold text-stone-400">{data.restaurantPrice}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Highlight */}
      {savings > 0 && (
        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg flex items-center justify-between">
           <div>
             <h4 className="font-bold text-xl flex items-center gap-2">
               <TrendingDown size={24} className="text-green-200" />
               Save {savingsPercent}% cooking at home
             </h4>
             <p className="text-green-100 mt-1">
               That's about <span className="font-bold bg-white/20 px-1 rounded">${savings.toFixed(2)}</span> savings per serving!
             </p>
           </div>
           <div className="hidden md:block text-5xl opacity-20">
             <DollarSignIcon />
           </div>
        </div>
      )}

      <div className="flex items-start gap-2 text-xs text-stone-400 mt-4">
        <AlertCircle size={14} className="mt-0.5 shrink-0" />
        <p>Prices are estimates based on average US grocery and restaurant prices. Actual costs may vary by location and season.</p>
      </div>
    </div>
  );
}

const DollarSignIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
)
