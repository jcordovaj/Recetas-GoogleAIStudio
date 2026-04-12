import React from 'react';
import { Timer, Thermometer, Lightbulb } from 'lucide-react';
import { InstructionStep } from '../types';

export default function Instructions({ steps }: { steps: InstructionStep[] }) {
  return (
    <div className="space-y-6">
      <h3 className="font-serif font-bold text-2xl text-stone-800">Preparation</h3>
      
      <div className="space-y-6 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-stone-200">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-12">
            {/* Step Number Bubble */}
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm shadow-md z-10">
              {step.step}
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-stone-700 text-lg leading-relaxed mb-4">
                {step.text}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {step.time && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    <Timer size={14} />
                    {step.time}
                  </div>
                )}
                {step.temperature && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium">
                    <Thermometer size={14} />
                    {step.temperature}
                  </div>
                )}
              </div>

              {step.chefTip && (
                <div className="mt-4 flex gap-3 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <Lightbulb className="text-yellow-600 shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-yellow-800 italic">
                    <span className="font-bold">Pro Tip:</span> {step.chefTip}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
