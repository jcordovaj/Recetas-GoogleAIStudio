import React from 'react';
import { ShieldAlert, Sparkles, Wrench } from 'lucide-react';

export default function ChefTips({ tips, equipment }: { tips: string[], equipment: string[] }) {
  return (
    <div className="space-y-8">
      
      {/* Secret Tips */}
      <div className="bg-stone-900 text-stone-100 rounded-xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles size={120} />
        </div>
        
        <h3 className="font-serif font-bold text-2xl mb-6 flex items-center gap-3 text-primary">
          <Sparkles size={24} /> Chef's Secrets
        </h3>
        
        <ul className="space-y-4 relative z-10">
          {tips.map((tip, idx) => (
            <li key={idx} className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </span>
              <p className="text-lg leading-relaxed font-light text-stone-300">
                {tip}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Equipment */}
      <div className="bg-white border border-stone-200 rounded-xl p-6">
        <h3 className="font-serif font-bold text-xl text-stone-800 mb-4 flex items-center gap-2">
          <Wrench size={20} className="text-stone-400" /> Required Equipment
        </h3>
        <div className="flex flex-wrap gap-2">
          {equipment.map((item, idx) => (
            <span key={idx} className="px-3 py-1.5 bg-stone-100 text-stone-700 rounded-lg text-sm font-medium">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
