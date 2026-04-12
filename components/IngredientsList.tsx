import React from 'react';
import { Check, ArrowRightLeft } from 'lucide-react';
import { IngredientSection } from '../types';

interface IngredientsListProps {
  sections: IngredientSection[];
  servings: number;
}

export default function IngredientsList({ sections, servings }: IngredientsListProps) {
  const scale = servings / 4; // Base is 4 servings

  const formatAmount = (amount: number, unit: string) => {
    const scaled = amount * scale;
    // Format to minimal decimal places or fraction if needed, keeping it simple for now
    if (scaled === 0) return "";
    
    // Check if integer
    if (Math.abs(scaled % 1) < 0.05) {
      return Math.round(scaled);
    }
    
    // Simple decimal formatting
    return parseFloat(scaled.toFixed(2));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
      <div className="bg-stone-50 p-4 border-b border-stone-200 flex justify-between items-center">
        <h3 className="font-serif font-bold text-xl text-stone-800">Ingredients</h3>
        <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
          For {servings} servings
        </span>
      </div>
      
      <div className="p-6 space-y-8">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h4 className="font-bold text-stone-700 mb-3 text-sm uppercase tracking-wide border-b border-stone-100 pb-1">
              {section.title}
            </h4>
            <ul className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx} className="group flex items-start gap-3">
                   {/* Checkbox */}
                   <label className="flex items-center gap-3 cursor-pointer w-full">
                      <div className="relative flex items-center">
                        <input type="checkbox" className="peer w-5 h-5 appearance-none border-2 border-stone-300 rounded checked:bg-secondary checked:border-secondary transition-colors" />
                        <Check size={14} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-stone-800">
                          {formatAmount(item.amount, item.unit)} {item.unit}
                        </span>
                        <span className="text-stone-600 ml-1">
                          {item.name}
                        </span>
                        {/* Substitute Tooltip/Text */}
                        {item.substitute && (
                          <div className="text-xs text-stone-400 mt-0.5 group-hover:text-primary transition-colors flex items-center gap-1">
                            <ArrowRightLeft size={12} />
                            Sub: {item.substitute}
                          </div>
                        )}
                      </div>
                   </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
